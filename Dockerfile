FROM postgres:16.0-alpine

RUN usermod -u 1000 postgres
