
# HR-Platform

## Quick Start

### Backend Deployment

后端依赖 PostgreSQL 数据库，在 `backend/config/config.toml` 文件中配置环境变量，使用 cmd 工具生成 jwt key，然后编译运行。

```shell
cd backend
go run ./cmd/generate_jwt_secret/main.go
go build employee-management-system
go run employee-management-system
```

服务运行在 `8080` 端口，首次启动会进行数据库迁移，同时初始化超级管理员账户。

