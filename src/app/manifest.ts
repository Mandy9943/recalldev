import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'RecallDev - Interview Mastery',
    short_name: 'RecallDev',
    description: 'Master technical interviews with active recall and spaced repetition.',
    start_url: '/',
    display: 'standalone',
    background_color: '#030712',
    theme_color: '#2563eb',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      // Note: User should add 192x192 and 512x512 icons for better PWA support
    ],
  }
}

