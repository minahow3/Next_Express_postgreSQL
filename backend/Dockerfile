# backend/Dockerfile
# ベースイメージとして Node.js を使用
FROM node:18

# 作業ディレクトリを設定
WORKDIR /app

# package.json をコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションコードをコピー
COPY . .

# アプリを起動
CMD ["node", "index.js"]