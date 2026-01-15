import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/ui/terminal"

interface Source {
  name: string,
  publicationName: string
}

interface TerminalInterface {
    type: string,
    headding:  string[],
    author: string,
    soruce: Source,
    description:string,
    url: string,
    imageURL:string,
    publishAT: string,
    content: string
}

function TerminalDemo ({ data }: { data: TerminalInterface }) {
  if (!data) return null;

  return (
    <Terminal>
      <TypingAnimation>&gt; initializing news module...</TypingAnimation>

      <div className="mt-4 space-y-2">
        <AnimatedSpan delay={1000} className="text-green-500 font-bold text-xl block">
          ➜ {data.headding[0]}
        </AnimatedSpan>

        <AnimatedSpan delay={1500} className="text-cyan-400 block">
          Author: {data.author}
        </AnimatedSpan>
        
        <AnimatedSpan delay={1500} className="text-cyan-400 block">
          Source: {data.soruce?.name} ({data.soruce?.publicationName})
        </AnimatedSpan>

        <AnimatedSpan delay={2000} className="text-gray-300 block mt-2">
          {data.description}
        </AnimatedSpan>
        
        <AnimatedSpan delay={2500} className="text-blue-400 block mt-2 underline">
           {data.url}
        </AnimatedSpan>
      </div>

      <TypingAnimation delay={3000} className="text-muted-foreground mt-4">
        Success! Data loaded.
      </TypingAnimation>
    </Terminal>
  )
}
export default TerminalDemo
