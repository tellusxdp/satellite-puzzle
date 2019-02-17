
# 衛星パズル

>OS: Ubuntu 18.04  
>python: 3.6  
>node: 10.15  

## アプリ概要

衛星で撮影した画像を使って行うパズルゲームです。  
ゲームを通じて、衛星画像を身近な存在に！

## アプリ構成

| NAME | 役割 | 技術要素など |
|:--|:--|:--|
| satellite-puzzle-proxy| プロキシサーバー | nginx |
| satellite-puzzle-front|衛星パズル | Nuxt.js |
| satellite-puzzle-image-processing| 画像取得・分割 | Flask|

## 依存ライブラリ

`image_processing/Pipfile`を参照。

```
flask
pillow
requests
flask-api
```

今回は簡易的なAPIとしてflaskを使用。  
  
`pillow`は画像を分割する処理をするために使用。  

```  python
# SAR画像(.tif)をAPIから取得してきて、それを画像クロップして、pngに変換してストレージに保持している
_img = Image.open(BytesIO(_res.content))
_img.point(lambda i:i*(1./256)).convert('L').crop(_box).resize((op_size, op_size)).save(save_sar_png_img_path, 'PNG', quality=True)
```

## 画像分割APIについて

画像分割処理はflaskでapiになっている。  

``` bash
cd image_processing
make devrun
```

これで`http://localhost:5000`でapiが起動。  
  
pythonで光学画像を取得する部分は以下で処理をしている(SAR画像もhostが違うだけで取得方法は同様)。  

``` python
# _req_url='https://gisapi.opf-dev.jp/true/9/449/202.png'
_req_url = '%s/%s/%d/%d/%d.png' % (img_url, map_kinds[map_kind], z, x, y)
_res = requests.get(_req_url, stream=True)
_img = Image.open(BytesIO(_res.content))
```

### example

以下が今回使用している画像を取得するパラメータ。  
※ SAR画像がとても重いため、処理が終わるのに数分かかる場合があります。  

#### 琵琶湖

``` bash
curl http://localhost:5000\?z\=9\&x\=449\&y\=202\&kind\=true\&split_n\=3
curl http://localhost:5000\?z\=9\&x\=449\&y\=202\&kind\=true\&split_n\=4
curl http://localhost:5000\?z\=9\&x\=449\&y\=202\&kind\=true\&split_n\=5
```

#### 東京

``` bash
curl http://localhost:5000\?z\=10\&x\=909\&y\=403\&kind\=true\&split_n\=3
curl http://localhost:5000\?z\=10\&x\=909\&y\=403\&kind\=true\&split_n\=4
curl http://localhost:5000\?z\=10\&x\=909\&y\=403\&kind\=true\&split_n\=5
```

#### 佐渡ヶ島

``` bash
curl http://localhost:5000\?z\=8\&x\=226\&y\=98\&kind\=true\&split_n\=3
curl http://localhost:5000\?z\=8\&x\=226\&y\=98\&kind\=true\&split_n\=4
curl http://localhost:5000\?z\=8\&x\=226\&y\=98\&kind\=true\&split_n\=5
```

#### それぞれのパラメータについて

|||
|--|--|
|kind|画像種類|
|z|ズーム値(大きければ大きいほど、ズームになる)|
|x|地図のx軸の値|
|y|地図のy軸の値|
|split_n|分割数(パズルの分割数、3の場合は3×3の9つに分割される)|


## デプロイ用スクリプト

>Docker version 18.09  
>docker-compose version 1.23  

### docker install

まずはdockerをインストール  
以下のシェルを実行

``` bash
#!/bin/bash
sudo apt update
sudo apt install git
sudo apt-get install -y \
        apt-transport-https \
        ca-certificates \
        curl \
        software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo apt-key fingerprint 0EBFCD88
sudo add-apt-repository \
        "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
        $(lsb_release -cs) \
        stable"
sudo apt update
sudo apt-get install -y docker-ce
sudo gpasswd -a $(whoami) docker
sudo chgrp docker /var/run/docker.sock
sudo service docker restart
docker info

sudo curl -L "https://github.com/docker/compose/releases/download/1.23.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose -v
```

### local

以下を実行

``` bash
git clone https://github.com/tellusxdp/satellite-puzzle.git
cd satellite-puzzle/.deploy
sudo sh local.sh
```

### 本番

wildcard.app.tellusxdp.com.crt, wildcard.app.tellusxdp.com.keyを`/var`配下におく  
※ wildcard.app.tellusxdp.com.crtは中間証明書と合成しておくこと

その後$HOME配下に以下のシェルスクリプトを置きsudoで実行する

``` bash
#!/bin/bash
if [ -d /var/satellite-puzzle ] ; then
        rm -rf /var/satellite-puzzle
fi
cd /var && git clone https://github.com/tellusxdp/satellite-puzzle.git
cp wildcard.app.tellusxdp.com.crt satellite-puzzle/.docker
cp wildcard.app.tellusxdp.com.key satellite-puzzle/.docker
cp biwa.tif satellite-puzzle/.docker
cp tokyo.tif satellite-puzzle/.docker
cp sado.tif satellite-puzzle/.docker
cd /var/satellite-puzzle/.deploy && sh production.sh
```

SARが重すぎてマルチスレッドで対応できないため、予め画像分割をしておく  
containerに入る

``` bash
docker exec -it satellite-puzzle-image-processing sh
```

以下を順次実行  
※ 一気にやらないこと  

#### 琵琶湖

``` bash
curl http://localhost:5000\?z\=9\&x\=449\&y\=202\&kind\=true\&split_n\=3
curl http://localhost:5000\?z\=9\&x\=449\&y\=202\&kind\=true\&split_n\=4
curl http://localhost:5000\?z\=9\&x\=449\&y\=202\&kind\=true\&split_n\=5
```

#### 東京

``` bash
curl http://localhost:5000\?z\=10\&x\=909\&y\=403\&kind\=true\&split_n\=3
curl http://localhost:5000\?z\=10\&x\=909\&y\=403\&kind\=true\&split_n\=4
curl http://localhost:5000\?z\=10\&x\=909\&y\=403\&kind\=true\&split_n\=5
```

#### 佐渡ヶ島

``` bash
curl http://localhost:5000\?z\=8\&x\=226\&y\=98\&kind\=true\&split_n\=3
curl http://localhost:5000\?z\=8\&x\=226\&y\=98\&kind\=true\&split_n\=4
curl http://localhost:5000\?z\=8\&x\=226\&y\=98\&kind\=true\&split_n\=5
```

## サービスへのリンク

### 今すぐ遊ぶなら

[https://satellite-puzzle.app.tellusxdp.com/](https://satellite-puzzle.app.tellusxdp.com/)

### tellusとは？
[https://www.tellusxdp.com/](https://www.tellusxdp.com/)

