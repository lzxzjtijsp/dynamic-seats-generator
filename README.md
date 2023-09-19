# 完全動的座席表
pdfのテーブル配置図を背景画像としてそこに席の位置情報を重ねて表示するサンプルはいくつか存在するが、
このプロジェクトではテーブルの配置図の動的に作成した上で、席の位置情報を重ねて表示することを目的とする。

このプロジェクトを応用することで会場ごとに異なる座席表を生成することができる。

このプロジェクトではサンプルとして、結婚式会場での配席をイメージした座席表のテンプレートを生成する。

# デモ
https://github.com/lzxzjtijsp/dynamic-seats-generator/assets/50665131/89153d42-a9f8-4434-9b01-99a974067466



leaefletをインストールする
```shell
yarn add leaflet react-leaflet
```

typescriptの型定義をインストールする
```shell
yarn add -D @types/leaflet
```

leafletのeasybuttonをインストールする
```shell
yarn add -D leaflet-easybutton
```

og-imageをインストールする
```shell
yarn add @vercel/og
```
