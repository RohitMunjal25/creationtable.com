import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { PdfProfileLanding } from '@/components/home/pdf-profile-landing'
import { SITE_CONFIG } from '@/lib/site-config'
import { fetchTaskPosts } from '@/lib/task-data'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

export const HOME_PAGE_OVERRIDE_ENABLED = true

type PostWithTask = { post: SitePost; task: TaskKey }

function mergeFeatured(pdfPosts: SitePost[], profilePosts: SitePost[]): PostWithTask[] {
  const out: PostWithTask[] = []
  const max = 4
  let i = 0
  let j = 0
  while (out.length < max && (i < pdfPosts.length || j < profilePosts.length)) {
    if (out.length % 2 === 0 && i < pdfPosts.length) {
      out.push({ post: pdfPosts[i], task: 'pdf' })
      i += 1
    } else if (j < profilePosts.length) {
      out.push({ post: profilePosts[j], task: 'profile' })
      j += 1
    } else if (i < pdfPosts.length) {
      out.push({ post: pdfPosts[i], task: 'pdf' })
      i += 1
    } else {
      break
    }
  }
  return out
}

function mergeLatest(pdfPosts: SitePost[], profilePosts: SitePost[]): PostWithTask[] {
  const combined: PostWithTask[] = [
    ...pdfPosts.map((post) => ({ post, task: 'pdf' as const })),
    ...profilePosts.map((post) => ({ post, task: 'profile' as const })),
  ]
  combined.sort((a, b) => {
    const ta = new Date(a.post.publishedAt || a.post.createdAt || 0).getTime()
    const tb = new Date(b.post.publishedAt || b.post.createdAt || 0).getTime()
    return tb - ta
  })
  return combined.slice(0, 4)
}

export async function HomePageOverride() {
  const [pdfPosts, profilePosts] = await Promise.all([
    fetchTaskPosts('pdf', 8, { allowMockFallback: true, fresh: true }),
    fetchTaskPosts('profile', 8, { allowMockFallback: true, fresh: true }),
  ])

  const featured = mergeFeatured(pdfPosts, profilePosts)
  const latest = mergeLatest(pdfPosts, profilePosts)

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      logo: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${SITE_CONFIG.defaultOgImage}`,
      sameAs: [],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ]

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <NavbarShell />
      <SchemaJsonLd data={schemaData} />
      <PdfProfileLanding featured={featured} latest={latest} />
      <Footer />
    </div>
  )
}
