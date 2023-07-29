# note

> some notes.

## React/Typescript

### Inline style with css var

ts warning: `React.CSSProperties`
- ref: https://reacthustle.com/blog/how-to-set-inline-styles-in-react-typescript

## Next.js

### cache

[Official doc](https://nextjs.org/docs/app/building-your-application/data-fetching/caching)
- default all `fetch()` requests
- react `cache()`

### layout

便利な機能！

### Error: hydration

[Official doc](https://nextjs.org/docs/messages/react-hydration-error)

when using next-themes with nextjs13: apply `suppressHydrationWarning` to `<html>`
- ref: https://github.com/pacocoursey/next-themes/issues/169

## Prisma

Basic flow:
- Prisma init
- Migrate & seed
- Link to vercel

### seed

[code](./prisma/seed.ts)

Use a csv file as seed: `csvtojson` and `prisma.createMany` API.

### PrismaClient

[Best practice for instantiating PrismaClient with Next.js](https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices)

## Tailwind CSS

### arbitrary values

[Official doc](https://tailwindcss.com/docs/adding-custom-styles#using-arbitrary-values)

Dynamic variable in js not always working, use inline style + css var
- https://stackoverflow.com/questions/70584680/problem-with-arbitrary-values-on-tailwind-with-react
- https://stackoverflow.com/questions/28365233/inline-css-styles-in-react-how-to-implement-ahover

## Others

### Auth error: ETIMEDOUT

set HTTP_PROXY & HTTPS_PROXY
- [issue](https://github.com/googleapis/google-auth-library-nodejs/issues/283)


