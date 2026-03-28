FROM directus/directus:11.17.0

USER root

COPY --chown=node:node apps/cms/extensions /directus/extensions
COPY --chown=node:node apps/cms/snapshots /directus/snapshots

USER node

CMD ["sh", "-c", "node cli.js bootstrap || true && node cli.js schema apply --yes /directus/snapshots/latest.yaml || true && node cli.js start"]