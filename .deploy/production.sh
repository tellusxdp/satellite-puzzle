#!/bin/bash
export NODE_ENV=production
export PORT=80
cd ../.docker
docker-compose build
docker-compose up -d

