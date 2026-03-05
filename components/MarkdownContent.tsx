'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import MermaidBlock from './MermaidBlock';
import NothingQuote from './ui/NothingQuote';

export default function MarkdownContent({ content }: { content: string }) {
  return (
    <article className="prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          blockquote({ children }) {
            return <NothingQuote>{children}</NothingQuote>;
          },
          code({ node, className, children, ...props }) {
            const rawClass = Array.isArray(className) ? className.join(' ') : (className ?? '');
            const match = /language-(\w+)/.exec(String(rawClass));
            const value = String(children).replace(/\n$/, '');
            const isMermaidByLang = match?.[1] === 'mermaid';
            const isMermaidByContent = /^\s*(flowchart|mindmap|graph|sequenceDiagram|erDiagram)\s/mi.test(value);
            if (isMermaidByLang || isMermaidByContent) {
              return <MermaidBlock code={value} />;
            }
            return (
              <code className={rawClass} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
