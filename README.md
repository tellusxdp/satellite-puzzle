# satellite-puzzle


## front
node version 10.15
npm 6.4
> Nuxt.js project
### directory
```
cd front
```

``` bash
# install dependencies
yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

## image processing
python >= 3.6.5  
pip 9.0.3
### directory
```
cd image_processing
```
### local run
```
make
```
### request example
画像種類: landsat8
x: 7248
y: 3226
z: 13
split_n: 3(画像の分割数)
```
curl http://localhost:5000\?z\=13\&x\=7248\&y\=3226\&kind\=landsat8\&split_n\=3
```

### docker request example
画像種類: landsat8
x: 7248
y: 3226
z: 13
split_n: 3(画像の分割数)
```
docker exec -it satellite-puzzle-front sh
curl http://localhost:5000\?z\=13\&x\=7248\&y\=3226\&kind\=landsat8\&split_n\=3
```

## deploy
### production
```
cd .deploy
sh production.sh
```

### staging
```
cd .deploy
sh staging.sh
```

### local
```
cd .deploy
sh local.sh
```
access to http://localhost:3000

