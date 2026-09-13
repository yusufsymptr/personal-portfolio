import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://yusufsyamputra.vercel.app' 

  const locales = ['en', 'id']
  const routes = ['', '/about', '/projects', '/skills', '/contact']

  const sitemapEntries: MetadataRoute.Sitemap = []

  locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.8,
      })
    })
  })

  return sitemapEntries
}