# 使用 Node.js LTS 版本作為基礎映像
FROM --platform=linux/amd64 node:20-alpine AS builder

# 設定工作目錄
WORKDIR /app

RUN apk add --no-cache python3 make g++

# 複製 package.json 和 package-lock.json，然後安裝依賴
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile --force

# 複製所有原始碼
COPY . .

# 構建 Next.js 應用
RUN npm run build

# 設定正式運行的環境
FROM node:20-alpine AS runner

WORKDIR /app

# 設定 NODE_ENV
ENV NODE_ENV production

# 複製構建結果
COPY --from=builder /app ./

# 安裝 production 依賴
RUN npm install --omit=dev --force

# 使用環境變數來設定 port（GCP 需要使用 8080）
ENV PORT 8080

# 指定要暴露的端口
EXPOSE 8080

# 啟動應用
CMD ["npm", "run", "start"]
