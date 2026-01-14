import { cn } from '../lib/utils';

interface InuaLogoProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    showPulse?: boolean;
    className?: string;
}

/**
 * Inua 360 Logo - Abstract 360° design representing:
 * - Complete business view (360° circle)
 * - AI agents (interconnected nodes)
 * - SME growth (upward arrow/trend)
 * Minimalistic design with brand orange color
 */
export function InuaLogo({ size = 'md', showPulse = false, className }: InuaLogoProps) {
    const sizeMap = {
        sm: { container: 'w-8 h-8', viewBox: 48 },
        md: { container: 'w-12 h-12', viewBox: 48 },
        lg: { container: 'w-16 h-16', viewBox: 48 },
        xl: { container: 'w-20 h-20', viewBox: 48 },
    };

    const { container, viewBox } = sizeMap[size];

    return (
        <div className={cn('relative inline-flex', className)}>
            <svg
                viewBox={`0 0 ${viewBox} ${viewBox}`}
                className={cn(
                    container,
                    showPulse && 'animate-logo-pulse'
                )}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Outer 360° arc - represents complete business view */}
                <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="url(#gradient-arc)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray="100 26"
                    className="origin-center"
                    style={{ transform: 'rotate(-45deg)', transformOrigin: 'center' }}
                />

                {/* Inner filled circle - core business */}
                <circle
                    cx="24"
                    cy="24"
                    r="12"
                    fill="url(#gradient-core)"
                    className="opacity-15"
                />

                {/* Central hub - represents the AI supervisor */}
                <circle
                    cx="24"
                    cy="24"
                    r="5"
                    fill="url(#gradient-hub)"
                />

                {/* Node 1 - Top (Compliance Agent) */}
                <circle cx="24" cy="10" r="3" fill="#22C55E" className="animate-node-pulse" style={{ animationDelay: '0ms' }} />
                <line x1="24" y1="13" x2="24" y2="19" stroke="#22C55E" strokeWidth="1.5" strokeOpacity="0.6" />

                {/* Node 2 - Right (Funding Agent) */}
                <circle cx="36" cy="20" r="3" fill="#FBBF24" className="animate-node-pulse" style={{ animationDelay: '150ms' }} />
                <line x1="33.5" y1="21.5" x2="28.5" y2="23" stroke="#FBBF24" strokeWidth="1.5" strokeOpacity="0.6" />

                {/* Node 3 - Bottom Right (Cashflow Agent) */}
                <circle cx="34" cy="32" r="3" fill="#00B8A9" className="animate-node-pulse" style={{ animationDelay: '300ms' }} />
                <line x1="31.5" y1="30.5" x2="27.5" y2="26.5" stroke="#00B8A9" strokeWidth="1.5" strokeOpacity="0.6" />

                {/* Node 4 - Bottom Left (Profile Agent) */}
                <circle cx="14" cy="32" r="3" fill="#FA6915" className="animate-node-pulse" style={{ animationDelay: '450ms' }} />
                <line x1="16.5" y1="30.5" x2="20.5" y2="26.5" stroke="#FA6915" strokeWidth="1.5" strokeOpacity="0.6" />

                {/* Growth arrow overlay */}
                <path
                    d="M20 28L24 20L28 28"
                    stroke="#FA6915"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />
                <line x1="24" y1="20" x2="24" y2="30" stroke="#FA6915" strokeWidth="2.5" strokeLinecap="round" />

                {/* Gradient definitions */}
                <defs>
                    <linearGradient id="gradient-arc" x1="0" y1="0" x2="48" y2="48">
                        <stop offset="0%" stopColor="#FA6915" />
                        <stop offset="50%" stopColor="#FB923C" />
                        <stop offset="100%" stopColor="#FBBF24" />
                    </linearGradient>
                    <linearGradient id="gradient-core" x1="12" y1="12" x2="36" y2="36">
                        <stop offset="0%" stopColor="#FA6915" />
                        <stop offset="100%" stopColor="#FB923C" />
                    </linearGradient>
                    <linearGradient id="gradient-hub" x1="19" y1="19" x2="29" y2="29">
                        <stop offset="0%" stopColor="#FA6915" />
                        <stop offset="100%" stopColor="#D9580D" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Active indicator dot */}
            {showPulse && (
                <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500" />
                </span>
            )}
        </div>
    );
}
