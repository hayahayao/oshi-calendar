# note

> some notes.

## Next.js

### cache

[Official doc](https://nextjs.org/docs/app/building-your-application/data-fetching/caching)
- default all `fetch()` requests
- react `cache()`

### layout!

## Prisma

Basic flow:
- Prisma init
- Migrate & seed
- Link to vercel

### seed

Use a csv file as seed: `csvtojson` and `prisma.createMany` API. [code](./prisma/seed.ts)

### PrismaClient

[Best practice for instantiating PrismaClient with Next.js](https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices)

## Others

### Auth error: ETIMEDOUT

[issue](https://github.com/googleapis/google-auth-library-nodejs/issues/283)

set HTTP_PROXY & HTTPS_PROXY

