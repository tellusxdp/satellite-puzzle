FROM python:3.6.5
WORKDIR /app
COPY Pipfile Pipfile.lock Makefile /app/
RUN make setup
ADD ./ /app/
ENTRYPOINT ["make", "prdrun"]

