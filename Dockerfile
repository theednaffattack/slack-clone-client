FROM node:12.16.2

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json ./
COPY ./yarn.lock ./
COPY ./.env ./
RUN yarn install --frozen-lockfile --production

# Copying source files
COPY . .

# Building app
RUN yarn build

# EXPOSE 4040

# Running the app
CMD [ "yarn", "start" ]
