#!/bin/bash
export NODE_ENV=staging
export PORT=80
cd ../.docker
docker-compose up -d

