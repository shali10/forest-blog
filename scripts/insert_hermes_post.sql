
INSERT INTO posts (slug, title, content, excerpt, category_id, category_name, tags, status, pinned, views, created_at, updated_at)
VALUES (
    'hermes-agent-deploy-guide',
    'Hermes Agent 部署全书 — 从裸机到多平台接入',
    '# Hermes Agent 部署全书 — 从裸机到多平台接入

> 🎯 **目标**：从零构建由 Nous Research 开源的现代化多平台 AI Agent 框架 —— **Hermes Agent**。打通 20+ LLM Provider、直连 Telegram / QQ / 微信多平台网关，建立跨会话持久记忆、技能自主进化系统（Skills）与自动化定时任务（Cron），打造全天候自主执行的工程智能体。

---

## 📌 架构原理与核心能力

Hermes Agent 是专为实际工程、运维与开发任务设计的执行型智能体框架，具备以下核心架构特性：

| 能力模块 | 架构实现与技术特性 | 生产价值 |
| :--- | :--- | :--- |
| **多 Provider 适配** | 统一 OpenAI-compatible 规范，支持 OpenRouter、Anthropic、DeepSeek、Gemini 等 20+ 模型后端 | 智能路由与多层 Fallback 故障转移 |
| **统一消息 Gateway** | 单进程通过 WebSocket / 长轮询并发承载 Telegram、QQ、微信、Discord、Slack 等平台 | 随时随地多端协同交互 |
| **分层持久记忆** | 核心偏好注入 + 参考笔记（Notes）+ 会话全文检索（FTS5 SQLite） | 跨会话记住用户习惯与机器资产 |
| **自愈技能库 (Skills)** | 任务解决后自动沉淀标准化 `SKILL.md` 操作手册 | 经验沉淀，越用越聪明 |
| **自驱定时任务 (Cron)** | 原生集成 cron 调度器，支持 LLM 自主生成简报与脚本静默巡检 | 7x24 小时全自动巡检与推送 |
| **全能工具集 (Tools)** | 原生集成 Linux 终端、文件检索、CDP 浏览器自动化与 MCP 协议 | 具备真执行与真验证能力 |

---

## 💻 实操部署与配置

### 1. 基础环境准备与一键安装

Hermes Agent 官方提供全自动化安装脚本，会自动安装 Python 运行环境、Node.js、ripgrep、ffmpeg 及 Chromium 浏览器依赖：

```bash
# 1. 运行官方一键安装脚本
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash

# 2. 验证全局命令与环境
hermes --version
hermes doctor
```

> 💡 **提示**：安装完成后，Hermes 的核心运行环境位于 `/usr/local/lib/hermes-agent`，用户配置与数据持久化目录位于 `~/.hermes/`。

---

### 2. 常用目录与核心文件速查

📁 `~/.hermes/` 核心目录清单：

| 文件 / 目录路径 | 作用与权限说明 |
| :--- | :--- |
| `~/.hermes/config.yaml` | 主配置文件（包含模型路由、平台网关、记忆限额等） |
| `~/.hermes/.env` | 敏感环境变量（API Keys、Bot Tokens、密钥凭据，建议 `chmod 600`） |
| `~/.hermes/state.db` | SQLite 主数据库（会话历史、FTS5 全文搜索库） |
| `~/.hermes/memories/` | 长期记忆存储库（`MEMORY.md` 环境事实 + `USER.md` 用户偏好） |
| `~/.hermes/skills/` | 本地与官方已安装的 Skills 技能库 |
| `~/.hermes/cron/` | 定时任务配置文件 (`jobs.json`) 及运行产物 |
| `~/.hermes/logs/` | Agent 运行日志与 Gateway 状态日志 |

---

### 3. Provider 模型配置与密钥管理

#### ⚠️ 避坑铁律：配置存储位置
不同 Provider 的 API Key 存储入口具有严格规范，配置错误会导致授权失败：
- **标准 Provider（OpenRouter / Anthropic / DeepSeek / Gemini 等）**：Key 必须写入 `~/.hermes/.env`。
- **自定义 Provider（自建中转 / OneAPI / NewAPI / CPA 等）**：必须写入 `~/.hermes/config.yaml` 顶层 `providers.<name>` 下。

#### (1) 配置标准 Provider（以 OpenRouter / DeepSeek 为例）
```bash
# 写入环境变量
echo ''OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxx'' >> ~/.hermes/.env
echo ''DEEPSEEK_API_KEY=sk-xxxxxxxxxxxx'' >> ~/.hermes/.env

# 设置默认主模型
hermes config set model.provider openrouter
hermes config set model.default "anthropic/claude-3.7-sonnet"
```

#### (2) 配置自定义中转与多级 Fallback 容灾链
📁 `~/.hermes/config.yaml`
```yaml
model:
  provider: custom_proxy
  default: "gemini-3.7-flash-high"

# 顶层容灾降级链：主模型超时或报错时依次平滑切换
fallback_providers:
  - provider: openrouter
    model: "anthropic/claude-3.7-sonnet"
  - provider: deepseek
    model: "deepseek-chat"

# 自定义 API Provider 节点
providers:
  custom_proxy:
    base_url: "https://api.your-domain.com/v1"
    api_key: "sk-your-custom-proxy-key"
    model: "gemini-3.7-flash-high"
```

---

### 4. 多平台网关接入（Gateway）

#### (1) Telegram 接入
1. 在 Telegram 联系 `@BotFather` 创建新 Bot，获取 `BOT_TOKEN`。
2. 配置凭据与访问白名单：
```bash
# 1. 写入 Bot Token
echo ''TELEGRAM_BOT_TOKEN=123456789:ABCdefGhIJKlmNoPQRs'' >> ~/.hermes/.env

# 2. 设置白名单 User/Chat ID (必须为 JSON List 格式)
hermes config set telegram.allowed_chats ''[1658239957]''

# 3. 启动并注册网关服务
hermes gateway setup
```

#### (2) QQ 开放平台 Bot 接入
📁 `~/.hermes/config.yaml`
```yaml
platforms:
  qqbot:
    enabled: true
    extra:
      app_id: "102030405"
      client_secret: "your_qq_bot_secret_here"
```

> ⚠️ **避坑说明**：QQ Bot 的 AppSecret 必须完整配置；若使用 Systemd 托管守护进程，运行中网关需通过 `systemctl restart hermes-gateway` 进行热重载。

---

### 5. 自愈技能沉淀（Skills System）

当 Hermes 完成一项复杂的工程任务后，可将验证通过的 SOP 固化为技能：

```markdown
---
name: docker-nginx-deploy
description: 标准化 Nginx 反代与 SSL 证书部署流程
triggers:
  - "部署 Nginx"
  - "配置反向代理"
  - "nginx deploy"
---

# 部署实操步骤
1. 创建 Docker Compose 配置
2. 申请 Let''s Encrypt 证书
3. 验证 upstream 连通性并热重载
```

---

### 6. 定时任务调度（Cron Engine）

内置轻量调度器，支持多种定时表达式：

```bash
# 1. 每天上午 09:00 执行服务器资产巡检并推送到 Telegram
hermes cron create "0 9 * * *" "全面巡检所有服务器节点连通性与磁盘水位并汇报"

# 2. 每 30 分钟无 LLM 消耗静默监控（Watchdog 模式）
hermes cron create "30m" "检查 gateway 进程与端口健康" --no-agent
```

---

## 🔍 验证与故障排查

### 1. 全链路健康检查
```bash
# 一键全面自检（网络、模型、数据库、工具链）
hermes doctor

# 检查当前会话与数据库健康状态
hermes status
```

### 2. 网关连通性与服务状态核验

| 检查项 | 验证命令 | 期望正常输出 |
| :--- | :--- | :--- |
| **Gateway 守护进程** | `systemctl status hermes-gateway` | `Active: active (running)` |
| **Telegram 连接** | `journalctl --user -u hermes-gateway -n 20` | `Telegram bot listening for updates` |
| **QQ WebSocket** | `ss -tnp | grep -E "43\.(128|154)"` | `ESTAB` 正常长连接状态 |
| **主库完整性** | `sqlite3 "file:~/.hermes/state.db?mode=ro" "PRAGMA quick_check;"` | `ok` |

---

> 📌 **总结**：通过合理的 Provider 路由设计、双向持久化记忆与自动化网关守护，Hermes Agent 能够稳定运行在轻量云主机上，成为开发与运维场景下不可或缺的得力副驾驶。
',
    'Nous Research 开源多平台 AI Agent 框架实战：支持 20+ LLM Provider、10+ 消息平台网关、持久记忆、技能自演进与 MCP 扩展。本文涵盖裸机安装、Provider 配置铁律、Telegram/QQ/微信平台接入、Cron 定时任务与全链路故障排查。',
    1,
    '技术札记',
    'Hermes,AI,Agent,Telegram,QQBot,运维',
    'published',
    1,
    28,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
)
ON CONFLICT(slug) DO UPDATE SET
    title = excluded.title,
    content = excluded.content,
    excerpt = excluded.excerpt,
    category_id = excluded.category_id,
    category_name = excluded.category_name,
    tags = excluded.tags,
    status = excluded.status,
    pinned = excluded.pinned,
    updated_at = CURRENT_TIMESTAMP;
