import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Smartphone } from 'lucide-react';

interface WhatsAppMockMessageProps {
  language: 'en' | 'sw';
}

export function WhatsAppMockMessage({ language }: WhatsAppMockMessageProps) {
  const message = language === 'sw'
    ? `Habari John! ☀️

Janalimefanya KES 84,200
Gharama za stoki KES 41k (kawaida)
Fedha katika till + mifuko KES 127,400
Kwenye njia ya KES 2.9M mwezi huu ↑18%

Kuna kitu leo?
1 Tafuta fedha
2 Lipa muuzaji
3 Hakuna kitu`
    : `Habari John! ☀️

Yesterday your duka made KES 84,200
Stock expenses KES 41k (normal)
Cash in till + pockets KES 127,400
On track for KES 2.9M this month ↑18%

Anything today?
1 Find funding
2 Pay supplier
3 Nothing`;

  return (
    <Card className="p-6 bg-gradient-to-br from-success/10 to-success/5 border-success/20">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-success rounded-lg">
            <Smartphone className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="text-success">
              {language === 'sw' ? 'Ujumbe wa WhatsApp wa Asubuhi' : 'WhatsApp Morning Message'}
            </h4>
            <p className="text-xs text-muted-foreground">
              {language === 'sw' ? 'Kila siku saa 8:00 AM' : 'Daily at 8:00 AM'}
            </p>
          </div>
          <Badge className="bg-success text-white">
            {language === 'sw' ? 'Kiotomatiki' : 'Auto'}
          </Badge>
        </div>

        {/* Mock WhatsApp Message Bubble */}
        <div className="relative">
          <div className="bg-[#DCF8C6] rounded-lg rounded-tl-none p-4 shadow-sm">
            <div className="flex items-start gap-2 mb-2">
              <span className="text-xs font-semibold text-success">Inua360</span>
            </div>
            <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800">
              {message}
            </pre>
            <div className="flex items-center justify-end gap-1 mt-2">
              <span className="text-[10px] text-gray-500">08:00</span>
              <svg className="h-4 w-4 text-secondary" viewBox="0 0 16 15" fill="currentColor">
                <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.511zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" />
              </svg>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          {language === 'sw'
            ? 'Jibu kwa nambari kuendelea'
            : 'Reply with number to continue'}
        </p>
      </div>
    </Card>
  );
}
