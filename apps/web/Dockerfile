FROM node:20-alpine AS builder
RUN apk add --no-cache curl unzip bash && \
    curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:$PATH"
WORKDIR /app

COPY package.json bun.lock ./
COPY . .

ARG GITHUB_TOKEN
ARG DIRECTUS_URL
ARG DIRECTUS_STATIC_TOKEN
ARG ASSETS_URL
ARG DIRECTUS_GRAPHQL_URL
ARG BASE_URL

ENV DIRECTUS_URL=$DIRECTUS_URL \
    DIRECTUS_STATIC_TOKEN=$DIRECTUS_STATIC_TOKEN \
    BASE_URL=$BASE_URL \
    ASSETS_URL=$ASSETS_URL \
    DIRECTUS_GRAPHQL_URL=$DIRECTUS_GRAPHQL_URL

RUN --mount=type=cache,id=bun,target=/root/.bun/install/cache bun install --frozen-lockfile
RUN bun run build:web

FROM node:20-alpine AS runner

WORKDIR /app

ENV PORT=3000 \
    HOSTNAME="0.0.0.0" \
    NODE_ENV=production    

COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /app/apps/web/public ./apps/web/public

EXPOSE 3000
CMD ["sh", "-c", "echo '=== ENVIRONMENT VARIABLES ==='; echo DIRECTUS_URL=$DIRECTUS_URL; echo DIRECTUS_GRAPHQL_URL=$DIRECTUS_GRAPHQL_URL; echo ASSETS_URL=$ASSETS_URL; echo BASE_URL=$BASE_URL; echo DIRECTUS_STATIC_TOKEN=${DIRECTUS_STATIC_TOKEN:+SET}; echo PORT=$PORT; echo NODE_ENV=$NODE_ENV; echo '=== STARTING SERVER ==='; node apps/web/server.js"]