FROM oven/bun:1-alpine AS builder
WORKDIR /app

COPY package.json bun.lock ./
COPY . .

ARG GITHUB_TOKEN
ARG DIRECTUS_URL
ARG DIRECTUS_STATIC_TOKEN
ARG BASE_URL

ENV DIRECTUS_URL=$DIRECTUS_URL \
    DIRECTUS_STATIC_TOKEN=$DIRECTUS_STATIC_TOKEN \
    BASE_URL=$BASE_URL

RUN --mount=type=cache,id=bun,target=/root/.bun/install/cache bun install --frozen-lockfile
RUN bun run build:web

FROM oven/bun:1-alpine AS runner

WORKDIR /app

ENV PORT=3000 \
    HOSTNAME="0.0.0.0" \
    NODE_ENV=production    

COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /app/apps/web/public ./apps/web/public

EXPOSE 3000
CMD ["bun", "apps/web/server.js"]