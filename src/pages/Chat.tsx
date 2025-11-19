import { useState, useRef, useEffect } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { AgentAvatar } from '../components/AgentAvatar';
import { AGENTS } from '../lib/constants';
import { MOCK_CHAT_MESSAGES } from '../lib/mock-data';
import { Send, Paperclip, Mic, Phone, Video, MoreVertical } from 'lucide-react';

interface ChatProps {
  language: 'en' | 'sw';
  onNavigate: (route: string) => void;
}

export function Chat({ language, onNavigate }: ChatProps) {
  const [messages, setMessages] = useState(MOCK_CHAT_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<string>('supervisor');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user' as const,
      message: inputValue,
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputValue('');

    // Simulate agent typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const agentMessage = {
        id: `msg-${Date.now()}-agent`,
        sender: 'agent' as const,
        agentId: selectedAgent,
        message:
          language === 'sw'
            ? 'Asante kwa ujumbe wako! Nina kuchunguza ombi lako sasa...'
            : "Thanks for your message! I'm looking into your request now...",
        messageSwahili:
          'Asante kwa ujumbe wako! Nina kuchunguza ombi lako sasa...',
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, agentMessage]);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const currentAgent = AGENTS.find((a) => a.id === selectedAgent) || AGENTS[5];

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] lg:h-[calc(100vh-2rem)]">
      {/* Header */}
      <Card className="p-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AgentAvatar agentId={selectedAgent} size="md" status="active" showPulse />
            <div>
              <h3>{language === 'sw' ? currentAgent.nameSwahili : currentAgent.name}</h3>
              <Badge variant="secondary" className="text-xs">
                {language === 'sw' ? 'Mawakala wote hai' : 'All agents active'}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex flex-1 gap-4 min-h-0">
        {/* Agent Selector Sidebar (Desktop) */}
        <Card className="hidden lg:block w-64 p-4 shrink-0 overflow-auto">
          <h4 className="mb-4">{language === 'sw' ? 'Ongea na Wakala' : 'Chat with Agent'}</h4>
          <div className="space-y-2">
            {AGENTS.map((agent) => (
              <button
                key={agent.id}
                onClick={() => setSelectedAgent(agent.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  selectedAgent === agent.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                <AgentAvatar agentId={agent.id} size="sm" status={agent.status} />
                <div className="flex-1 text-left">
                  <p className="text-sm">
                    {language === 'sw' ? agent.nameSwahili : agent.name}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Chat Area */}
        <Card className="flex-1 flex flex-col min-w-0">
          {/* Messages */}
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              const agent = AGENTS.find((a) => a.id === msg.agentId);

              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {!isUser && (
                    <AgentAvatar
                      agentId={msg.agentId || 'supervisor'}
                      size="sm"
                      status="active"
                    />
                  )}
                  <div className={`flex flex-col gap-1 max-w-[80%] sm:max-w-[70%]`}>
                    <div
                      className={`p-4 rounded-lg ${
                        isUser
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">
                        {language === 'sw' && msg.messageSwahili
                          ? msg.messageSwahili
                          : msg.message}
                      </p>
                    </div>
                    {!isUser && msg.actions && msg.actions.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {msg.actions.map((action, index) => (
                          <Button
                            key={index}
                            size="sm"
                            variant="outline"
                            onClick={() => action.route && onNavigate(action.route)}
                          >
                            {language === 'sw' ? action.labelSwahili : action.label}
                          </Button>
                        ))}
                      </div>
                    )}
                    <span
                      className={`text-xs text-muted-foreground ${
                        isUser ? 'text-right' : 'text-left'
                      }`}
                    >
                      {msg.timestamp.toLocaleTimeString(
                        language === 'sw' ? 'sw-KE' : 'en-KE',
                        { hour: '2-digit', minute: '2-digit' }
                      )}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3">
                <AgentAvatar agentId={selectedAgent} size="sm" status="active" />
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input
                placeholder={
                  language === 'sw' ? 'Andika ujumbe...' : 'Type a message...'
                }
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button variant="ghost" size="sm">
                <Mic className="h-4 w-4" />
              </Button>
              <Button onClick={handleSend} size="sm" className="gap-2">
                <Send className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {language === 'sw' ? 'Tuma' : 'Send'}
                </span>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {language === 'sw'
                ? 'Mawakala wa AI wako tayari kusaidia 24/7'
                : 'AI agents ready to help 24/7'}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
