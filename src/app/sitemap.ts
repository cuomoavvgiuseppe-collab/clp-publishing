import type { MetadataRoute } from 'next'

const BASE_URL = 'https://publishing.studiolegalecuomogiuseppe.it'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/autore`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.7 },
    { url: `${BASE_URL}/collane`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ]
}
