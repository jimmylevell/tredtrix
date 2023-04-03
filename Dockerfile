###############################################################################################
# tredtrix - BASE
###############################################################################################
FROM nginx:1.23.4 as tredtrix-base

WORKDIR /usr/share/nginx/html

# update the image
RUN apt-get -o Acquire::Check-Valid-Until=false -o Acquire::Check-Date=false update
RUN apt-get upgrade -y
RUN apt-get install vim -y
RUN apt-get install net-tools -y
RUN apt-get install dos2unix -y

###############################################################################################
# tredtrix - DEPLOY
###############################################################################################
FROM tredtrix-base as tredtrix-deploy

COPY . .

# publish app
EXPOSE 80
