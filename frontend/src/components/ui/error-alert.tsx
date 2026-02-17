import { AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from './alert';
import { ApiClientError } from '../../lib/api-enhanced';

interface ErrorAlertProps {
    error: ApiClientError | Error | null;
    language?: 'en' | 'sw';
}

export function ErrorAlert({ error, language = 'en' }: ErrorAlertProps) {
    if (!error) return null;

    const errorMessage = error instanceof ApiClientError
        ? error.getUserMessage(language)
        : error.message;

    return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{language === 'sw' ? 'Hitilafu' : 'Error'}</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
    );
}
