
import Link from 'next/link'
import { signup } from '../actions'

export default function SignupPage() {
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
                        Create an account
                    </h2>
                    <p className="mt-2 text-sm text-slate-400">
                        Join the marketplace for AI-verified human labor
                    </p>
                </div>

                <form action={signup} className="mt-8 space-y-6">
                    <div className="space-y-4 rounded-md shadow-sm">
                        <div>
                            <label htmlFor="full_name" className="sr-only">
                                Full Name
                            </label>
                            <input
                                id="full_name"
                                name="full_name"
                                type="text"
                                autoComplete="name"
                                required
                                className="relative block w-full rounded-xl border border-white/10 bg-white/5 py-3 px-4 text-white placeholder-slate-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm transition-colors"
                                placeholder="Full Name"
                            />
                        </div>
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
                                autoComplete="new-password"
                                required
                                className="relative block w-full rounded-xl border border-white/10 bg-white/5 py-3 px-4 text-white placeholder-slate-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm transition-colors"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-xl bg-primary py-3 px-4 text-sm font-bold text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900 transition-all active:scale-[0.98]"
                        >
                            Sign up
                        </button>
                    </div>
                </form>

                <div className="text-center text-sm">
                    <p className="text-slate-400">
                        Already have an account?{' '}
                        <Link href="/login" className="font-medium text-primary hover:text-primary/80">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
