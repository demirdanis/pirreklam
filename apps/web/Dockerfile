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
ARG DIRECTUS_CUSTOMER_ROLE_ID
ARG SMTP_HOST
ARG SMTP_PORT
ARG SMTP_USER
ARG SMTP_PASS
ARG SMTP_FROM
ARG WEBHOOK_SECRET
ARG ADMIN_EMAIL
ARG CMS_ADMIN_URL



ENV DIRECTUS_URL=$DIRECTUS_URL \
    DIRECTUS_STATIC_TOKEN=$DIRECTUS_STATIC_TOKEN \
    BASE_URL=$BASE_URL \
    ASSETS_URL=$ASSETS_URL \
    DIRECTUS_GRAPHQL_URL=$DIRECTUS_GRAPHQL_URL \
    DIRECTUS_CUSTOMER_ROLE_ID=$DIRECTUS_CUSTOMER_ROLE_ID \
    SMTP_HOST=$SMTP_HOST \
    SMTP_PORT=$SMTP_PORT \
    SMTP_USER=$SMTP_USER \
    SMTP_PASS=$SMTP_PASS \
    SMTP_FROM=$SMTP_FROM \
    WEBHOOK_SECRET=$WEBHOOK_SECRET \
    ADMIN_EMAIL=$ADMIN_EMAIL \
    CMS_ADMIN_URL=$CMS_ADMIN_URL

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
CMD ["sh", "-c", "node apps/web/server.js"]