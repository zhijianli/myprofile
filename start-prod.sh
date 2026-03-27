#!/usr/bin/env bash
# 释放 8000 端口后启动 Vite 生产预览（先 build 再 preview，非 dev）
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT"

PORT="${PORT:-8000}"

kill_port() {
  if [[ "${OSTYPE:-}" == msys* || "${OSTYPE:-}" == cygwin* || "${OSTYPE:-}" == mingw* ]]; then
    powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "
      \$conns = Get-NetTCPConnection -LocalPort $PORT -ErrorAction SilentlyContinue
      if (\$conns) {
        \$conns | ForEach-Object {
          Stop-Process -Id \$_.OwningProcess -Force -ErrorAction SilentlyContinue
        }
      }
    " 2>/dev/null || true
  else
    if command -v fuser >/dev/null 2>&1; then
      fuser -k "${PORT}/tcp" >/dev/null 2>&1 || true
    fi
    if command -v lsof >/dev/null 2>&1; then
      pids="$(lsof -ti:"${PORT}" 2>/dev/null || true)"
      if [[ -n "${pids}" ]]; then
        kill -9 ${pids} 2>/dev/null || true
      fi
    fi
  fi
}

echo "正在释放端口 ${PORT} …"
kill_port
sleep 1

echo "构建并启动生产预览（端口 ${PORT}）…"
if [[ ! -x node_modules/.bin/tsc ]] || [[ ! -x node_modules/.bin/vite ]]; then
  echo "未检测到本地 tsc/vite，正在执行 npm install（需安装 devDependencies）…"
  npm install --include=dev --no-fund --no-audit
fi
npm run build

LOG_FILE="${ROOT}/output.log"
echo "正在后台启动预览（端口 ${PORT}），日志写入 ${LOG_FILE} …"
nohup npx vite preview --port "${PORT}" --host >"${LOG_FILE}" 2>&1 &
echo "预览进程 PID: $!（查看日志: tail -f ${LOG_FILE}）"
