FROM node:13.5
# setting the working directory of the container
WORKDIR /usr/src/app
# copy everything in our current directory into the container's app directory
COPY . /usr/src/app
# run npm install and npm install before we run our app in the container
RUN npm install
RUN npm run build
# expose container's port 3000
EXPOSE 3001
# Entrypoint will take in an array for container to run as an executable 
ENTRYPOINT ["node","./server/server.js"]
# you can also use the CMD keyword, for instance:
# CMD npm start, will run the npm start command to run the application
# there are some differneces between the ENTRYPOINT and CMDs