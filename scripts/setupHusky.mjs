// scripts/setupHusky.mjs
import { chmodSync, existsSync, mkdirSync, writeFileSync } from 'fs';

const huskyDir = '.husky';
const hookFile = `${huskyDir}/pre-commit`;

// Create .husky folder if it doesn't exist
if (!existsSync(huskyDir)) {
  mkdirSync(huskyDir);
}

// Create husky.sh runtime script (required)
if (!existsSync(`${huskyDir}/_/husky.sh`)) {
  mkdirSync(`${huskyDir}/_`, { recursive: true });
  writeFileSync(
    `${huskyDir}/_/husky.sh`,
    `#!/bin/sh
if [ -z "$husky_skip_init" ]; then
  debug () {
    [ "$HUSKY_DEBUG" = "1" ] && echo "> husky (debug) $1"
  }

  readonly hook_name="$(basename "$0")"
  debug "starting $hook_name..."

  if [ "$HUSKY" = "0" ]; then
    debug "HUSKY env variable is set to 0, skipping hook"
    exit 0
  fi

  if [ -f ~/.huskyrc ]; then
    debug "sourcing ~/.huskyrc"
    . ~/.huskyrc
  fi
fi
`,
  );
  chmodSync(`${huskyDir}/_/husky.sh`, 0o755);
}

// Create pre-commit hook
if (!existsSync(hookFile)) {
  writeFileSync(
    hookFile,
    `#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
`,
  );
  chmodSync(hookFile, 0o755);
}
