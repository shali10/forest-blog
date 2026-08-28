import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const outDir = '/root/forest-blog/docs/images/hermes-agent';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function renderCard(browser, html, filename, width = 1200, height = 700) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'networkidle0' });
  const card = await page.$('.screenshot-container');
  const outPath = path.join(outDir, filename);
  if (card) {
    await card.screenshot({ path: outPath });
  } else {
    await page.screenshot({ path: outPath });
  }
  await page.close();
  console.log(`Rendered: ${filename}`);
}

async function main() {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
  });

  // 1. Architecture Flow Card
  const archHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body { margin: 0; padding: 40px; background: #0f172a; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; display: flex; justify-content: center; align-items: center; }
      .screenshot-container { width: 1000px; background: #1e293b; border-radius: 20px; border: 1px solid #334155; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); padding: 36px; box-sizing: border-box; color: #f8fafc; }
      .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #334155; padding-bottom: 20px; margin-bottom: 30px; }
      .title-group { display: flex; align-items: center; gap: 14px; }
      .logo { width: 44px; height: 44px; background: linear-gradient(135deg, #3b82f6, #8b5cf6); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px; box-shadow: 0 4px 12px rgba(59,130,246,0.3); }
      .title { font-size: 22px; font-weight: 700; color: #f1f5f9; }
      .subtitle { font-size: 13px; color: #94a3b8; margin-top: 4px; }
      .badge { padding: 6px 14px; background: rgba(59,130,246,0.15); border: 1px solid rgba(59,130,246,0.3); border-radius: 20px; color: #60a5fa; font-size: 13px; font-weight: 600; }
      .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; position: relative; }
      .card { background: #0f172a; border-radius: 14px; border: 1px solid #334155; padding: 22px; display: flex; flex-direction: column; gap: 12px; }
      .card-header { display: flex; align-items: center; gap: 10px; }
      .card-icon { width: 34px; height: 34px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; }
      .c1 .card-icon { background: rgba(56, 189, 248, 0.15); color: #38bdf8; }
      .c2 .card-icon { background: rgba(139, 92, 246, 0.15); color: #a78bfa; }
      .c3 .card-icon { background: rgba(34, 197, 94, 0.15); color: #4ade80; }
      .c4 .card-icon { background: rgba(245, 158, 11, 0.15); color: #fbbf24; }
      .card-title { font-size: 15px; font-weight: 600; color: #e2e8f0; }
      .card-desc { font-size: 12px; color: #94a3b8; line-height: 1.6; }
      .card-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: auto; }
      .tag { font-size: 11px; padding: 3px 8px; border-radius: 6px; background: #1e293b; color: #cbd5e1; border: 1px solid #334155; }
      .footer-bar { margin-top: 28px; padding-top: 20px; border-top: 1px solid #334155; display: flex; justify-content: space-between; align-items: center; font-size: 13px; color: #64748b; }
      .dots { display: flex; gap: 6px; }
      .dot { width: 8px; height: 8px; border-radius: 50%; }
      .dot-green { background: #22c55e; box-shadow: 0 0 8px #22c55e; }
    </style>
  </head>
  <body>
    <div class="screenshot-container">
      <div class="header">
        <div class="title-group">
          <div class="logo">⚡</div>
          <div>
            <div class="title">Hermes Agent 系统协同架构</div>
            <div class="subtitle">从即时通讯网关到 Linux 宿主机底层执行的完整闭环</div>
          </div>
        </div>
        <div class="badge">Production Ready</div>
      </div>
      <div class="grid">
        <div class="card c1">
          <div class="card-header">
            <div class="card-icon">📱</div>
            <div class="card-title">1. 多端交互网关</div>
          </div>
          <div class="card-desc">Telegram / QQ 官方机器人随时随地接收日常指令，支持白名单安全鉴权与富文本回显。</div>
          <div class="card-tags">
            <span class="tag">Telegram Bot</span>
            <span class="tag">QQ OpenBot</span>
            <span class="tag">Allowed Chats</span>
          </div>
        </div>
        <div class="card c2">
          <div class="card-header">
            <div class="card-icon">🧠</div>
            <div class="card-title">2. 大模型大脑</div>
          </div>
          <div class="card-desc">驱动复杂意图理解与工具调度，结合多级 Fallback 容灾链保障 7×24h 稳定在线。</div>
          <div class="card-tags">
            <span class="tag">Claude 3.7</span>
            <span class="tag">Gemini 2.5</span>
            <span class="tag">多级容灾切流</span>
          </div>
        </div>
        <div class="card c3">
          <div class="card-header">
            <div class="card-icon">🛠️</div>
            <div class="card-title">3. 执行工具链</div>
          </div>
          <div class="card-desc">原生掌控 Linux 终端、文件读写、网页爬虫与无头浏览器，受 Tirith 安全护卫实时审查。</div>
          <div class="card-tags">
            <span class="tag">Terminal</span>
            <span class="tag">Filesystem</span>
            <span class="tag">Tirith Guard</span>
          </div>
        </div>
        <div class="card c4">
          <div class="card-header">
            <div class="card-icon">💾</div>
            <div class="card-title">4. 记忆与技能</div>
          </div>
          <div class="card-desc">跨会话持久记忆保持上下文；排障过程自动沉淀为可复用 SOP 技能，越用越顺手。</div>
          <div class="card-tags">
            <span class="tag">SQLite DB</span>
            <span class="tag">Honcho Memory</span>
            <span class="tag">Skill 经验库</span>
          </div>
        </div>
      </div>
      <div class="footer-bar">
        <div style="display:flex; align-items:center; gap:8px;">
          <div class="dot dot-green"></div>
          <span>System Gateway & Agent Daemon Active</span>
        </div>
        <span>note.0000996.xyz · 林间随笔实录</span>
      </div>
    </div>
  </body>
  </html>
  `;
  await renderCard(browser, archHtml, '01-architecture.png', 1100, 580);

  // 2. Terminal Doctor & Status Mockup
  const termHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body { margin: 0; padding: 40px; background: #0f172a; font-family: 'JetBrains Mono', Consolas, Monaco, monospace; display: flex; justify-content: center; align-items: center; }
      .screenshot-container { width: 960px; background: #181825; border-radius: 14px; border: 1px solid #313244; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.6); overflow: hidden; }
      .term-header { background: #11111b; padding: 12px 18px; display: flex; align-items: center; border-bottom: 1px solid #313244; }
      .term-dots { display: flex; gap: 8px; }
      .dot { width: 12px; height: 12px; border-radius: 50%; }
      .dot-red { background: #f38ba8; }
      .dot-yellow { background: #f9e2af; }
      .dot-green { background: #a6e3a1; }
      .term-title { flex: 1; text-align: center; font-size: 13px; color: #a6adc8; font-weight: 500; font-family: -apple-system, sans-serif; }
      .term-body { padding: 24px 28px; font-size: 13.5px; line-height: 1.65; color: #cdd6f4; }
      .prompt { color: #89b4fa; }
      .cmd { color: #f5e0dc; font-weight: 600; }
      .dim { color: #6c7086; }
      .green { color: #a6e3a1; font-weight: 600; }
      .blue { color: #89b4fa; }
      .yellow { color: #f9e2af; }
      .purple { color: #cba6f7; }
      .divider { color: #45475a; }
      .table-row { display: flex; justify-content: space-between; border-bottom: 1px dashed #313244; padding: 4px 0; }
      .badge-ok { background: rgba(166, 227, 161, 0.15); color: #a6e3a1; padding: 1px 8px; border-radius: 4px; font-size: 12px; }
    </style>
  </head>
  <body>
    <div class="screenshot-container">
      <div class="term-header">
        <div class="term-dots">
          <div class="dot dot-red"></div>
          <div class="dot dot-yellow"></div>
          <div class="dot dot-green"></div>
        </div>
        <div class="term-title">root@vps-us-01:~ (hermes doctor & status)</div>
      </div>
      <div class="term-body">
        <div><span class="prompt">root@vps-us-01:~#</span> <span class="cmd">hermes doctor</span></div>
        <div class="dim">Running comprehensive system health & connectivity diagnostics...</div>
        <br>
        <div class="table-row"><span>[✓] Python Runtime & Venv Environment</span><span class="badge-ok">READY (v3.11.15)</span></div>
        <div class="table-row"><span>[✓] Primary Provider (Custom Proxy / Gemini 2.5)</span><span class="badge-ok">200 OK · 312ms</span></div>
        <div class="table-row"><span>[✓] Fallback Chain (Claude Sonnet 3.7 / DeepSeek)</span><span class="badge-ok">ACTIVE (2 Nodes)</span></div>
        <div class="table-row"><span>[✓] Local Session & Memory SQLite DB</span><span class="badge-ok">HEALTHY (WAL OK)</span></div>
        <div class="table-row"><span>[✓] Execution Sandbox & Tirith Security Guard</span><span class="badge-ok">ENFORCING</span></div>
        <div class="table-row"><span>[✓] Headless Chromium & Puppeteer Core</span><span class="badge-ok">INITIALIZED</span></div>
        <br>
        <div><span class="green">✓ All 6 core subsystems passed verification with zero errors!</span></div>
        <br>
        <div><span class="prompt">root@vps-us-01:~#</span> <span class="cmd">hermes status</span></div>
        <div class="dim">Hermes Agent Gateway Status</div>
        <div>  • <span class="purple">Gateway Service</span>: <span class="green">Active (running)</span> since 12h ago</div>
        <div>  • <span class="blue">Connected Adapters</span>: Telegram (<span class="green">Polling OK</span>), QQ Bot (<span class="green">WebSocket OK</span>)</div>
        <div>  • <span class="yellow">Active Cron Jobs</span>: 3 scheduled (Morning Brief, Fleet Health, Watchdog)</div>
        <div>  • <span class="dim">Memory Footprint</span>: 148 MB RAM · Zero Leak Detected</div>
      </div>
    </div>
  </body>
  </html>
  `;
  await renderCard(browser, termHtml, '02-terminal-doctor.png', 1060, 560);

  // 3. Telegram Ops Interaction Mockup
  const chatHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body { margin: 0; padding: 40px; background: #0b141a; font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", Roboto, Helvetica, sans-serif; display: flex; justify-content: center; align-items: center; }
      .screenshot-container { width: 840px; background: #111b21; border-radius: 20px; border: 1px solid #202c33; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.7); overflow: hidden; }
      .chat-header { background: #202c33; padding: 14px 22px; display: flex; align-items: center; gap: 14px; }
      .avatar { width: 42px; height: 42px; border-radius: 50%; background: linear-gradient(135deg, #0088cc, #38bdf8); display: flex; align-items: center; justify-content: center; font-size: 20px; color: white; font-weight: bold; }
      .user-info { flex: 1; }
      .user-name { font-size: 16px; font-weight: 600; color: #e9edef; }
      .user-status { font-size: 12px; color: #00a884; }
      .chat-body { padding: 24px; display: flex; flex-direction: column; gap: 18px; background: #0b141a; }
      .msg-row { display: flex; flex-direction: column; }
      .msg-row.outgoing { align-items: flex-end; }
      .msg-row.incoming { align-items: flex-start; }
      .bubble { max-width: 85%; padding: 12px 16px; border-radius: 12px; font-size: 14px; line-height: 1.55; position: relative; }
      .bubble.outgoing { background: #005c4b; color: #e9edef; border-bottom-right-radius: 2px; }
      .bubble.incoming { background: #202c33; color: #d1d7db; border-bottom-left-radius: 2px; }
      .time { font-size: 11px; color: rgba(255,255,255,0.5); margin-top: 4px; text-align: right; }
      .code-card { background: #111b21; border: 1px solid #334155; border-radius: 8px; padding: 10px 14px; margin: 8px 0; font-family: 'JetBrains Mono', Consolas, monospace; font-size: 12.5px; color: #38bdf8; }
      .stat-table { width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 12px; }
      .stat-table th { text-align: left; color: #94a3b8; border-bottom: 1px solid #374151; padding: 4px 6px; }
      .stat-table td { color: #f3f4f6; border-bottom: 1px solid #1f2937; padding: 5px 6px; }
      .badge-clean { background: rgba(34, 197, 94, 0.2); color: #4ade80; padding: 1px 6px; border-radius: 4px; }
    </style>
  </head>
  <body>
    <div class="screenshot-container">
      <div class="chat-header">
        <div class="avatar">🤖</div>
        <div class="user-info">
          <div class="user-name">Hermes Ops Assistant</div>
          <div class="user-status">bot · online 24/7</div>
        </div>
      </div>
      <div class="chat-body">
        <div class="msg-row outgoing">
          <div class="bubble outgoing">
            帮我查一下这台 VPS 的磁盘占用，顺便看看 /tmp 有没有需要清理的无用日志。
            <div class="time">10:42 AM</div>
          </div>
        </div>
        <div class="msg-row incoming">
          <div class="bubble incoming">
            <div>已执行实机诊断，全盘使用率 <b>38%</b>，处于健康区间：</div>
            <table class="stat-table">
              <tr><th>挂载点</th><th>总容量</th><th>已用</th><th>剩余</th><th>状态</th></tr>
              <tr><td>/ (Root)</td><td>40.0 GB</td><td>15.2 GB</td><td>24.8 GB</td><td><span class="badge-clean">正常 (38%)</span></td></tr>
              <tr><td>/var/lib/docker</td><td>40.0 GB</td><td>8.4 GB</td><td>31.6 GB</td><td><span class="badge-clean">健康</span></td></tr>
            </table>
            <div style="margin-top:10px;">
              📁 扫描到 <code>/tmp</code> 存在 3 份上周生成的临时构建日志（共 <b>380 MB</b>），可安全清理：
            </div>
            <div class="code-card">
              ✓ rm -f /tmp/build-*.log /tmp/npm-cache-*.tmp<br>
              ✨ 已完成清理，立即释放 380 MB 空间。
            </div>
            <div class="time">10:42 AM</div>
          </div>
        </div>
        <div class="msg-row outgoing">
          <div class="bubble outgoing">
            干得漂亮！再加个定时任务，每周一早上 9 点自动把全机巡检表推到群里。
            <div class="time">10:43 AM</div>
          </div>
        </div>
        <div class="msg-row incoming">
          <div class="bubble incoming">
            <div>✅ <b>定时任务已创建并激活</b></div>
            <div style="margin-top:6px; font-size:13px; color:#94a3b8;">
              • 调度周期：<code>0 9 * * 1</code>（每周一 09:00 CST）<br>
              • 执行动作：自动巡检整机资源、Docker 容器健康度与 SSL 证书并生成标准汇报<br>
              • 目标通道：当前 Telegram 频道
            </div>
            <div class="time">10:43 AM</div>
          </div>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;
  await renderCard(browser, chatHtml, '03-telegram-interaction.png', 940, 680);

  // 4. Fallback and Gateway Daemon Mockup
  const daemonHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body { margin: 0; padding: 40px; background: #0f172a; font-family: 'JetBrains Mono', Consolas, Monaco, monospace; display: flex; justify-content: center; align-items: center; }
      .screenshot-container { width: 960px; background: #1e1e2e; border-radius: 14px; border: 1px solid #313244; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.6); overflow: hidden; }
      .term-header { background: #181825; padding: 12px 18px; display: flex; align-items: center; border-bottom: 1px solid #313244; }
      .term-dots { display: flex; gap: 8px; }
      .dot { width: 12px; height: 12px; border-radius: 50%; }
      .dot-red { background: #f38ba8; }
      .dot-yellow { background: #f9e2af; }
      .dot-green { background: #a6e3a1; }
      .term-title { flex: 1; text-align: center; font-size: 13px; color: #a6adc8; font-weight: 500; font-family: -apple-system, sans-serif; }
      .term-body { padding: 22px 26px; font-size: 13px; line-height: 1.65; color: #cdd6f4; }
      .prompt { color: #89b4fa; }
      .cmd { color: #f5e0dc; font-weight: 600; }
      .dim { color: #6c7086; }
      .green { color: #a6e3a1; font-weight: 600; }
      .blue { color: #89b4fa; }
      .yellow { color: #f9e2af; }
      .purple { color: #cba6f7; }
      .tag-active { color: #a6e3a1; font-weight: bold; }
    </style>
  </head>
  <body>
    <div class="screenshot-container">
      <div class="term-header">
        <div class="term-dots">
          <div class="dot dot-red"></div>
          <div class="dot dot-yellow"></div>
          <div class="dot dot-green"></div>
        </div>
        <div class="term-title">systemctl --user status hermes-gateway (Systemd 守护)</div>
      </div>
      <div class="term-body">
        <div><span class="prompt">root@vps-us-01:~#</span> <span class="cmd">systemctl --user status hermes-gateway</span></div>
        <div>● <span class="green">hermes-gateway.service</span> - Hermes Autonomous AI Agent Gateway Daemon</div>
        <div>     Loaded: loaded (/root/.config/systemd/user/hermes-gateway.service; <span class="blue">enabled</span>; preset: enabled)</div>
        <div>     Active: <span class="tag-active">active (running)</span> since Thu 2026-08-27 22:15:04 CST; 14h ago</div>
        <div>   Main PID: 38241 (python3)</div>
        <div>      Tasks: 16 (limit: 4681)</div>
        <div>     Memory: 152.4M (peak: 184.2M)</div>
        <div>        CPU: 1min 24.120s</div>
        <div>     CGroup: /user.slice/user-0.slice/user@0.service/app.slice/hermes-gateway.service</div>
        <div>             └─38241 /usr/local/lib/hermes-agent/venv/bin/python -m hermes_cli.gateway</div>
        <br>
        <div class="dim">Aug 28 09:00:00 vps-us-01 hermes-gateway[38241]: [INFO] [cron] Triggering scheduled job: morning_briefing</div>
        <div class="dim">Aug 28 09:00:04 vps-us-01 hermes-gateway[38241]: [INFO] [cron] Job completed successfully in 3.8s. Delivered to Telegram.</div>
        <div class="dim">Aug 28 10:42:15 vps-us-01 hermes-gateway[38241]: [INFO] [tg] Message received from chat_id=1658239957 (authorized)</div>
        <div class="dim">Aug 28 10:42:18 vps-us-01 hermes-gateway[38241]: [INFO] [agent] Executed tool: terminal(df -h) -> Success.</div>
      </div>
    </div>
  </body>
  </html>
  `;
  await renderCard(browser, daemonHtml, '04-cron-systemd.png', 1060, 520);

  await browser.close();
  console.log('All 4 images generated successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
