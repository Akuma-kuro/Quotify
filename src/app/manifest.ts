import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Quotify',
    short_name: 'Quotify',
    description: 'Daily inspiration through quotes',
    start_url: '/',
    display: 'standalone',
    background_color: '#1e1b4b',
    theme_color: '#6366f1',
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}