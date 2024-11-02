"use client";
import { useEffect, useLayoutEffect, useRef } from "react";
import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";

export default function DrawSection() {
  const drawRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (drawRef.current) {
      const watermarkEl = drawRef.current.getElementsByClassName(
        "tl-watermark_SEE-LICENSE"
      )[0];
      watermarkEl?.parentNode?.removeChild(watermarkEl);
    }
  }, [drawRef]);

  return (
    <div ref={drawRef} className="bg-black w-3/4 h-3/4">
      <Tldraw />
    </div>
  );
}
