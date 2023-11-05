# image de départ
FROM alpine:3.15

# chemin de travail
# Il aurait été intéressant d'installer dans le dossier /home/node, qu'on va créer littéralement 3 commandes plus bas...
# Mais on trouve ce chemin dans beaucoup d'exemples donc bon.
WORKDIR /usr/src/app

# installation des paquets système
# apk = Alipne Package Keeper
RUN apk update && apk add nodejs npm
RUN npm install -g pnpm

# ajout utilisateur node et groupe node
# RUN addgroup -g 1000 node && adduser -u 1000 -G node -s /bin/sh -D node
RUN addgroup node && adduser -G node -s /bin/sh -D node

# downgrade des privilèges
# On le fait plus bas, sinon on ne peut pas installer les paquets avec pnpm, puiqu'il les installe en global. Bref. pnpm, c'est bien quand on dév sur sa propre machine, mais effectivement, mieux vaut utiliser npm si ça permet de diminuer les droits plus rapidement (les fichiers npm sont dans le WORKDIR quand les fichiers pnpm sont dans lib)
# USER node

# copie des fichiers du dépôt
COPY --chown=node:node . .

# installation des dépendances avec npm
# Ne peuvent pas être utilisés parce que tsc est un package de dev -> ce sera pour le multistage
# ARG NODE_ENV=production
# RUN pnpm install --prod
RUN pnpm install

# build avec npm
RUN pnpm build

USER node

# exécution
CMD pnpm start
