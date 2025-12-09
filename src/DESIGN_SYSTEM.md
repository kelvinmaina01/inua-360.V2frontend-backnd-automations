# Inua 360 Design System Documentation

## Overview
Inua 360 is Kenya's first autonomous AI co-pilot for SMEs, designed for 2026. This comprehensive design system provides a complete, production-ready web application with full responsive support, bilingual functionality (English/Swahili), and Kenyan-specific design elements.

## Design Philosophy
- **Modern Kenyan Premium**: Blend of contemporary design with Kenyan cultural elements
- **Zero Learning Curve**: Feels like M-Pesa + WhatsApp + smart dashboard
- **Mobile-First**: Optimized for iPhone 14 Pro (393×852px), scales to tablet (1024×1366px) and desktop (1920×1080px)
- **Offline-Capable**: Full PWA support for rural areas (Kisumu, Mombasa, Eldoret, Eastleigh)
- **95% WhatsApp**: Web app is the "command center" for oversight

## Color Palette

### Primary Colors
- **Inua Orange**: `#FA7021` / `hsl(22 96% 55%)` - Primary brand color
- **Nairobi Teal**: `#00B8A9` / `hsl(174 100% 36%)` - Secondary/accent color
- **Matatu Yellow**: `#FFD60A` / `hsl(48 100% 52%)` - Accent/tertiary color

### Semantic Colors
- **Success Green**: `#34C759` / `hsl(145 63% 49%)`
- **Warning Orange**: `#FF9500` / `hsl(32 100% 50%)`
- **Error Red**: `#FF3B30` / `hsl(4 100% 60%)`

### Neutral Grays
- Gray 50: `#FAFAFA`
- Gray 100: `#F5F5F5`
- Gray 200: `#E5E5E5`
- Gray 300: `#D4D4D4`
- Gray 400: `#A3A3A3`
- Gray 500: `#737373`
- Gray 600: `#525252`
- Gray 700: `#404040`
- Gray 800: `#262626`
- Gray 900: `#171717`

### Dark Mode
- Background: `#121212` (charcoal)
- Card: `#171717`
- Adjusted contrast ratios for WCAG AA compliance

## Typography

### Font Families
- **Primary (English)**: Inter (300, 400, 500, 600, 700, 800)
- **Secondary (Swahili/Arabic)**: Noto Sans (300, 400, 500, 600, 700)
- **Base Size**: 16px on mobile, scales responsively

### Type Scale
- **H1**: 2rem (32px mobile: 1.75rem/28px) - Bold, -0.02em tracking
- **H2**: 1.5rem (24px mobile: 1.375rem/22px) - Semibold, -0.01em tracking
- **H3**: 1.25rem (20px mobile: 1.125rem/18px) - Semibold
- **H4**: 1.125rem (18px) - Medium
- **Body**: 1rem (16px) - Regular, 1.6 line-height
- **Small**: 0.875rem (14px) - Regular, 1.5 line-height

### Font Weights
Do NOT use Tailwind font size/weight classes unless specifically requested. Typography is handled via CSS defaults.

## Spacing & Layout

### Breakpoints
- **Mobile**: 0-767px (default, mobile-first)
- **Tablet**: 768px-1023px (md:)
- **Desktop**: 1024px+ (lg:)

### Touch Targets
- Minimum 48×48px on mobile
- Use `.touch-target` class for enforcement

### Grid System
- **Mobile**: Single column (stacked vertical)
- **Tablet**: 2-column grids
- **Desktop**: Sidebar (256px) + main content, 3-4 column grids

## Components

### Navigation
- **Mobile/Tablet**: Fixed bottom navigation (6 items)
- **Desktop**: Left sidebar (256px wide) with collapsible sections
- Icons from Lucide React (Home, Activity, Wallet, Shield, User, MessageCircle)

### Cards
- Default padding: 1.5rem (24px)
- Border: `1px solid hsl(var(--border))`
- Border radius: 0.5rem (8px)
- Shadow: Subtle on hover

### Buttons
- **Primary**: Inua Orange background, white text
- **Secondary**: Nairobi Teal background, white text
- **Outline**: Border only, transparent background
- **Ghost**: No border, transparent background
- Touch-friendly sizing (min 48px height on mobile)

### Badges
- Used for status indicators (Active/Idle, Valid/Expiring)
- Color-coded by semantic meaning
- Small text (0.75rem)

### Agent Avatars
- Circular design with agent-specific icons
- Size variants: sm (32px), md (48px), lg (64px)
- Status indicator (active = colored dot)
- Pulse animation for active agents

## Kenyan-Specific Elements

