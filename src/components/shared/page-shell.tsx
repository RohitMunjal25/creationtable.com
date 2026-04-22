'use client'

import type { ReactNode } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { cn } from '@/lib/utils'

export function PageShell({
  title,
  description,
  actions,
  children,
  variant = 'default',
}: {
  title: string
  description?: string
  actions?: ReactNode
  children?: ReactNode
  variant?: 'default' | 'teal'
}) {
  if (variant === 'teal') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-slate-50 text-slate-900">
        <NavbarShell />
        <main>
          <section className="relative overflow-hidden border-b border-teal-800/20 bg-gradient-to-br from-teal-950 via-teal-900 to-teal-700 px-4 py-12 text-white sm:px-6 lg:px-8 lg:py-16">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(45,212,191,0.2),transparent_50%)]" />
            <div className="relative mx-auto max-w-7xl">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-200/90">Creationtable</p>
                  <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{title}</h1>
                  {description ? (
                    <p className="mt-4 max-w-2xl text-base leading-relaxed text-teal-100/95">{description}</p>
                  ) : null}
                </div>
                {actions ? <div className="flex flex-shrink-0 flex-wrap gap-3">{actions}</div> : null}
              </div>
            </div>
          </section>
          <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">{children}</section>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <NavbarShell />
      <main>
        <section className="border-b border-border bg-secondary/30">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">{title}</h1>
                {description && (
                  <p className="mt-2 max-w-2xl text-muted-foreground">{description}</p>
                )}
              </div>
              {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
            </div>
          </div>
        </section>
        <section className={cn('mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8')}>{children}</section>
      </main>
      <Footer />
    </div>
  )
}
