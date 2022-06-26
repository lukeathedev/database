FROM postgres:latest
COPY ./tables.sql /docker-entrypoint-initdb.d/tables.sql
CMD ["docker-entrypoint.sh", "postgres"]