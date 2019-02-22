# 衛星パズル

想定環境

> ホストにDocker/DockerComposeが導入されていること  
> Python 3.6 (コンテナ内)  
> node 10.15 (コンテナ内)  


## 目次
* [概要](#概要)
* [アプリ構成](#アプリ構成)
* [デプロイ準備例 (Ubntu 18.04)](#デプロイ準備例ubuntu1804)
* [起動](#起動)
* [リンク](#リンク)
* [画像分割と取得](#画像分割と取得)


## 概要
[Tellus](https://www.tellusxdp.com) を利用したサンプルプロジェクトです。

衛星で撮影した画像を使って行うパズルゲームです。
ゲームを通じて、衛星画像を身近な存在に！

**Tellus Platformでの動作を想定しているため、それ以外の環境ではTellusAPIの利用に失敗する場合があります。また、[データポリシー](https://www.tellusxdp.com/ja/dev/data) にご注意ください。**


## アプリ構成

| NAME | 役割 | 技術要素など |
|:--|:--|:--|
| satellite-puzzle-proxy| プロキシサーバー | nginx |
| satellite-puzzle-front|衛星パズル | Nuxt.js |
| satellite-puzzle-image-processing| 画像取得・分割 | Flask|


### コンテナ内依存ライブラリ
詳細は[image_processing/Pipfile](https://github.com/tellusxdp/satellite-puzzle/blob/master/image_processing/Pipfile)を参照してください。

```
flask # 簡易的なAPI作成
pillow # 画像分割
requests
flask-api
```


## デプロイ準備例 (Ubuntu 18.04)
DockerとDockerComposeをインストールします。

```bash
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

## 起動
```bash
git clone https://github.com/tellusxdp/satellite-puzzle.git
cd satellite-puzzle/.deploy
sudo sh local.sh
```

### 画像準備
画像取得のコンテナに入ります。

```bash
docker exec -it satellite-puzzle-image-processing sh
```

以下を実行してパズル用の画像準備を行います。

```bash
curl http://localhost:5000\?z\=9\&x\=449\&y\=202\&kind\=true\&split_n\=3
curl http://localhost:5000\?z\=9\&x\=449\&y\=202\&kind\=true\&split_n\=4
curl http://localhost:5000\?z\=9\&x\=449\&y\=202\&kind\=true\&split_n\=5
curl http://localhost:5000\?z\=10\&x\=909\&y\=403\&kind\=true\&split_n\=3
curl http://localhost:5000\?z\=10\&x\=909\&y\=403\&kind\=true\&split_n\=4
curl http://localhost:5000\?z\=10\&x\=909\&y\=403\&kind\=true\&split_n\=5
curl http://localhost:5000\?z\=8\&x\=226\&y\=98\&kind\=true\&split_n\=3
curl http://localhost:5000\?z\=8\&x\=226\&y\=98\&kind\=true\&split_n\=4
curl http://localhost:5000\?z\=8\&x\=226\&y\=98\&kind\=true\&split_n\=5
```


## リンク
* [Tellus](https://www.tellusxdp.com/)
* [今すぐこのアプリで遊ぶにはこちら](https://satellite-puzzle.app.tellusxdp.com)


-----


## 画像取得と分割
スライドパズルを実現するため、Tellusから衛星画像を取得し、パズルで利用できるように分割を行います。この処理はflaskでAPI化しています。

```bash
cd image_processing
make devrun
```

`http://localhost:5000`で画像分割APIが起動します。

### （抜粋）光学画像の取得と保存
``` python
_req_url = '%s/%s/%d/%d/%d.png' % (img_url, map_kinds[map_kind], z, x, y)
_res = requests.get(_req_url, stream=True)
_img = Image.open(BytesIO(_res.content))
```

### （抜粋）SAR画像のハンドリング
SAR画像はGeoTIFF形式 (`.tif`) のため、クロップ・png変換してストレージに保持しています。

```  python
_img = Image.open(BytesIO(_res.content))
_img.point(lambda i:i*(1./256)).convert('L').crop(_box).resize((op_size, op_size)).save(save_sar_png_img_path, 'PNG', quality=True)
```

### API Example
以下が今回使用している画像をパズル用に取得するパラメータです。それぞれ光学画像とSAR画像をセットで準備します。

※ SAR画像のサイズが大きいため、処理に数分かかる場合があります。

#### 琵琶湖
```bash
curl http://localhost:5000\?z\=9\&x\=449\&y\=202\&kind\=true\&split_n\=3
```

#### 東京
```bash
curl http://localhost:5000\?z\=10\&x\=909\&y\=403\&kind\=true\&split_n\=4
```

#### 佐渡ヶ島
```bash
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

[詳細やそれぞれの値を決める方法についてはこちら](https://maps.gsi.go.jp/development/siyou.html)
