'use client'

import { Button } from '@/components/ui/button'
import { UserPlus } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function FollowButton() {
  const router = useRouter()

  const handleFollow = () => {
    router.push('/login')
  }

  return (
    <Button variant="outline" size="sm" className="gap-2" onClick={handleFollow}>
      <UserPlus className="h-4 w-4" />
      Follow
    </Button>
  )
}
