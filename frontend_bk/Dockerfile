# 使用するNode.jsのバージョンを指定
FROM node:18

# 作業ディレクトリを設定
WORKDIR /usr/src/app

# パッケージファイルをコピーして依存関係をインストール
COPY package*.json ./
RUN npm install

# ソースコードをコピー
COPY . .

# サーバーをポート3000で実行
EXPOSE 3000
CMD ["npm", "run", "dev"]
