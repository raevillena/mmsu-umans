# Dockerfile for React client
FROM nginx:stable-alpine3.21 AS prod

#set main dir path
WORKDIR /usr/share/nginx/html

# Clean out default static content
RUN rm -rf ./*

#copy build file from repository
COPY /dist .

# Copy custom NGINX config
COPY nginx.conf /etc/nginx/conf.d/default.conf

#expose port
EXPOSE 80

##run nginx
ENTRYPOINT ["nginx", "-g", "daemon off;"]