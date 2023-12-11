# builder stage named "deps"
FROM docker.io/node:lts-alpine as deps

COPY dist/apps/server/space/package*.json ./

# install extracted deps
RUN npm install --only=production

# runner stage
FROM docker.io/node:lts-alpine as runner

# pull in packages from builder stage
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=deps /usr/src/app/package.json ./package.json

# copy local, compiled app
COPY dist/apps/server/space .
RUN chown -R node:node .
USER node

CMD ["node", "main.js"]