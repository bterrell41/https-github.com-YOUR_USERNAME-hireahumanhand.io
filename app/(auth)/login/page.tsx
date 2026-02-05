
import Link from 'next/link'
import { login } from '../actions'

export default function LoginPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-background">
            <div className="w-full max-w-md space-y-8 glass-card p-8 rounded-2xl border border-white/10">
                <div className="text-center">
                    <Link href="/" className="inline-block mb-6">
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
                            Human Hand
                        </span>
                    </Link>
                    <h2 className="text-3xl font-bold tracking-tight text-white">
                        Welcome back
                    </h2>
                    <p className="mt-2 text-sm text-slate-400">
                        Sign in to manage your tasks and profile
                    </p>
                </div>

                <form action={login} className="mt-8 space-y-6">
                    <div className="space-y-4 rounded-md shadow-sm">
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="relative block w-full rounded-xl border border-white/10 bg-white/5 py-3 px-4 text-white placeholder-slate-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm transition-colors"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="relative block w-full rounded-xl border border-white/10 bg-white/5 py-3 px-4 text-white placeholder-slate-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm transition-colors"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-slate-400">
                                Remember me
                            </label>
                        </div>

                        <a href="#" className="font-medium text-primary hover:text-primary/80">
                            Forgot password?
                        </a>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-xl bg-primary py-3 px-4 text-sm font-bold text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900 transition-all active:scale-[0.98]"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <div className="text-center text-sm">
                    <p className="text-slate-400">
                        Don&apos;t have an account?{' '}
                        <Link href="/signup" className="font-medium text-primary hover:text-primary/80">
                            Sign up free
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
