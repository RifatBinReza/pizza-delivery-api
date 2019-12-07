FROM node:10
RUN mkdir /pizza-delivery-api
ADD . /pizza-delivery-api
WORKDIR /pizza-delivery-api
RUN npm i
EXPOSE 3000
CMD ["npm", "start"]