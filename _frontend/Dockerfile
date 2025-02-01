# ベースイメージとして Node.js の Alpine バージョンを使用
FROM node:18

# 作業ディレクトリを設定
WORKDIR /app

# package.json と package-lock.json をコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# アプリのソースコードをコピー
COPY . .

# # アプリをビルド
# RUN npm run build

# 開発用サーバーでビルドを提供
CMD ["npm", "run", "dev"]