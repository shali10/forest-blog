
INSERT INTO posts (slug, title, content, excerpt, category_id, category_name, tags, status, pinned, views, created_at, updated_at)
VALUES (
    'hermes-agent-deploy-guide',
    'Hermes Agent 部署全书 — 从裸机到多平台接入',
    '# Hermes Agent 部署全书 — 从裸机到多平台接入

> 🎯 **目标**：从零开始，把一台普通的 Linux VPS 变成 24 小时随叫随到的专属 AI 工程助理。打通 Claude、Gemini、DeepSeek 等大模型后端，接入 Telegram 与 QQ 等即时通讯平台，让 AI 能在聊天框里替你写代码、查服务器、跑定时任务，并拥有跨会话的持久记忆与技能自愈能力。

---

## 📌 别被概念唬住：Hermes 到底是个什么？

很多人第一次接触 **AI Agent（智能体）** 时，总觉得这是个高大上又虚无缥缈的词，以为只是在网页上跟 ChatGPT 聊天。

其实说穿了，传统的聊天 AI 就像一个**只动嘴不动的顾问**——你问它“这台服务器为什么磁盘满了”，它只能列出一堆建议让你自己去敲命令；而 **Hermes Agent** 就像一个**坐在你服务器终端前、长了手脚的实习工程师**：

- 🧠 **大脑 (Provider)**：连接 Claude 3.7、Gemini 2.5、DeepSeek V3 等大模型进行深度思考与决策。
- 🛠️ **手脚 (Tools)**：原生拥有 Linux 终端执行、文件读写、网页爬取、无头浏览器操作能力。你让它排查磁盘，它会自己敲 `df -h` 和 `du`，找到大文件后再向你汇报。
- 🧠 **长期记忆 (Memory)**：能记住你的习惯、服务器资产和踩过的坑。今天教过它的事情，下个月它依然记得，不会“一开新对话就失忆”。
- 📱 **随身对讲机 (Gateway)**：你可以躺在床上用手机打开 Telegram、QQ 甚至微信，直接给它发指令，它在远端服务器上执行完毕后把结果整整齐齐发回给你。
- 📜 **经验本 (Skills)**：解决过一次的疑难杂症，它会自动提炼成标准 SOP 存入技能库，越用越顺手。

接下来，我们就一步一步把这套系统完整搭建起来。

---

## 💻 第一步：准备与一键安装

### 1. 环境要求
- 一台能连外网的 Linux VPS（推荐 Debian 12 / Ubuntu 22.04+）
- 最低配置：1 核 CPU / 1GB 内存 / 10GB 硬盘（轻量云完全够用）
- 具备 root 或 sudo 权限

### 2. 一键安装命令
直接在终端执行官方安装脚本，它会自动下载打包好的 Python 运行环境、Node.js、ripgrep 搜索工具、ffmpeg 多媒体库与无头 Chromium 浏览器：

```bash
# 执行官方安装脚本
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

安装完成后，系统全局会多出一个 `hermes` 命令。核心程序会被装在 `/usr/local/lib/hermes-agent`，而所有属于你的个人配置、记忆库、日志和会话数据库都会统一存放在 `~/.hermes/` 目录下。

```bash
# 验证安装是否成功
hermes --version
```

---

## 💻 第二步：配置大模型大脑 (Provider)

AI Agent 要干活，首先得给它配一个聪明且稳定的“大脑”。Hermes 支持 20 多种主流大模型接入方式。

> ⚠️ **新手必看铁律：凭据存放在哪？**
> Hermes 对安全有严格要求：
> 1. **官方标准渠道（OpenRouter / Anthropic / DeepSeek 等）**：API Key 必须写在 `~/.hermes/.env` 文件里。
> 2. **自建中转 API / 聚合 API 平台（OneAPI / NewAPI / CPA 等）**：必须写在 `~/.hermes/config.yaml` 文件的顶层 `providers:` 下。

### 方案 A：使用 OpenRouter（最推荐新手，一处搞定全模型）
如果你不想在各个模型官网分别充值，推荐直接使用 [OpenRouter](https://openrouter.ai/)，一个 key 畅玩 Claude、Gemini、GPT-4o：

```bash
# 1. 把你的 OpenRouter Key 写入环境变量
echo ''OPENROUTER_API_KEY=sk-or-v1-你的密钥'' >> ~/.hermes/.env

# 2. 设置主模型为 Claude 3.7 Sonnet
hermes config set model.provider openrouter
hermes config set model.default "anthropic/claude-3.7-sonnet"
```

### 方案 B：使用 DeepSeek（超高性价比）
```bash
# 1. 写入 DeepSeek Key
echo ''DEEPSEEK_API_KEY=sk-你的DeepSeek密钥'' >> ~/.hermes/.env

# 2. 设置为主模型
hermes config set model.provider deepseek
hermes config set model.default "deepseek-chat"
```

### 方案 C：使用自定义中转 API 与多级容灾（进阶）
在实际生产中，单一模型 API 可能会偶尔报 429 限流或 500 故障。配置多级 **Fallback（故障容灾链）** 后，当主模型异常时，Hermes 会自动秒切备用模型，绝不卡死。

📁 `~/.hermes/config.yaml` 配置文件示例：
```yaml
# 主模型配置
model:
  provider: my_proxy
  default: "gemini-3.7-flash-high"

# 顶层容灾链：主模型挂了依次往下切
fallback_providers:
  - provider: openrouter
    model: "anthropic/claude-3.7-sonnet"
  - provider: deepseek
    model: "deepseek-chat"

# 自定义 API Provider 节点
providers:
  my_proxy:
    base_url: "https://api.your-proxy-domain.com/v1"
    api_key: "sk-your-proxy-key"
    model: "gemini-3.7-flash-high"
```

---

## 💻 第三步：装上随身对讲机（接入 Telegram & QQ）

把 Agent 跑在服务器后台，我们通过日常使用的聊天工具与它对话。

### 1. 接入 Telegram（最推荐，体验最丝滑）

#### 第 1 步：创建 Bot
1. 在 Telegram 里搜索 `@BotFather`，发送 `/newbot`。
2. 按提示输入你的机器人名字和用户名，最后会拿到一串形如 `7123456789:ABCdefGhIJK...` 的 **Token**。

#### 第 2 步：配置并设置白名单
为了防止别人盗用你的 Bot 消耗你的 Token 或操控你的服务器，必须配置白名单用户 ID：

```bash
# 1. 写入 Telegram Token
echo ''TELEGRAM_BOT_TOKEN=7123456789:ABCdefGhIJK...'' >> ~/.hermes/.env

# 2. 设置白名单 Chat ID（支持填你自己或群组的纯数字 ID）
hermes config set telegram.allowed_chats ''[1658239957]''

# 3. 运行网关配置引导
hermes gateway setup
```

> 💡 **提示**：如果你不知道自己的 Telegram 数字 ID，可以在 Telegram 搜索 `@userinfobot` 发送任意消息，它会直接返回你的 `Id` 数字。

### 2. 接入 QQ 开放平台 Bot

如果习惯在国内环境使用，Hermes 原生支持 QQ 开放平台官方机器人：

1. 前往 [QQ 开放平台](https://q.qq.com/) 创建机器人，获取 `AppID` 和 `AppSecret`。
2. 编辑 `~/.hermes/config.yaml`：

📁 `~/.hermes/config.yaml`
```yaml
platforms:
  qqbot:
    enabled: true
    extra:
      app_id: "你的AppID"
      client_secret: "你的完整AppSecret"
```

### 3. 将 Gateway 交给 Systemd 后台守护
为了保证服务器重启后 Bot 依然自动在线，配置开机自启：

```bash
# 重启网关使新配置生效
systemctl --user restart hermes-gateway
# 或者直接用 hermes 命令
hermes gateway restart
```

---

## 💻 第四步：让它天天替你打工（Cron 定时任务）

这是让 AI 从“被动回答”变成“主动助手”的关键功能。Hermes 内置了强大的定时调度引擎：

| 典型场景 | 创建命令示例 | 效果说明 |
| :--- | :--- | :--- |
| **每日早报** | `hermes cron create "0 8 * * *" "整理今日 AI 前沿要闻并推送到 Telegram"` | 每天早晨 8 点自主搜索最新资讯并推送 |
| **服务器体检** | `hermes cron create "0 9 * * 1" "检查全节点磁盘/内存/连通性并生成体检表"` | 每周一早上自动巡检整机舰队 |
| **静默看门狗** | `hermes cron create "30m" "检查 gateway 与关键进程状态" --no-agent` | 每 30 分钟无 Token 消耗静默监控，异常时才报警 |

---

## 🔍 验证与排障技巧

当你部署完后，怎么确认一切都在正常运转？

### 1. 常用自检三件套
```bash
# 1. 一键全身体检（网络、模型、数据库、工具链连通性）
hermes doctor

# 2. 检查当前网关连接状态
hermes status

# 3. 查看最近网关运行日志
journalctl --user -u hermes-gateway -n 30 --no-pager
```

### 2. 常见问题速查表

| 遇到问题 | 真实原因 | 快速解决方法 |
| :--- | :--- | :--- |
| **Bot 在聊天软件里不理人** | 你的 Chat ID 没有加进白名单 | 检查 `telegram.allowed_chats` 是否包含你的数字 ID，修改后重启 gateway。 |
| **提示 401 Unauthorized** | API Key 写错了位置或已欠费 | 检查 Key 是否存入 `~/.hermes/.env`，用 `curl` 单独测试模型接口。 |
| **配置修改后没生效** | 网关仍在运行旧内存缓存 | 在终端执行 `systemctl --user restart hermes-gateway` 或在聊天框发送 `/restart`。 |
| **命令执行超时** | Tirith 安全守卫在做拦截审查 | 5 秒内的分析审查属于正常安全耗时，耐心等待即可。 |

---

> 📌 **写在最后**：
> 一个真正好用的 AI 助手，不应该是你每次需要时才在网页里打开的一个空白输入框；而是默默守在你的服务器与聊天软件里，随时能够接收指令、自动沉淀经验、7×24 小时为你守护系统的忠实伙伴。
> 
> 如果在搭建过程中遇到任何细节问题，欢迎在评论区或 GitHub 讨论交流！
',
    '很多人第一次听说 AI Agent，总觉得它离自己很远。如果你有一台 Linux 服务器，想让 AI 真正替你干活——每天巡检机器、早晨推送资讯、在 Telegram/QQ 上随时随地执行运维命令，这篇手把手指南带你从零搞定 Hermes Agent 部署。',
    1,
    '技术札记',
    'Hermes,AI,Agent,Telegram,QQBot,Linux,运维',
    'published',
    1,
    36,
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
