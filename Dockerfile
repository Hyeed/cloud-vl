##########################################################
# Base for all stages
FROM alpine:3.15 as base

WORKDIR /usr/src/app

RUN apk update && apk add nodejs npm
RUN npm install -g pnpm

RUN addgroup node && adduser -G node -s /bin/sh -D node

# Étape évitée par docker init, qui monte les 2 fichiers directement dans
# les commandes comme bind mount, donc évite de les copier.
COPY ./package.json .
COPY ./pnpm-lock.yaml .

##########################################################
# Production dependencies
FROM base as deps

RUN pnpm install --prod --frozen-lockfile # Do NOT change the lockfile.

##########################################################
# Build the app -> dev dependencies
FROM deps as build

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

##########################################################
FROM base as final

ENV NODE_ENV production

# Downgrader privileges
USER node

# Pour pouvoir faire fonctionner les commandes
# Mais pas utile puisque obligé de le faire plus haut puisque
# pas mount les packages.json
# COPY package.json .

# Copy built files from build
# And copy prod dependencies from deps
COPY --from=deps --chown=node:node /usr/src/app/node_modules ./node_modules
COPY --from=build --chown=node:node /usr/src/app/dist ./dist

# Franchement, j'ai jamais compris la différence qu'il faisait lui.
# Ça fonctionne toujours même sans qu'il soit là...
EXPOSE 3000

CMD pnpm start
