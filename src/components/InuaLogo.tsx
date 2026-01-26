import { cn } from '../lib/utils';

interface InuaLogoProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    showPulse?: boolean;
    showSlogan?: boolean;
    language?: 'en' | 'sw';
    className?: string;
}

/**
 * Inua 360 Logo with optional slogan
 * Uses the official Inua360 brand logo
 */
export function InuaLogo({
    size = 'md',
    showPulse = false,
    showSlogan = true,
    language = 'en',
    className
}: InuaLogoProps) {
    const sizeMap = {
        sm: 'h-8',
        md: 'h-12',
        lg: 'h-16',
        xl: 'h-20',
    };

    const slogan = language === 'sw' ? 'Wakala wako wa SME AI' : 'Your SME AI Agent';

    return (
        <div className={cn('relative inline-flex flex-col items-center gap-1', className)}>
            <div className="relative">
                <img
                    src="/assets/inua360-logo.png"
                    alt="Inua360"
                    className={cn(sizeMap[size], 'object-contain')}
                />

                {/* Active indicator dot */}
                {showPulse && (
                    <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500" />
                    </span>
                )}
            </div>

            {showSlogan && (
                <p className="text-xs text-muted-foreground font-medium text-center">
                    {slogan}
                </p>
            )}
        </div>
    );
}
