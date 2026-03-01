'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import MermaidBlock from './MermaidBlock';

export default function MarkdownContent({ content }: { content: string }) {
  return (
    <article className="prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className ?? '');
            const value = String(children).replace(/\n$/, '');
            // 僅 fenced block 會有 language-* className，inline code 不會
            if (match?.[1] === 'mermaid') {
              return <MermaidBlock code={value} />;
            }
            return (
              <code className={className ?? ''} {...props}>
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