### Icons & Symbols
- **Sectors**: 🌾 Agriculture, 🔨 Jua Kali, 🏪 Retail, 🚌 Matatu, 🍲 Food
- **Counties**: 🏙️ Nairobi, 🏖️ Mombasa, 🐟 Kisumu, 🦩 Nakuru, ☕ Kiambu
- **Currency**: KES with proper formatting (e.g., "KES 1,240,000")
- **M-Pesa Integration**: Receipt-style slide-in animations

### Patterns
- **Kitenge Pattern**: Subtle diagonal grid background using primary/secondary colors at 2% opacity
- Applied to hero sections and feature cards
- CSS class: `.kitenge-pattern`

### Language Support
- **English/Swahili Toggle**: Globe icon in top-right
- All text content has bilingual variants
- Default to user's choice from onboarding
- Language preference persists across sessions

## AI Agents

### Six Core Agents
1. **Profile Builder** (Mjenzi wa Wasifu)
   - Icon: UserCircle
   - Color: Inua Orange (#FA7021)
   - Function: Builds and maintains 360° SME profile

2. **Compliance Tracker** (Mfuatiliaji wa Sheria)
   - Icon: Shield
   - Color: Success Green (#34C759)
   - Function: Monitors licenses, permits, regulatory compliance

3. **Funding Navigator** (Kiongozi wa Fedha)
   - Icon: Wallet
   - Color: Matatu Yellow (#FFD60A)
   - Function: Finds and matches funding opportunities

4. **Cash-Flow Forecaster** (Mtabiri wa Mtiririko wa Fedha)
   - Icon: TrendingUp
   - Color: Blue (#007AFF)
   - Function: Predicts future cash flow and identifies gaps

5. **Application Assistant** (Msaidizi wa Maombi)
   - Icon: FileText
   - Color: Warning Orange (#FF9500)
   - Function: Prepares and submits funding applications

6. **Multi-Agent Supervisor** (Msimamizi wa Mawakala)
   - Icon: Cpu
   - Color: Error Red (#FF3B30)
   - Function: Coordinates all agents and manages autonomy

### Agent Status
- **Active**: Pulsing glow effect, colored indicator dot
- **Idle**: Static, no pulse, gray indicator

## Screens & Flows

### 1. Onboarding (3 Steps)
- **Step 1**: Welcome + language picker + M-Pesa connect
- **Step 2**: SME Profile Builder (sector, county, revenue, challenges)
- **Step 3**: Permissions (autonomy mode, WhatsApp connect)
- Progress bar shows completion percentage
- Wizard-style navigation (Back/Continue)

### 2. Home Dashboard
- Personalized greeting with date
- Hero metric (KES with sparkline chart)
- Three urgent/opportunity cards (Compliance, Funding, Cash Gap)
- Today's agent actions feed
- WhatsApp CTA (giant teal button)
- Offline sync indicator

### 3. Agent Feed
- TikTok-style infinite scroll (mobile) / paginated grid (desktop)
- Filter by agent or date
- Activity cards with timestamps, status icons, metadata
- Actions: Like, Undo, Review & Approve
- Agent attribution footer

### 4. Money Tab
- Toggle: 21-day / 90-day view
- Interactive area chart (cash flow forecast)
- Key metrics grid (Income, Expenses, Net Profit, Gap Ahead)
- Funding opportunities carousel/grid
- Match score badges, deadlines, requirements
- "Apply Now" actions trigger Application Assistant

### 5. Compliance Shield
- Circular gauge (87/100 score with animated arc)
- Quick stats (Valid, Expiring, Pending counts)
- Accordion list of licenses/permits
- Auto-tracker toggle per item
- Action buttons (Initiate Renewal, Approve Agent)
- Document preview/download

### 6. Profile & Docs
- Dynamic business card (photo, name, sector, county, growth score)
- Five tabs: Overview, Financials, Customers, Team, Documents
- Charts: Revenue trend (area), Growth score (radar)
- Team grid with NSSF/NHIF compliance indicators
- Document grid with download buttons

### 7. Chat with Inua
- Full chat interface (WhatsApp-style bubbles)
- Agent selector sidebar (desktop)
- Voice notes, photo uploads, file shares
- Action buttons in agent responses
- Typing indicator (bouncing dots)
- 24/7 availability badge

### 8. Settings & Autonomy Controls
- Appearance: Language toggle, Dark mode switch
- Communication channels: WhatsApp (95%), Web (4%), USSD (1%), SMS
- Agent controls: Enable/disable individual agents
- Notifications: Agent actions, Compliance, Funding, Cash Flow
- Privacy: Kenya DPA consent, Download My Data
- PWA install prompt

## Animations & Interactions

### Micro-Interactions
- **Receipt Slide-In**: `.receipt-slide` - M-Pesa-style bottom-to-top animation (0.3s ease-out)
- **Agent Pulse**: `.agent-pulse` - 2s infinite pulse for active agents
- **Success Fade**: `.success-fade` - 0.5s fade-in for confirmations
- **Smooth Transitions**: All interactive elements have 150-200ms transitions

### Loading States
- Wizard-style spinners with agent messages
- Skeleton screens for content loading
- Progress bars for multi-step processes

### Responsive Transitions
- Layout shifts use `fade-in` and `slide-in-from-right-4` animations
- Collapsible sidebars with smooth width transitions
- Tab changes with crossfade effects

## Accessibility

### WCAG Compliance
- AA contrast ratios (4.5:1 for text, 3:1 for UI)
- Focus indicators on all interactive elements
- Screen reader support (aria-labels, semantic HTML)
- Keyboard navigation (Tab, Enter, Esc)

### Touch & Mobile
- Minimum 48×48px touch targets
- Swipe gestures for carousels
- Pull-to-refresh (PWA)
- Haptic feedback (where supported)

## Offline & PWA

### Service Worker
- Cache-first strategy for assets
- Network-first for API calls
- Offline fallback pages

### Sync Indicators
- Online/Offline badge in header
- "Working offline – sync when back" messages
- Queue actions for later sync (e.g., form submissions)

### Install Prompt
- "Add to Home Screen" banner
- Settings page install button
- Custom install instructions for iOS/Android

## Data Visualization

### Charts (Recharts)
- **Area Chart**: Cash flow forecast (green gradient)
- **Line Chart**: Revenue trends, sparklines
- **Radar Chart**: Growth score (4 dimensions)
- **Gauge**: Compliance score (circular arc)

### Color Coding
- Green: Positive/surplus
- Red: Negative/gap
- Yellow: Warning/opportunity
- Blue: Neutral/info

## Development Notes

### Tech Stack
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS v4.0 (no config file)
- **Components**: Shadcn/ui (see `/components/ui`)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Toasts**: Sonner

### File Structure
```
/components/
  /ui/ - Shadcn components (do not modify)
  AgentAvatar.tsx
  LanguageSwitcher.tsx
  BottomNav.tsx
  Sidebar.tsx
/pages/
  Onboarding.tsx
  Home.tsx
  AgentFeed.tsx
  Money.tsx
  Compliance.tsx
  Profile.tsx
  Chat.tsx
  Settings.tsx
/lib/
  constants.ts - All app constants
  mock-data.ts - Prototype data
  utils.ts - Helper functions
/styles/
  globals.css - Design system tokens
```

### Mock Data
All screens use realistic Kenyan mock data:
- Business: "Mama Fua Laundry" in Nairobi
- User: Jane Wanjiku
- Revenue: KES 1,240,000 yearly
- Funding: Hustler Fund, KIE, Women Fund, NYOTA, Google AfCFTA
- Compliance: KRA PIN, TCC, County License, NSSF, NHIF

## Usage Examples

### Triggering Agent Actions
```typescript
// From any component
import { AgentAvatar } from '../components/AgentAvatar';

<AgentAvatar 
  agentId="compliance" 
  size="md" 
  status="active" 
  showPulse 
/>
```

### Bilingual Text
```typescript
// Pattern used throughout
{language === 'sw' ? 'Habari' : 'Hello'}
```

### Navigation
```typescript
// Use onNavigate callback
<Button onClick={() => onNavigate('/money')}>
  View Money
</Button>
```

### Toast Notifications
```typescript
import { toast } from 'sonner@2.0.3';

toast.success(
  language === 'sw' ? 'Imefanikiwa!' : 'Success!',
  { description: 'Your action completed', duration: 3000 }
);
```

## Responsive Patterns

### Mobile (0-767px)
- Single column layouts
- Bottom navigation (fixed)
- Stacked cards
- Full-width buttons
- Collapsible accordions

### Tablet (768-1023px)
- 2-column grids
- Bottom navigation (still visible)
- Side-by-side cards
- Horizontal tabs

### Desktop (1024px+)
- Left sidebar navigation
- 3-4 column grids
- Split-view layouts (e.g., chat)
- Hover interactions
- Expanded data tables

## Brand Voice

### English
- Friendly, professional, empowering
- "Your AI Co-Pilot" / "We're here to help"
- Action-oriented ("Apply Now", "Fix Now")

### Swahili
- Warm, respectful, encouraging
- "Kiongozi wako wa AI" / "Tuko hapa kukusaidia"
- Direct translations with cultural nuance

## Future Enhancements
- Real M-Pesa integration (OAuth)
- WhatsApp Business API integration
- KRA/eCitizen API connections
- Multi-county expansion (all 47 counties)
- Sector-specific agent templates
- Voice interface (Swahili/Sheng)
- USSD lite version (*384*360#)

---

*
**Imetengenezwa kwa upendo kwa wajasiriamali wa Kenya 🇰🇪**
