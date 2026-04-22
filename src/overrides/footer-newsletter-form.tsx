'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function FooterNewsletterForm() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  return (
    <form
      className="mt-4 flex flex-col gap-2 sm:flex-row"
      onSubmit={(e) => {
        e.preventDefault()
        if (!email.trim()) return
        setSent(true)
      }}
    >
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        className="h-11 rounded-xl border-teal-700/50 bg-teal-950/40 text-white placeholder:text-teal-300/60 focus-visible:ring-teal-400/40"
      />
      <Button type="submit" className="h-11 shrink-0 rounded-xl bg-teal-400 px-5 font-semibold text-teal-950 hover:bg-teal-300">
        {sent ? 'Thanks!' : 'Join'}
      </Button>
    </form>
  )
}
