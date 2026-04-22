'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FileText, Sparkles, UserRound } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG } from '@/lib/site-config'
import { loadFromStorage, storageKeys } from '@/lib/local-storage'
import type { User } from '@/types'

export const LOGIN_PAGE_OVERRIDE_ENABLED = true

export function LoginPageOverride() {
  const { login, isLoading } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    if (!email.trim() || !password) {
      setError('Enter your email and password to continue.')
      return
    }
    await login(email.trim(), password)
    const saved = loadFromStorage<User | null>(storageKeys.user, null)
    if (saved) {
      router.push('/')
      router.refresh()
      return
    }
    setError('Sign in did not complete. Check your details and try again.')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white text-slate-900">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
          <div className="rounded-[2rem] border border-teal-100 bg-gradient-to-br from-teal-900 to-teal-700 p-8 text-white shadow-xl lg:p-10">
            <div className="flex gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                <FileText className="h-6 w-6" />
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <UserRound className="h-6 w-6" />
              </div>
            </div>
            <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">Welcome back to your PDF & profile workspace</h1>
            <p className="mt-4 text-sm leading-relaxed text-teal-100/90">
              Access saved documents, profile tools, and your dashboard. Successful sign-in keeps you signed in on this device using local storage—no extra setup required for this preview environment.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-teal-50/95">
              <li className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3">Browse the PDF library and expert profiles from one account.</li>
              <li className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3">Pick up where you left off with a calmer, document-first layout.</li>
            </ul>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg lg:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">Sign in</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">Continue to {SITE_CONFIG.name}</h2>
            <form className="mt-8 grid gap-5" onSubmit={onSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-xl border-slate-200"
                  placeholder="you@company.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 rounded-xl border-slate-200"
                  placeholder="••••••••"
                />
              </div>
              {error ? <p className="text-sm text-red-600">{error}</p> : null}
              <Button
                type="submit"
                disabled={isLoading}
                className="h-12 rounded-full bg-teal-600 text-base font-semibold text-white hover:bg-teal-500 disabled:opacity-60"
              >
                {isLoading ? 'Signing in…' : 'Sign in'}
              </Button>
            </form>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
              <Link href="/forgot-password" className="hover:text-teal-700 hover:underline">
                Forgot password?
              </Link>
              <Link href="/register" className="inline-flex items-center gap-2 font-semibold text-teal-700 hover:underline">
                <Sparkles className="h-4 w-4" />
                Create account
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
