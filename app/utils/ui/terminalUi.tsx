import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/ui/terminal"
import Link from "next/link"
import React from "react"

interface TerminalInterface {
    type: string,
    headding: string[],
    description: string,
    url: string,
    content: string,
    tags?: string[],
    actions?: { label: string; url: string; type: string }[]
}

/**
 * Formats content text with bold markers and bullet points
 * Handles patterns like: "- **Title**: Content. - **Title2**: Content2"
 */
function formatContentText(text: string): React.ReactNode {
  if (!text) return null;
  
  // Split by patterns: ". - " or " - " or starting "-"
  // This handles: "text. - **Bold**: more" and "- **Bold**: text - **Bold2**: text2"
  let lines: string[] = [];
  
  // First try splitting by ". - " (sentence end followed by dash)
  if (text.includes('. - ')) {
    lines = text.split(/\.\s*-\s*/).map(s => s.trim()).filter(Boolean);
  } 
  // Then try splitting by " - **" (dash before bold marker)
  else if (text.includes(' - **')) {
    lines = text.split(/\s+-\s+(?=\*\*)/).map(s => s.trim()).filter(Boolean);
  }
  // Then try starting dash
  else if (text.startsWith('-') || text.includes('- ')) {
    lines = text.split(/(?:^|\s)-\s+/).map(s => s.trim()).filter(Boolean);
  }
  
  if (lines.length <= 1) {
    // Single line - just format bold
    return formatBoldText(text);
  }
  
  return (
    <div className="space-y-2">
      {lines.map((line, index) => {
        // Remove leading dash if present
        const cleanLine = line.replace(/^-\s*/, '').replace(/\.$/, '');
        
        return (
          <div key={index} className="flex gap-2 items-start">
            <span className="text-green-400 mt-0.5 shrink-0">•</span>
            <span>{formatBoldText(cleanLine)}</span>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Recursively converts **text** to bold React elements
 * Handles edge cases like "**text **" or isolated "**"
 */
function formatBoldText(text: string): React.ReactNode {
  if (!text) return null;
  
  const result: React.ReactNode[] = [];
  let remaining = text;
  let keyIndex = 0;
  
  while (remaining.length > 0) {
    // Find ** that's actually a valid opening (not "** " at end)
    const openIndex = remaining.indexOf('**');
    
    if (openIndex === -1) {
      // No more markers, add remaining text
      if (remaining) result.push(<span key={keyIndex++}>{remaining}</span>);
      break;
    }
    
    // Add text before the marker
    if (openIndex > 0) {
      result.push(<span key={keyIndex++}>{remaining.slice(0, openIndex)}</span>);
    }
    
    // Look for closing ** after the opening
    const afterOpen = remaining.slice(openIndex + 2);
    
    // Skip if nothing after or starts with space (like "** text")
    if (!afterOpen || afterOpen.startsWith(' ')) {
      result.push(<span key={keyIndex++}>**</span>);
      remaining = afterOpen;
      continue;
    }
    
    const closeIndex = afterOpen.indexOf('**');
    
    if (closeIndex === -1 || closeIndex === 0) {
      // No closing marker or empty bold, treat ** as regular text
      result.push(<span key={keyIndex++}>**</span>);
      remaining = afterOpen;
      continue;
    }
    
    // Extract the bold content
    const boldContent = afterOpen.slice(0, closeIndex);
    
    // Skip if bold content ends with space and next is ** (like "text **")
    if (boldContent.endsWith(' ')) {
      result.push(<span key={keyIndex++}>**{boldContent}**</span>);
      remaining = afterOpen.slice(closeIndex + 2);
      continue;
    }
    
    result.push(
      <strong key={keyIndex++} className="text-green-300 font-semibold">
        {boldContent}
      </strong>
    );
    
    // Continue with the rest
    remaining = afterOpen.slice(closeIndex + 2);
  }
  
  if (result.length === 0) return null;
  return result.length === 1 ? result[0] : <>{result}</>;
}

function TerminalDemo ({ data }: { data: TerminalInterface }) {
  if (!data) return null;

  return (
    <Terminal className="bg-black text-2xl">
      <TypingAnimation className="text-green-900">&gt; loading knowledge module...</TypingAnimation>

      <div className="mt-4 space-y-3">
        <AnimatedSpan delay={800} className="text-green-300 font-bold text-2xl block">
          📚 {data.headding[0]}
        </AnimatedSpan>

        {data.tags && data.tags.length > 0 && (
          <AnimatedSpan delay={1200} className="flex flex-wrap gap-1">
            {data.tags.slice(0, 4).map((tag, i) => (
              <span key={i} className="px-2 py-0.5 bg-cyan-900/50 text-cyan-200 text-xs rounded-full border border-cyan-700/50 uppercase">
                {tag}
              </span>
            ))}
          </AnimatedSpan>
        )}

        <AnimatedSpan delay={1500} className="text-white block mt-3 leading-relaxed">
          {formatBoldText(data.description)}
        </AnimatedSpan>
        
        {data.content && (
          <AnimatedSpan delay={2000} className="text-gray-300 block mt-2 text-sm leading-relaxed border-l-2 border-green-500 pl-3">
            {formatContentText(data.content.slice(0, 800))}
            {data.content.length > 800 && <span className="text-gray-400">...</span>}
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
                    ? 'bg-sky-900/80 text-sky-100 border border-sky-500 hover:bg-sky-800' 
                    : 'bg-violet-900/80 text-violet-100 border border-violet-500 hover:bg-violet-800'
                }`}
              >
                {action.type === 'navigate_map' ? '🗺️ ' : '📖 '}
                {action.label}
              </Link>
            ))}
          </AnimatedSpan>
        )}
      </div>

      <TypingAnimation delay={3000} className="text-green-400 mt-4">
        ✓ Knowledge loaded successfully.
      </TypingAnimation>
    </Terminal>
  )
}
export default TerminalDemo
