
INSERT INTO posts (slug, title, content, excerpt, category_id, category_name, tags, status, pinned, views, created_at, updated_at)
VALUES (
    'hermes-agent-deploy-guide',
    "Hermes Agent 极简折腾实录：从裸机搭建到 Telegram/QQ 随身运维",
    "# Hermes Agent 部署手记
    "受够了在网页里跟 ChatGPT 来回复制粘贴命令？这篇实操手记带你从一台干净的 Linux VPS 开始，把 Hermes Agent 调教成 24 小时随叫随到的 AI 运维助理，打通多模型容灾与 Telegram/QQ 随身操控。",
    1,
    "技术札记",
    "Hermes,AI,Agent,Telegram,QQBot,Linux,自动化运维",
    'published',
    1,
    52,
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
