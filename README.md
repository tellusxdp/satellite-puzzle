# 衛星パズル

<p align="center">
  <a href="https://satellite-puzzle.app.tellusxdp.com">
    <img src="https://user-images.githubusercontent.com/39848573/52912781-9cc65580-32f9-11e9-892b-83c71efce7ef.png" width="280">
  </a>
</p>

想定環境

> ホストにDocker/DockerComposeが導入されていること


## 概要
[Tellus](https://www.tellusxdp.com) を利用したサンプルプロジェクトです。

Tellusで提供されている2種類の衛星画像を使って行うスライドパズルゲームです。
ゲームを通じて、衛星画像を身近な存在に！

**Tellus Platformでの動作を想定しているため、それ以外の環境ではTellusAPIの利用に失敗する場合があります**

[今すぐこのアプリで遊ぶにはこちら](https://satellite-puzzle.app.tellusxdp.com)

[開発者ドキュメントはこちら](https://tellusxdp.github.io/satellite-puzzle/)

[Tellusとは？](https://www.tellusxdp.com)


## 依存先 (ホスト)
* Docker
* DockerCompose


## フロントエンド (`front/`)
パズルアプリのUIを提供するサーバ。Nuxt.jsを採用したPWAです。

### 依存先 (コンテナ内)
* node 10.15+
* npm 6.4+


## 画像処理 (`image_processing/`)
Tellusから衛星画像を取得し、パズルで利用できるように前処理を行うサーバ。

### 依存先 (コンテナ内)
* python 3.6.5+
* pip 9.0.3


## 起動
``` bash
cd .deploy
./local-up.sh
```

## アプリ確認
[http://localhost:3000](http://localhost:3000)

or

[http://localhost:8080](http://localhost:8080) (Nginx経由)


## Collaborators
* 株式会社プラハ
  * [@motionweekender](https://www.instagram.com/motionweekender/)
  * [@revenue-hack](https://github.com/revenue-hack)


-----


<p align="center">
  <a href="https://www.tellusxdp.com">
    <img src="https://user-images.githubusercontent.com/3175456/53102763-b53fa580-356f-11e9-94d5-a934d220c6fa.png">
  </a>
</p>

