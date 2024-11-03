import Navbar from "@/components/navigation/navbar";
import { Tool } from "@/types/tools";

interface NavbarWrapperProps {
  enabledTool: Tool;
  setEnabledTool: (tool: Tool | null) => void;
}

export default function NavbarWrapper({
  enabledTool,
  setEnabledTool,
}: NavbarWrapperProps) {
  return (
    <nav className="fixed bottom-6 border left-1/2 -translate-x-1/2 flex items-center space-x-3 rounded-full bg-white/80 p-2 shadow-lg drop-shadow-lg backdrop-blur-sm z-[5000]">
      <Navbar enabledTool={enabledTool} setEnabledTool={setEnabledTool} />
    </nav>
  );
}
