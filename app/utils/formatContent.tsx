import React from 'react';

/**
 * Parses markdown-like text and returns styled React elements
 * - Converts **text** to bold
 * - Converts starting "-" to bullet points "•"
 */
export function formatContent(text: string): React.ReactNode[] {
  if (!text) return [];

  // Split by newlines or ". -" patterns to get individual points
  const lines = text.split(/(?:\. -)|\n/).map(line => line.trim()).filter(Boolean);
  
  return lines.map((line, index) => {
    // Remove leading dash if present
    let cleanLine = line.replace(/^-\s*/, '');
    
    // Parse bold text (**text**)
    const parts = cleanLine.split(/(\*\*[^*]+\*\*)/g);
    
    const formattedParts = parts.map((part, partIndex) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        // Remove ** and make bold
        const boldText = part.slice(2, -2);
        return <strong key={partIndex} className="font-semibold">{boldText}</strong>;
      }
      return <span key={partIndex}>{part}</span>;
    });

    return (
      <div key={index} className="flex gap-2 items-start mb-1">
        <span className="text-current opacity-60 mt-0.5">•</span>
        <span>{formattedParts}</span>
      </div>
    );
  });
}

/**
 * React component for formatted content display
 */
interface FormattedTextProps {
  content: string;
  className?: string;
}

export const FormattedText: React.FC<FormattedTextProps> = ({ content, className = '' }) => {
  return (
    <div className={`space-y-1 ${className}`}>
      {formatContent(content)}
    </div>
  );
};

/**
 * Inline formatter for simple bold text (no bullet points)
 */
export function formatInline(text: string): React.ReactNode[] {
  if (!text) return [];
  
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const boldText = part.slice(2, -2);
      return <strong key={index} className="font-semibold">{boldText}</strong>;
    }
    return <span key={index}>{part}</span>;
  });
}

export default FormattedText;
