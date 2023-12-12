# builder stage named "deps"
FROM docker.io/node:lts-alpine as deps
WORKDIR /app

COPY dist/apps/server/space/package*.json ./

# install extracted deps
RUN npm install

# runner stage
FROM docker.io/node:lts-alpine as runner
WORKDIR /app

# pull in packages from builder stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json

# copy local, compiled app
COPY dist/apps/server/space .
RUN chown -R node:node .
USER node

CMD ["node", "main.js"]