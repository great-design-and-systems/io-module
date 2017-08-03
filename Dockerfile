FROM node:latest

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN npm install pm2 -g
# Install app dependencies
COPY package.json /usr/src/app/
RUN yarn install
# Bundle app source
COPY . /usr/src/app
ENV PORT 3000
ENV NODE_ENV production
EXPOSE 3000
CMD ["pm2-docker", "dist/index.js" ]