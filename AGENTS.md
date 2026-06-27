<!-- headroom:rtk-instructions -->

# RTK (Rust Token Killer) - Token-Optimized Commands

When running shell commands, apply these rules in order:

1. If the user explicitly asks for debugging or raw output, use the command exactly as written without `rtk`.
2. If the command is in RTK's supported command list (Git, Files, Test, Build, Analysis, GitHub, Infrastructure, Package managers), prefix it with `rtk`.
3. If the command is not supported by RTK, output the original command exactly as written without adding `rtk` or changing shell syntax.
4. If `rtk` is not installed, not found, or cannot recognize a command, output the original shell command unchanged and do not invent a substitute command.

This approach reduces context usage by 60-90% while maintaining predictable, consistent behavior.

## Key Commands

```bash
# Git (59-80% savings)
rtk git status          rtk git diff            rtk git log

# Files & Search (60-75% savings)
rtk ls <path>           rtk read <file>         rtk grep <pattern>
rtk find <pattern>      rtk diff <file>

# Test (90-99% savings) — shows failures only
rtk pytest tests/       rtk cargo test          rtk test <test-command>

# Build & Lint (80-90% savings) — shows errors only
rtk tsc                 rtk lint                rtk cargo build
rtk prettier --check    rtk mypy                rtk ruff check

# Analysis (70-90% savings)
rtk err <cmd>           rtk log <file>          rtk json <file>
rtk summary <cmd>       rtk deps                rtk env

# GitHub (26-87% savings)
rtk gh pr view <n>      rtk gh run list         rtk gh issue list

# Infrastructure (85% savings)
rtk docker ps           rtk kubectl get         rtk docker logs <c>

# Package managers (70-90% savings)
rtk pip list            rtk pnpm install        rtk npm run <script>
```

## Rules

- In command chains with `&&`, prefix each executable segment: `rtk git add . && rtk git commit -m "msg"`
- For pipes (`|`), redirects (`>`, `>>`, `<`), and compound shell syntax (`;`, `||`, `&&`, `$(...)`), either wrap the full command in `rtk proxy <cmd>` or prefix only the executable segments exactly as written; do not guess.
- The above rules do not apply when the user explicitly asks for debugging or raw output — use the command exactly as written without `rtk`.
- `rtk proxy <cmd>` runs command without filtering but tracks usage (use when you are unsure about `rtk`'s ability to handle the syntax).
<!-- /headroom:rtk-instructions -->
