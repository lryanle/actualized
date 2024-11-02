import DrawSection from "@/components/draw-section";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import Image from "next/image";

export default function Home() {
  return (
    <div className="w-screen h-screen">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <DrawSection />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>Two</ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
