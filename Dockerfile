#build local dev
FROM node:14
RUN git clone https://github.com/mark182182/cashcalc-frontend
WORKDIR ./cashcalc-frontend
RUN echo "REACT_APP_BASE_URL=http://localhost:8080/" > .env
RUN npm install
EXPOSE 3000
CMD ["npm","start"]
