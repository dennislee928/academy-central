'use client';

import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

type Props = { code: string };

export default function MermaidBlock({ code }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !code.trim()) return;
    const el = containerRef.current;
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'loose',
      theme: 'dark',
    });
    el.className = 'mermaid';
    el.textContent = code;
    mermaid.run({ nodes: [el] }).catch((err) => {
      console.warn('Mermaid render error:', err);
      el.className = '';
      el.innerHTML = `<pre class="text-sm text-red-400/90 overflow-x-auto">${err.message ?? String(err)}</pre>`;
    });
  }, [code]);

  return (
    <div
      ref={containerRef}
      className="my-6 flex justify-center [&_svg]:max-w-full"
      data-mermaid-block
    />
  );
}
