import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/ui/terminal"
import Link from "next/link"

interface TerminalInterface {
    type: string,
    headding: string[],
    description: string,
    url: string,
    content: string,
    tags?: string[],
    actions?: { label: string; url: string; type: string }[]
}

function TerminalDemo ({ data }: { data: TerminalInterface }) {
  if (!data) return null;

  return (
    <Terminal>
      <TypingAnimation>&gt; loading knowledge module...</TypingAnimation>

      <div className="mt-4 space-y-3">
        <AnimatedSpan delay={800} className="text-green-400 font-bold text-xl block">
          📚 {data.headding[0]}
        </AnimatedSpan>

        {data.tags && data.tags.length > 0 && (
          <AnimatedSpan delay={1200} className="flex flex-wrap gap-1">
            {data.tags.slice(0, 4).map((tag, i) => (
              <span key={i} className="px-2 py-0.5 bg-cyan-900/50 text-cyan-300 text-xs rounded-full border border-cyan-700/50 uppercase">
                {tag}
              </span>
            ))}
          </AnimatedSpan>
        )}

        <AnimatedSpan delay={1500} className="text-gray-200 block mt-3 leading-relaxed">
          {data.description}
        </AnimatedSpan>
        
        {data.content && (
          <AnimatedSpan delay={2000} className="text-gray-400 block mt-2 text-sm leading-relaxed border-l-2 border-green-700 pl-3">
            {data.content.slice(0, 300)}{data.content.length > 300 ? '...' : ''}
          </AnimatedSpan>
        )}

        {data.actions && data.actions.length > 0 && (
          <AnimatedSpan delay={2500} className="flex flex-wrap gap-2 mt-4">
            {data.actions.map((action, idx) => (
              <Link
                key={idx}
                href={action.url}
                className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wide no-underline transition-colors ${
                  action.type === 'navigate_map' 
                    ? 'bg-sky-900/80 text-sky-200 border border-sky-600 hover:bg-sky-800' 
                    : 'bg-violet-900/80 text-violet-200 border border-violet-600 hover:bg-violet-800'
                }`}
              >
                {action.type === 'navigate_map' ? '🗺️ ' : '📖 '}
                {action.label}
              </Link>
            ))}
          </AnimatedSpan>
        )}
      </div>

      <TypingAnimation delay={3000} className="text-green-600 mt-4">
        ✓ Knowledge loaded successfully.
      </TypingAnimation>
    </Terminal>
  )
}
export default TerminalDemo
