FROM oven/bun:1-alpine AS builder
WORKDIR /app

COPY package.json bun.lockb ./
COPY . .

ARG GITHUB_TOKEN

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