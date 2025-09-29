**English** | [日本語](./README.ja.md)

# Codex Viewer

A full-featured web-based Codex client that provides complete interactive functionality for managing Codex projects. Start new conversations, resume existing sessions, monitor running tasks in real-time, and browse your conversation history - all through a modern web interface.

> **Note**: This project is a derivative work of claude-code-viewer by d-kimuson.  
> The original project can be found at: https://github.com/d-kimuson/claude-code-viewer
>
> **注記**: このプロジェクトは d-kimuson による claude-code-viewer をベースにCodex用に動くように書き換えたものです。  
> オリジナルのプロジェクトはこちらです: https://github.com/d-kimuson/claude-code-viewer

![demo](./docs/assets/codex-viewer-demo-min.gif)

## Overview

Codex Viewer has evolved from a simple conversation viewer into a comprehensive web-based Codex client. It provides all essential Codex functionality through an intuitive web interface, including creating new sessions, resuming conversations, real-time task management, and live synchronization with your local Codex projects.

The application leverages Server-Sent Events (SSE) for real-time bidirectional communication, automatically syncing with JSONL conversation files in `~/.codex/sessions/` and providing instant updates as conversations progress.


## Screenshots

![Projects view](./docs/assets/images/img001.png)

![Session list](./docs/assets/images/img002.png)

![Session detail](./docs/assets/images/img003.png)

## Features

### Interactive Codex Client

- **New Chat Creation** - Start new Codex sessions directly from the web interface
- **Session Resumption** - Continue paused Codex conversations with full context
- **Real-time Task Management** - Monitor, control, and abort running Codex tasks
- **Command Autocompletion** - Smart completion for both global and project-specific Codex commands
- **Live Status Indicators** - Visual feedback for running, paused, and completed tasks

### Real-time Synchronization

- **Server-Sent Events (SSE)** - Instant bidirectional communication and updates
- **File System Monitoring** - Automatic detection of conversation file changes
- **Live Task Updates** - Real-time progress tracking for active Codex sessions
- **Auto-refresh UI** - Instant updates when conversations are modified externally

### Advanced Conversation Management

- **Project Browser** - View all Codex projects with metadata and session counts
- **Smart Session Filtering** - Hide empty sessions, unify duplicates, filter by status
- **Multi-tab Interface** - Sessions, Tasks, and Settings in an organized sidebar
- **Conversation Display** - Human-readable format with syntax highlighting and tool usage
- **Command Detection** - Enhanced display of XML-like command structures
- **Task Controller** - Full lifecycle management of Codex processes

## Installation & Usage

### Quick Start (CLI)

Run directly from npm without installation:

```bash
PORT=3400 npx @nogataka/codex-viewer@latest
```

Alternatively, install globally:

```bash
npm install -g @nogataka/codex-viewer
codex-viewer
```

The application uses pnpm as the package manager (v10.8.1) and is published as version 0.1.0.

The server will start on port 3400 (or the specified PORT). Open `http://localhost:3400` in your browser.

### Alternative Installation

Clone and run locally:

```bash
git clone https://github.com/nogataka/codex-viewer.git
cd codex-viewer
pnpm i
pnpm build
pnpm start
```

## Data Source

The application reads Codex conversation files from:

- **Location**: `~/.codex/sessions/<workspace>/<session-id>.jsonl`
- **Format**: JSONL files containing conversation entries
- **Auto-detection**: Automatically discovers new projects and sessions

## Usage Guide

### 1. Project List

- Browse all Codex projects
- View project metadata (name, path, session count, last modified)
- Click any project to view its sessions

### 2. Session Browser  

- View all conversation sessions within a project
- Filter to hide empty sessions
- Sessions show message counts and timestamps
- Click to view detailed conversation

### 3. Conversation Viewer

- Full conversation history with proper formatting
- Syntax highlighting for code blocks
- Tool usage and results clearly displayed
- Navigation sidebar for jumping between sessions
- Support for different message types (user, assistant, system, tools)

## Configuration

### Port Configuration

Set a custom port using the `PORT` environment variable:

```bash
PORT=8080 npx @nogataka/codex-viewer@latest
```

### Data Directory

The application automatically detects the standard Codex directory at `~/.codex/sessions/`. No additional configuration is required.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Contributing

See [docs/dev.md](docs/dev.md) for detailed development setup and contribution guidelines.

## Articles

Codex Viewer の導入背景や活用シナリオをさらに知りたい方は、以下の紹介記事もチェックしてください。

- [Qiita: Codexプロジェクト管理を加速するCodex Viewerガイド](https://qiita.com/nogataka/items/28d04db421663a4a46fd) — UI構成やユースケースを詳しく解説
- [Zenn: Codex ViewerでCodexセッションを俯瞰する](https://zenn.dev/taka000/articles/74a60c37fae5bb) — 日常運用での使いこなしポイントを紹介

