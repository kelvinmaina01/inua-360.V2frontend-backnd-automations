import { Loader2 } from 'lucide-react';
import { cn } from './utils';

export function LoadingSpinner({ className }: { className?: string }) {
    return (
        <div className="flex justify-center items-center p-8">
            <Loader2 className={cn("h-8 w-8 animate-spin text-primary", className)} />
        </div>
    );
}
