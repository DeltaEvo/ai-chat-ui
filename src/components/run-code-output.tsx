import { ToolOutputCode } from '@/components/tool-output-code'
import type { ToolPart } from '@/components/ai-elements/tool'

export interface RunCodeResult {
  output?: unknown
  result?: unknown
}

interface RunCodeOutputProps {
  output: RunCodeResult
}

export function isRunCodeOutput(output: ToolPart['output']): output is RunCodeResult {
  return typeof output === 'object' && output !== null && ('output' in output || 'result' in output)
}

export function RunCodeOutput({ output }: RunCodeOutputProps) {
  const stdout = typeof output.output === 'string' ? output.output : ''
  const hasResult = 'result' in output && output.result !== undefined

  return (
    <div className="space-y-4 p-4">
      {stdout && (
        <div className="space-y-2">
          <h4 className="font-medium text-muted-foreground text-xs uppercase tracking-wide">Output</h4>
          <div className="max-h-96 overflow-auto rounded-md border bg-background p-4">
            <pre className="whitespace-pre-wrap break-words font-mono text-foreground text-xs">{stdout}</pre>
          </div>
        </div>
      )}
      {hasResult && (
        <div className="space-y-2">
          <h4 className="font-medium text-muted-foreground text-xs uppercase tracking-wide">Result</h4>
          <div className="rounded-md bg-muted/50">
            <ToolOutputCode output={output.result} />
          </div>
        </div>
      )}
    </div>
  )
}
