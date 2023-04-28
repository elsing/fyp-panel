FROM node:18-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy source & Install dependencies
COPY ./ /usr/src/app/
RUN npm install

# Building app
RUN npm run build

# Running the app
CMD "npm" "run" "start"