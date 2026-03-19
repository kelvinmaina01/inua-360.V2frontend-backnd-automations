import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '../components/ui/card';
import { useAuth } from '../contexts/AuthContext';
import { useContent } from '../hooks/useContent';
import { InuaLogo } from '../components/InuaLogo';
import { Mail, Lock, ArrowRight, Loader2, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

export function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { signIn, signUp, signInWithGoogle } = useAuth();
    const { t } = useContent();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isLogin && password !== confirmPassword) {
            toast.error(t('auth.password_mismatch', 'Passwords do not match'));
            return;
        }

        setLoading(true);
        try {
            if (isLogin) {
                await signIn(email, password);
                toast.success(t('auth.login_success', 'Welcome back!'));
            } else {
                await signUp(email, password);
                toast.success(t('auth.signup_success', 'Account created successfully!'));
            }
        } catch (error: any) {
            toast.error(error.message || t('auth.error', 'Authentication failed'));
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        try {
            await signInWithGoogle();
            toast.success(t('auth.login_success', 'Welcome back!'));
        } catch (error: any) {
            toast.error(error.message || t('auth.error', 'Google sign in failed'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden p-4">
            <div className="landing-grid absolute inset-0 z-0" />

            <div className="relative z-10 w-full max-w-2xl">
                <div className="flex flex-col items-center mb-8">
                    <InuaLogo size="lg" className="mb-4" />
                    <h1 className="text-4xl font-black tracking-tight text-foreground">
                        {isLogin ? t('auth.login_title', 'Welcome back') : t('auth.signup_title', 'Join Inua360')}
                    </h1>
                    <p className="mt-3 text-center text-lg max-w-md text-primary font-medium">
                        {isLogin
                            ? t('auth.login_desc', 'Enter your credentials to access your business copilot')
                            : t('auth.signup_desc', 'Start your journey to becoming funding-ready today')}
                    </p>
                </div>

                <Card className="border-border/50 bg-card shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden border-2">
                    <CardHeader className="p-0">
                        <div className="flex bg-muted/30 p-1.5 border-b border-border/50">
                            <div className="flex w-full gap-2 p-1 bg-muted/20 rounded-2xl border-2 border-primary/10">
                                <button
                                    className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${isLogin ? 'bg-primary shadow-lg text-primary-foreground scale-[1.02] border-2 border-primary' : 'text-muted-foreground hover:text-foreground hover:bg-background/50'}`}
                                    onClick={() => setIsLogin(true)}
                                >
                                    {t('auth.login', 'Login')}
                                </button>
                                <button
                                    className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${!isLogin ? 'bg-primary shadow-lg text-primary-foreground scale-[1.02] border-2 border-primary' : 'text-muted-foreground hover:text-foreground hover:bg-background/50'}`}
                                    onClick={() => setIsLogin(false)}
                                >
                                    {t('auth.signup', 'Register')}
                                </button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8 sm:p-10">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-foreground/80 ml-1">
                                    {t('auth.email_label', 'Email Address')}
                                </label>
                                <div className="relative group">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-primary text-muted-foreground z-10">
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    <Input
                                        type="email"
                                        placeholder="name@company.com"
                                        style={{ paddingLeft: '76px' }}
                                        className="h-14 bg-muted/20 border-primary/30 focus:border-primary focus:bg-background transition-all text-lg rounded-2xl shadow-sm placeholder:text-muted-foreground/50"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-foreground/80 ml-1">
                                        {t('auth.password_label', 'Password')}
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-primary text-muted-foreground z-10">
                                            <Lock className="h-5 w-5" />
                                        </div>
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            style={{ paddingLeft: '76px' }}
                                            className="pr-12 h-14 bg-muted/20 border-primary/30 focus:border-primary focus:bg-background transition-all text-lg rounded-2xl shadow-sm placeholder:text-muted-foreground/50"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        </button>
                                    </div>
                                </div>

                                {!isLogin && (
                                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <label className="text-sm font-semibold text-foreground/80 ml-1">
                                            {t('auth.confirm_password_label', 'Confirm Password')}
                                        </label>
                                        <div className="relative group">
                                            <div className="absolute left-5 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-primary text-muted-foreground z-10">
                                                <Lock className="h-5 w-5" />
                                            </div>
                                            <Input
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="••••••••"
                                                style={{ paddingLeft: '76px' }}
                                                className="pr-12 h-14 bg-muted/20 border-primary/30 focus:border-primary focus:bg-background transition-all text-lg rounded-2xl shadow-sm placeholder:text-muted-foreground/50"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                required={!isLogin}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                                            >
                                                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Button type="submit" className="w-full h-14 text-lg font-bold group rounded-2xl shadow-lg shadow-primary/20 border-2 border-primary/20 hover:border-primary/50 transition-all font-sans" disabled={loading}>
                                {loading ? (
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                ) : (
                                    <>
                                        {isLogin ? t('auth.login_btn', 'Sign In') : t('auth.signup_btn', 'Create Account')}
                                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </Button>
                        </form>

                        <div className="relative my-12">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-border/80" />
                            </div>
                            <div className="relative flex justify-center text-sm lowercase font-medium">
                                <span className="bg-card px-6 text-muted-foreground/50">
                                    {t('auth.or_continue', 'or continue with')}
                                </span>
                            </div>
                        </div>

                        <Button
                            variant="outline"
                            className="w-full h-14 text-lg font-bold border-primary/30 hover:border-primary hover:bg-background hover:shadow-md transition-all rounded-2xl bg-background/30 flex items-center justify-center gap-3 group"
                            onClick={handleGoogleSignIn}
                            disabled={loading}
                        >
                            <svg className="w-6 h-6 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="currentColor"
                                    className="text-[#4285F4]"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="currentColor"
                                    className="text-[#34A853]"
                                />
                                <path
                                    d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
                                    fill="currentColor"
                                    className="text-[#FBBC05]"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 12-5.38z"
                                    fill="currentColor"
                                    className="text-[#EA4335]"
                                />
                            </svg>
                            Google
                        </Button>
                    </CardContent>
                    <CardFooter className="p-8 pt-0 flex flex-col space-y-4">
                        <p className="text-sm text-center text-muted-foreground/70 font-medium">
                            {t('auth.terms_agreement', 'By continuing, you agree to our')}
                            <a href="#" className="text-primary hover:underline mx-1.5 font-bold transition-all">{t('auth.terms', 'Terms of Service')}</a>
                            {t('auth.and', 'and')}
                            <a href="#" className="text-primary hover:underline ml-1.5 font-bold transition-all">{t('auth.privacy', 'Privacy Policy')}</a>.
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
