# ===== Stage 1: Build VuePress =====
FROM node:22-alpine AS builder

WORKDIR /app

# 复制根依赖定义文件（用于缓存）
COPY pnpm-lock.yaml package.json pnpm-workspace.yaml ./
COPY packages/docs/package.json packages/docs/

# 安装 pnpm 并装依赖（注意 workspace-root）
RUN corepack enable && corepack prepare pnpm@9.15.2 --activate \
 && pnpm fetch \
 && pnpm install --no-frozen-lockfile

COPY . .

RUN pnpm --filter docs build

# ===== Stage 2: Nginx server =====
FROM nginx:alpine

# 拷贝构建好的静态文件到 nginx html 目录
COPY --from=builder /app/packages/docs/docs/.vuepress/dist /usr/share/nginx/html

# 拷贝自定义 nginx 配置（可选）
COPY --from=builder /app/packages/docs/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8889
CMD ["nginx", "-g", "daemon off;"]
