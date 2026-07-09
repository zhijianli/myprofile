# myprofile

这是一个基于 Vite、React 和 TypeScript 的前端项目。

## 启动方式

首次运行前先安装依赖：

```bash
npm install
```

开发环境启动：

```bash
npm run dev
```

默认访问地址：

```text
http://localhost:8000
```

## 生产构建和预览

构建生产包：

```bash
npm run build
```

本地预览生产构建：

```bash
npm run preview
```

预览服务同样使用 `8000` 端口。

## 一键生产预览脚本

项目提供了 `start-prod.sh`，会释放 `8000` 端口、安装缺失依赖、执行构建，并在后台启动生产预览：

```bash
./start-prod.sh
```

在 Windows 上运行该脚本需要使用 Git Bash、WSL 或其他 bash 环境。
