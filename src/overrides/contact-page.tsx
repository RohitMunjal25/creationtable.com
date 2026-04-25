import Link from 'next/link'
import { FileText, Mail, MessageCircle, UserRound } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { Button } from '@/components/ui/button'

export const CONTACT_PAGE_OVERRIDE_ENABLED = true

const lanes = [
  {
    icon: FileText,
    title: 'PDF library & licensing',
    body: 'Questions about downloadable packs, redistribution, or missing documents in the catalog—our team routes this to the right owner.',
  },
  {
    icon: UserRound,
    title: 'Profiles & verification',
    body: 'Updates to expert bios, attribution, or profile visibility. We help keep public profiles accurate and respectful.',
  },
  {
    icon: MessageCircle,
    title: 'Product feedback',
    body: 'Ideas for search, previews, or the teal experience—we read every note and fold the best requests into the roadmap.',
  },
]

export function ContactPageOverride() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-slate-50 text-slate-900">
      <NavbarShell />
      <main>
        <section className="relative overflow-hidden border-b border-teal-800/15 bg-gradient-to-br from-teal-950 via-teal-900 to-teal-700 px-4 py-14 text-white sm:px-6 lg:px-8 lg:py-18">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(45,212,191,0.2),transparent_50%)]" />
          <div className="relative mx-auto max-w-7xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-200/90">Contact</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">We are here for PDFs, profiles, and everything in between.</h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-teal-100/95">
              Share enough context—document title, profile URL, or search query—and we will respond with the fastest path forward. No generic queues.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start">
            <div className="space-y-4">
              {lanes.map((lane) => (
                <div key={lane.title} className="rounded-3xl border border-teal-100 bg-white p-6 shadow-sm">
                  <lane.icon className="h-5 w-5 text-teal-700" />
                  <h2 className="mt-3 text-xl font-semibold text-slate-900">{lane.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{lane.body}</p>
                </div>
              ))}
              <div className="rounded-3xl border border-teal-900/10 bg-gradient-to-br from-teal-900 to-teal-700 p-6 text-white">
                <Mail className="h-5 w-5 text-teal-100" />
                <p className="mt-3 text-sm font-semibold">Prefer email?</p>
                <p className="mt-2 text-sm text-teal-100/90">Use the form—replies come from the same address so threads stay in one place.</p>
                <Button variant="secondary" className="mt-4 rounded-full border-0 bg-white font-semibold text-teal-900 hover:bg-teal-50" asChild>
                  <Link href="/help">Browse help first</Link>
                </Button>
              </div>
            </div>

            <div className="rounded-[2rem] border border-teal-100 bg-white p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-slate-900">Send a message</h2>
              <p className="mt-2 text-sm text-slate-600">Tell us what you tried and what you expected—we typically reply within two business days.</p>
              <form className="mt-8 grid gap-4">
                <input className="h-12 rounded-xl border border-teal-100 bg-slate-50/80 px-4 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-teal-500/30" placeholder="Your name" />
                <input className="h-12 rounded-xl border border-teal-100 bg-slate-50/80 px-4 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-teal-500/30" placeholder="Work email" type="email" />
                <input className="h-12 rounded-xl border border-teal-100 bg-slate-50/80 px-4 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-teal-500/30" placeholder="Topic (e.g. PDF download, profile edit)" />
                <textarea
                  className="min-h-[180px] rounded-2xl border border-teal-100 bg-slate-50/80 px-4 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-teal-500/30"
                  placeholder="Include links, file names, or screenshots so we can help in one pass."
                />
                <Button type="submit" className="h-12 rounded-full bg-teal-600 text-base font-semibold text-white hover:bg-teal-500">
                  Send message
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
