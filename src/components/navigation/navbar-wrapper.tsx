import Navbar from "@/components/navigation/navbar";
import { createClient } from "@/lib/supabase/server";
import { Tool } from "@/types/tools";

interface NavbarWrapperProps {
  enabledTool: Tool;
  setEnabledTool: (tool: Tool | null) => void;
  onPromptSubmit: (newPrompt: string) => void;
}

export default async function NavbarWrapper({
  enabledTool,
  setEnabledTool,
  onPromptSubmit,
}: NavbarWrapperProps) {
  const supabase = await createClient();
  // const {
  //   data: { user },
  //   error,
  // } = await supabase.auth.getUser();

  return (
    <nav className="fixed bottom-6 border left-1/2 -translate-x-1/2 flex items-center space-x-3 rounded-full bg-white/80 p-2 shadow-lg drop-shadow-lg backdrop-blur-sm z-[5000]">
      <Navbar
        enabledTool={enabledTool}
        setEnabledTool={setEnabledTool}
        onPromptSubmit={onPromptSubmit}
        // user={user}
      />
    </nav>
  );
}
