'use client';

import { useEffect, useId, useRef } from 'react';
import mermaid from 'mermaid';

type Props = { code: string };

export default function MermaidBlock({ code }: Props) {
  const id = useId().replace(/:/g, '');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !code.trim()) return;
    const el = containerRef.current;
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'loose',
      theme: 'dark',
    });
    const uniqueId = `mermaid-${id}-${Math.random().toString(36).slice(2, 9)}`;
    mermaid
      .render(uniqueId, code)
      .then(({ svg }) => {
        el.innerHTML = svg;
      })
      .catch((err) => {
        const msg = err?.message ?? String(err);
        el.innerHTML = `<pre class="text-sm text-red-400/90 overflow-x-auto p-4">${msg}</pre>`;
      });
  }, [code, id]);

  return (
    <div
      ref={containerRef}
      className="my-6 flex justify-center [&_svg]:max-w-full [&_svg]:min-w-0"
      data-mermaid-block
    />
  );
}
