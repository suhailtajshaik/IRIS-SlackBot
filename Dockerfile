FROM node:6.11.0-alpine
MAINTAINER Suhail Taj<suhailtajshaik@gmail.com>

# Copy dist or your code folder to /opt/suhail folder in the container.
COPY . /opt/suhail

# Switch to /opt/suhail as your working directory
WORKDIR /opt/suhail

# add a user named suhail and give read permissions to that user for /opt/suhail folder and it's content.

# Use below format to setup environment variables.
# ENV NODE_ENV=production PORT=9000

# install packages, add suhail user and group,
# Setup read permissions to suhail user for /opt/suhail folder.
RUN adduser -S suhail && \
    addgroup -S suhail && \
    chown -R suhail:suhail /opt/suhail

# install production npm packages.
RUN npm install --production

# Set the suhail as the user to execute
USER suhail

# Expose port 3000 for accessing website from outside the container.
EXPOSE 3000

# Start your application when the container starts.
CMD ["node", "bin/run.js"]