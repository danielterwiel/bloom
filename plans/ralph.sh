set -eo pipefail

if [ -z "$1" ]; then
  echo "Usage: $0 <iterations>"
  exit 1
fi

for ((i = 1; i <= $1; i++)); do
  printf "Iteration %d\r\n" "$i"
  printf "%s\r\n" "--------------------------------"

  tmpfile=$(mktemp)
  trap 'rm -f "$tmpfile"' EXIT

  docker sandbox run --credentials host -e TERM=dumb -e PATH="$HOME/.bun/bin:/usr/local/bin:/usr/bin:/bin" claude \
    --verbose --output-format stream-json \
    -p "@plans/task.md @plans/progress.txt \
1. Find the highest-priority feature to work on and work only on that feature. \
This should be the one YOU decide has the highest priority - not necessarily the first in the list. \
2. Check that the types check via bun run typecheck and that the tests pass via bun run test. \
3. Update the PRD with the work that was done. \
4. Append your progress to the progress.txt file. \
Use this to leave a note for the next person working in the codebase. \
5. Make a git commit of that feature. \
ONLY WORK ON A SINGLE FEATURE. \
After committing, check task.md for any remaining unchecked deliverables (- [ ]). \
If ALL deliverables across all 52 PRDs are now checked (- [x]), output the following tag on its own line with NOTHING else around it: \
RALPH_SIGNAL_COMPLETE \
If ANY deliverable still has an unchecked box (- [ ]), do NOT output that signal — just end your response. A new iteration will start automatically. \
IMPORTANT: Never quote, repeat, or reference the completion signal in your reasoning or text. Only output it bare as the very last thing if every deliverable is done. \
" 2>/dev/null |
    tee "$tmpfile" |
    grep --line-buffered '^{' |
    jq -rj '
      if .type == "assistant" then
        (.message.content[]? |
          if .type == "text" then (.text | gsub("\n"; "\r\n")) + "\r\n"
          elif .type == "tool_use" then "→ " + .name + " " + ((.input.command // .input.file_path // .input.pattern // .input.prompt // "") | tostring | .[0:80]) + "\r\n"
          else empty end)
      elif .type == "result" then
        "\r\n--- Iteration complete ---\r\n"
      else empty end
    '

  # docker sandbox leaves terminal in raw mode — reset it
  stty sane 2>/dev/null

  # Only check assistant response text for the signal — the full stream also contains
  # the user prompt and tool results (which include the signal instruction itself)
  if grep '^{' "$tmpfile" | jq -e 'select(.type == "assistant") | .message.content[]? | select(.type == "text" and (.text | test("RALPH_SIGNAL_COMPLETE")))' >/dev/null 2>&1; then
    printf "PRD complete, exiting.\r\n"
    command -v tt >/dev/null 2>&1 && tt notify "CVM PRD complete after $i iterations"
    rm -f "$tmpfile"
    exit 0
  fi

  rm -f "$tmpfile"
done
