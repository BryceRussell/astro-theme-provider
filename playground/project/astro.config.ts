import { defineConfig } from 'astro/config';
import MyTheme from 'my-theme';

export default defineConfig({
  integrations: [
    MyTheme({
      config: {
        title: 'Hey!',
        description: 'This is a theme created using',
      },
      pages: {
        // '/cats': '/dogs',
        // '/cats/[...cat]': '/dogs/[...cat]',
      },
      overrides: {
        css: [
          // "./custom.css"
        ],
        components: {
          // Heading: './CustomHeading.astro'
        }
      }
    })
  ]
});

type tt = Parameters<typeof MyTheme>[0]
