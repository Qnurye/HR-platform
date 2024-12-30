
# HR-Platform

本项目为本人数据库原理课程设计，技术栈如下：
- frontend: Next.js, TailwindCSS, shadcn/ui
- backend: Gin, GORM
- database: PostgreSQL

## Quick Start

### Backend Deployment

后端依赖 PostgreSQL 数据库，在 `backend/config/config.toml` 文件中配置环境变量，使用 cmd 工具生成 jwt key，然后编译运行。

```shell
cd backend
go mod tidy
go run ./cmd/generate_jwt_secret/main.go
go build employee-management-system
go run employee-management-system
```

服务运行在 `8080` 端口，首次启动会进行数据库迁移，同时初始化超级管理员账户。

如果想要 seed 一些数据，我还提供了一个 cmd 小工具：

```
go run ./cmd/seed/main.go
```

### Frontend Deployment

前端使用 Next.js 开发。

```shell
npm install
npm run build
npm run start
```

