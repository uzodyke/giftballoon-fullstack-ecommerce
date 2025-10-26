import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  site: 'https://giftedballoon.com',
  output: 'hybrid',
  adapter: vercel(),
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      customPages: [
        'https://giftedballoon.com/',
        'https://giftedballoon.com/shop',
        'https://giftedballoon.com/about',
        'https://giftedballoon.com/contact',
        'https://giftedballoon.com/faq',
        'https://giftedballoon.com/locations/london',
        'https://giftedballoon.com/locations/manchester',
        'https://giftedballoon.com/locations/birmingham',
        'https://giftedballoon.com/locations/coventry',
        'https://giftedballoon.com/services/weddings',
        'https://giftedballoon.com/services/corporate-events',
        'https://giftedballoon.com/services/birthdays',
        'https://giftedballoon.com/services/graduations',
        'https://giftedballoon.com/services/valentines-day'
      ],
      entryLimit: 45000
    }),
    tailwind()
  ],
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
    assets: 'assets',
    format: 'directory'
  },
  vite: {
    build: {
      cssCodeSplit: false,
      minify: 'esbuild',
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name].[hash][extname]',
          chunkFileNames: 'assets/[name].[hash].js',
          entryFileNames: 'assets/[name].[hash].js'
        }
      }
    }
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  }
});