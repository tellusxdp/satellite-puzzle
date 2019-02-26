#!/bin/bash
export NODE_ENV=production
cd ../.docker
docker-compose -f docker-compose-ssl.yml down

