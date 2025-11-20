import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'npm:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

// Middleware
app.use('*', cors());
app.use('*', logger(console.log));

// Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// Helper to verify auth
async function verifyAuth(authHeader: string | null) {
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.split(' ')[1];
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) {
    return null;
  }
  return user;
}

// ==================== AUTH ROUTES ====================

// Sign up
app.post('/make-server-ce50372d/auth/signup', async (c) => {
  try {
    const { email, password, name, phone } = await c.req.json();
    
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, phone },
      email_confirm: true // Auto-confirm since no email server configured
    });

    if (error) {
      console.log(`Sign up error: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }

    // Create user profile in KV store
    await kv.set(`user:${data.user.id}`, {
      id: data.user.id,
      email: data.user.email,
      name,
      phone,
      language: 'en',
      autonomyMode: true,
      hasCompletedOnboarding: true,
      createdAt: new Date().toISOString()
    });

    return c.json({ user: data.user });
  } catch (error) {
    console.log(`Sign up exception: ${error}`);
    return c.json({ error: 'Sign up failed' }, 500);
  }
});

// ==================== USER PROFILE ROUTES ====================

// Get user profile
app.get('/make-server-ce50372d/profile/:userId', async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const userId = c.req.param('userId');
    const profile = await kv.get(`user:${userId}`);
    
    if (!profile) {
      return c.json({ error: 'Profile not found' }, 404);
    }

    return c.json(profile);
  } catch (error) {
    console.log(`Get profile error: ${error}`);
    return c.json({ error: 'Failed to get profile' }, 500);
  }
});

// Update user profile
app.put('/make-server-ce50372d/profile/:userId', async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const userId = c.req.param('userId');
    const updates = await c.req.json();
    
    const existing = await kv.get(`user:${userId}`);
    if (!existing) {
      return c.json({ error: 'Profile not found' }, 404);
    }

    const updated = { ...existing, ...updates, updatedAt: new Date().toISOString() };
    await kv.set(`user:${userId}`, updated);

    return c.json(updated);
  } catch (error) {
    console.log(`Update profile error: ${error}`);
    return c.json({ error: 'Failed to update profile' }, 500);
  }
});

// ==================== M-PESA ROUTES ====================

// Connect M-Pesa account
app.post('/make-server-ce50372d/mpesa/connect', async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { phoneNumber, accountType, tillNumber } = await c.req.json();

    // Store M-Pesa connection info
    const connectionData = {
      userId: user.id,
      phoneNumber,
      accountType,
      tillNumber,
      connected: true,
      lastSync: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    await kv.set(`mpesa:${user.id}`, connectionData);

    // Trigger n8n workflow for initial sync
    const n8nWebhook = Deno.env.get('N8N_MPESA_SYNC_WEBHOOK');
    if (n8nWebhook) {
      await fetch(n8nWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, phoneNumber, accountType, tillNumber })
      });
    }

    return c.json(connectionData);
  } catch (error) {
    console.log(`M-Pesa connect error: ${error}`);
    return c.json({ error: 'Failed to connect M-Pesa' }, 500);
  }
});

// Get M-Pesa connection status
app.get('/make-server-ce50372d/mpesa/status', async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const connection = await kv.get(`mpesa:${user.id}`);
    return c.json(connection || { connected: false });
  } catch (error) {
    console.log(`M-Pesa status error: ${error}`);
    return c.json({ error: 'Failed to get M-Pesa status' }, 500);
  }
});

// Sync M-Pesa transactions
app.post('/make-server-ce50372d/mpesa/sync', async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const connection = await kv.get(`mpesa:${user.id}`);
    if (!connection?.connected) {
      return c.json({ error: 'M-Pesa not connected' }, 400);
    }

    // Update last sync time
    await kv.set(`mpesa:${user.id}`, {
      ...connection,
      lastSync: new Date().toISOString()
    });

    // Trigger n8n workflow for sync
    const n8nWebhook = Deno.env.get('N8N_MPESA_SYNC_WEBHOOK');
    if (n8nWebhook) {
      await fetch(n8nWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, action: 'sync' })
      });
    }

    return c.json({ success: true, lastSync: new Date().toISOString() });
  } catch (error) {
    console.log(`M-Pesa sync error: ${error}`);
    return c.json({ error: 'Failed to sync M-Pesa' }, 500);
  }
});

// Get M-Pesa transactions
app.get('/make-server-ce50372d/mpesa/transactions', async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const transactions = await kv.getByPrefix(`transaction:${user.id}:`);
    return c.json(transactions || []);
  } catch (error) {
    console.log(`Get transactions error: ${error}`);
    return c.json({ error: 'Failed to get transactions' }, 500);
  }
});

// ==================== AGENT ACTIVITY ROUTES ====================

// Get agent activities
app.get('/make-server-ce50372d/activities', async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const activities = await kv.getByPrefix(`activity:${user.id}:`);
    return c.json(activities || []);
  } catch (error) {
    console.log(`Get activities error: ${error}`);
    return c.json({ error: 'Failed to get activities' }, 500);
  }
});

// Create agent activity (called by n8n workflows)
app.post('/make-server-ce50372d/activities', async (c) => {
  try {
    const { userId, agentId, title, description, status, actionable } = await c.req.json();

    const activity = {
      id: crypto.randomUUID(),
      userId,
      agentId,
      title,
      description,
      status,
      actionable: actionable || false,
      timestamp: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    await kv.set(`activity:${userId}:${activity.id}`, activity);

    return c.json(activity);
  } catch (error) {
    console.log(`Create activity error: ${error}`);
    return c.json({ error: 'Failed to create activity' }, 500);
  }
});

// ==================== FUNDING ROUTES ====================

// Get funding opportunities
app.get('/make-server-ce50372d/funding/opportunities', async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const opportunities = await kv.getByPrefix(`funding:${user.id}:`);
    return c.json(opportunities || []);
  } catch (error) {
    console.log(`Get funding opportunities error: ${error}`);
    return c.json({ error: 'Failed to get opportunities' }, 500);
  }
});

// Match funding (trigger ML API)
app.post('/make-server-ce50372d/funding/match', async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const profile = await kv.get(`user:${user.id}`);
    
    // Call ML API endpoint for funding matching
    const mlEndpoint = Deno.env.get('ML_FUNDING_MATCH_ENDPOINT');
    if (!mlEndpoint) {
      return c.json({ error: 'ML endpoint not configured' }, 500);
    }

    const mlResponse = await fetch(mlEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id, profile })
    });

    const matches = await mlResponse.json();

    // Store matched opportunities
    for (const match of matches.opportunities || []) {
      await kv.set(`funding:${user.id}:${match.id}`, {
        ...match,
        userId: user.id,
        createdAt: new Date().toISOString()
      });
    }

    return c.json(matches);
  } catch (error) {
    console.log(`Funding match error: ${error}`);
    return c.json({ error: 'Failed to match funding' }, 500);
  }
});

// ==================== ANALYTICS ROUTES ====================

// Get analytics data
app.get('/make-server-ce50372d/analytics', async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const analytics = await kv.get(`analytics:${user.id}`);
    return c.json(analytics || {});
  } catch (error) {
    console.log(`Get analytics error: ${error}`);
    return c.json({ error: 'Failed to get analytics' }, 500);
  }
});

// Generate analytics report (trigger ML API)
app.post('/make-server-ce50372d/analytics/generate', async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const transactions = await kv.getByPrefix(`transaction:${user.id}:`);
    
    // Call ML API for analytics generation
    const mlEndpoint = Deno.env.get('ML_ANALYTICS_ENDPOINT');
    if (!mlEndpoint) {
      return c.json({ error: 'ML endpoint not configured' }, 500);
    }

    const mlResponse = await fetch(mlEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id, transactions })
    });

    const analytics = await mlResponse.json();

    // Store analytics
    await kv.set(`analytics:${user.id}`, {
      ...analytics,
      userId: user.id,
      generatedAt: new Date().toISOString()
    });

    return c.json(analytics);
  } catch (error) {
    console.log(`Generate analytics error: ${error}`);
    return c.json({ error: 'Failed to generate analytics' }, 500);
  }
});

// ==================== COMPLIANCE ROUTES ====================

// Get compliance items
app.get('/make-server-ce50372d/compliance', async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const items = await kv.getByPrefix(`compliance:${user.id}:`);
    return c.json(items || []);
  } catch (error) {
    console.log(`Get compliance error: ${error}`);
    return c.json({ error: 'Failed to get compliance items' }, 500);
  }
});

// ==================== N8N WEBHOOK ENDPOINTS ====================

// Webhook to receive M-Pesa transaction data from n8n
app.post('/make-server-ce50372d/webhooks/mpesa-transactions', async (c) => {
  try {
    const { userId, transactions } = await c.req.json();

    // Store transactions
    for (const transaction of transactions) {
      await kv.set(`transaction:${userId}:${transaction.id}`, {
        ...transaction,
        userId,
        createdAt: new Date().toISOString()
      });
    }

    // Create agent activity
    await kv.set(`activity:${userId}:${crypto.randomUUID()}`, {
      id: crypto.randomUUID(),
      userId,
      agentId: 'financials',
      title: 'Synced M-Pesa transactions',
      description: `Synced ${transactions.length} transactions`,
      status: 'success',
      actionable: false,
      timestamp: new Date().toISOString()
    });

    return c.json({ success: true, count: transactions.length });
  } catch (error) {
    console.log(`M-Pesa webhook error: ${error}`);
    return c.json({ error: 'Webhook processing failed' }, 500);
  }
});

// Webhook to receive agent actions from n8n
app.post('/make-server-ce50372d/webhooks/agent-action', async (c) => {
  try {
    const { userId, agentId, action, data } = await c.req.json();

    const activity = {
      id: crypto.randomUUID(),
      userId,
      agentId,
      title: action.title,
      description: action.description,
      status: action.status || 'success',
      actionable: action.actionable || false,
      timestamp: new Date().toISOString(),
      data
    };

    await kv.set(`activity:${userId}:${activity.id}`, activity);

    return c.json({ success: true, activity });
  } catch (error) {
    console.log(`Agent action webhook error: ${error}`);
    return c.json({ error: 'Webhook processing failed' }, 500);
  }
});

// ==================== BUSINESS REPORT ROUTES ====================

// Get business report
app.get('/make-server-ce50372d/report', async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const report = await kv.get(`report:${user.id}`);
    return c.json(report || {});
  } catch (error) {
    console.log(`Get report error: ${error}`);
    return c.json({ error: 'Failed to get report' }, 500);
  }
});

// Generate business report
app.post('/make-server-ce50372d/report/generate', async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const profile = await kv.get(`user:${user.id}`);
    const transactions = await kv.getByPrefix(`transaction:${user.id}:`);

    // Trigger n8n workflow to generate report
    const n8nWebhook = Deno.env.get('N8N_REPORT_GENERATION_WEBHOOK');
    if (n8nWebhook) {
      await fetch(n8nWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, profile, transactions })
      });
    }

    return c.json({ success: true, message: 'Report generation started' });
  } catch (error) {
    console.log(`Generate report error: ${error}`);
    return c.json({ error: 'Failed to generate report' }, 500);
  }
});

// ==================== SETTINGS ROUTES ====================

// Get user settings
app.get('/make-server-ce50372d/settings', async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const settings = await kv.get(`settings:${user.id}`);
    return c.json(settings || {});
  } catch (error) {
    console.log(`Get settings error: ${error}`);
    return c.json({ error: 'Failed to get settings' }, 500);
  }
});

// Update user settings
app.put('/make-server-ce50372d/settings', async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const updates = await c.req.json();
    const existing = await kv.get(`settings:${user.id}`) || {};
    
    const settings = {
      ...existing,
      ...updates,
      userId: user.id,
      updatedAt: new Date().toISOString()
    };

    await kv.set(`settings:${user.id}`, settings);

    return c.json(settings);
  } catch (error) {
    console.log(`Update settings error: ${error}`);
    return c.json({ error: 'Failed to update settings' }, 500);
  }
});

// Health check
app.get('/make-server-ce50372d/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

Deno.serve(app.fetch);
