import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { BookOpen, Download, FileText, Search, UserRound } from 'lucide-react'
import { mockFaqs } from '@/data/mock-data'

const topics = [
  {
    title: 'Finding & opening PDFs',
    description: 'Use search filters, categories, and previews to locate the right file before you download or share it with your team.',
    icon: Search,
  },
  {
    title: 'Profiles & credibility',
    description: 'Learn how profile fields map to expertise, how to read ratings, and how profiles link back to authored PDFs.',
    icon: UserRound,
  },
  {
    title: 'Downloads & formats',
    description: 'Understand file naming, size hints, and what to do when a document is updated or replaced in the library.',
    icon: Download,
  },
  {
    title: 'Account & workspace',
    description: 'Sign in to save time across sessions, access your dashboard, and manage notification preferences.',
    icon: BookOpen,
  },
]

export default function HelpPage() {
  return (
    <PageShell
      variant="teal"
      title="Help center"
      description="Guides for searching the PDF library, reading profiles, and getting the most out of Creationtable—aligned with the same teal experience as the rest of the site."
      actions={
        <Button className="rounded-full border-0 bg-white font-semibold text-teal-900 hover:bg-teal-50" asChild>
          <Link href="/contact">Contact support</Link>
        </Button>
      }
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr]">
        <div className="grid gap-5 sm:grid-cols-2">
          {topics.map((topic) => (
            <Card key={topic.title} className="rounded-3xl border border-teal-100 bg-white shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-600 text-white">
                  <topic.icon className="h-5 w-5" />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-slate-900">{topic.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{topic.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="rounded-3xl border border-teal-100 bg-white shadow-sm">
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-teal-700" />
              <h3 className="text-lg font-semibold text-slate-900">Frequently asked questions</h3>
            </div>
            <p className="mt-2 text-sm text-slate-600">Quick answers about PDFs, profiles, and the library—tailored to this product.</p>
            <Accordion type="single" collapsible className="mt-6">
              {mockFaqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="border-teal-100">
                  <AccordionTrigger className="text-left text-slate-900 hover:text-teal-800 hover:no-underline">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-slate-600">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-12 overflow-hidden rounded-3xl border-0 bg-gradient-to-r from-teal-800 to-teal-600 text-white shadow-lg">
        <CardContent className="flex flex-col gap-4 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-teal-100">Still stuck?</p>
            <p className="mt-1 max-w-xl text-sm text-teal-50/95">
              Send us the document title, profile link, or search query you tried—we will point you to the fastest fix.
            </p>
          </div>
          <Button variant="secondary" className="rounded-full border-0 bg-white font-semibold text-teal-900 hover:bg-teal-50" asChild>
            <Link href="/contact">Open contact form</Link>
          </Button>
        </CardContent>
      </Card>
    </PageShell>
  )
}
