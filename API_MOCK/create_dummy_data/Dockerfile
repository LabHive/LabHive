# Does not work yet!

FROM rocker/tidyverse

RUN apt update && apt-get install -y libssl-dev libcurl4-openssl-dev libxml2-dev

RUN install2.r tidyverse openxlsx httr googlesheets4 jsonlite

COPY . /app

WORKDIR /app
