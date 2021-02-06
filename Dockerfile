
# Install dependencies only when needed
FROM node:12.16.2 AS deps

WORKDIR /usr/src/app
COPY package.json yarn.lock ./
ENV YARN_CACHE_FOLDER=/dev/shm/yarn_cache
RUN yarn install --frozen-lockfile --production

# Rebuild the source code only when needed
# This is where because may be the case that you would try
# to build the app based on some `X_TAG` in my case (Git commit hash)
# but the code hasn't changed.
#
# Builder stage.
# In this state we compile our TypeScript to get the JavaScript code.
#
FROM node:12.16.2 AS builder

ENV NODE_ENV=production

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

COPY . .
COPY --from=deps /usr/src/app/node_modules ./node_modules

RUN yarn build

# RUN npm ci --quiet && npm run build


#
# Production stage.
# This state compile get back the JavaScript code from builder stage
# It will also install the production package only
#
FROM node:12.16.2-slim AS runner

WORKDIR /app
ENV NODE_ENV=production

# Copy only files needed to run our Next app.
# Note things are ONLY copied from 'builder' stage
# COPY --from=builder /usr/src/app/next.config.js ./
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/node_modules ./node_modules
# RUN yarn add next

CMD ["yarn", "start"]
# CMD ["node_modules/.bin/next", "start -p 4040"]


