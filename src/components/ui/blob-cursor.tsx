
import React, { useEffect, useRef } from 'react';

export const BlobCursor = () => {
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const blob = blobRef.current;
    if (!blob) return;

    const handlePointerMove = (event: PointerEvent) => {
      const { clientX, clientY } = event;
      
      // Animate the blob to follow the cursor
      blob.animate(
        {
          left: `${clientX}px`,
          top: `${clientY}px`,
        },
        { duration: 3000, fill: "forwards" }
      );
    };

    window.addEventListener('pointermove', handlePointerMove);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return (
    <div
      ref={blobRef}
      className="fixed w-64 h-64 rounded-full bg-primary/30 blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2"
      style={{
        background: 'linear-gradient(to right, rgba(235, 89, 57, 0.3), rgba(214, 188, 250, 0.3))',
      }}
    />
  );
};
