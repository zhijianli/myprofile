#!/usr/bin/env bash
# 释放 8000 端口后启动 Vite 生产预览（先 build 再 preview，非 dev）
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
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
      fuser -k "${PORT}/tcp" 2>/dev/null || true
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
npm run build
npx vite preview --port "${PORT}" --host
