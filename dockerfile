FROM postgres:latest
RUN mkdir /default
COPY ./default/* /default/
COPY ./*.sql /docker-entrypoint-initdb.d/
CMD ["docker-entrypoint.sh", "postgres"]