"use client";

import * as React from "react";
import {
  Network,
  Circle,
  ArrowRight,
  Square,
  MousePointer2,
  Send,
  Brush,
  Type,
  PencilRuler,
  MoveRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { getInitials } from "@/lib/utils";
import {
  Tool,
  CanvasTool,
  EditorTool,
  canvasTools,
  editorTools,
} from "@/types/tools";
import { useAtom } from "jotai";
import { protoStateStore } from "@/client-store";
import { signOut } from "@/lib/actions";
import { createClient } from "@/lib/supabase/server";
import { User } from "@supabase/supabase-js";

const toolIcons: Record<Tool, React.ReactNode> = {
  select: <MousePointer2 className="scale-125" />,
  draw: <Brush className="scale-125" />,
  text: <Type className="scale-125" />,
  geo: <Square className="scale-125" />,
  arrow: <MoveRight className="scale-125" />,
  logicBlock: <Square className="scale-125" />,
  logicConnector: <ArrowRight className="scale-125" />,
};

type NavbarProps = {
  className?: string;
  enabledTool: Tool | null;
  setEnabledTool: (tool: Tool | null) => void;
  onPromptSubmit: (newPrompt: string) => void;
};

export default function Navbar({
  className,
  enabledTool,
  setEnabledTool,
  onPromptSubmit,
}: NavbarProps) {
  const profile = {
    name: "Ryan Lahlou",
    role: "Pro",
    avatar: "https://github.com/lryanle.png",
  };

  const [protoState, setProtoState] = useAtom(protoStateStore);
  const [prompt, setPrompt] = React.useState("");

  return (
    <>
      <div className={`flex items-center space-x-1`}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`h-10 w-10 flex flex-col items-center justify-center gap-0 rounded-full ${
                enabledTool && canvasTools.includes(enabledTool as CanvasTool)
                  ? "bg-blue-600 text-white hover:bg-blue-700 hover:text-white"
                  : ""
              }`}
            >
              {enabledTool &&
              canvasTools.includes(enabledTool as CanvasTool) ? (
                toolIcons[enabledTool]
              ) : (
                <PencilRuler className="scale-125" />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2" align="start" sideOffset={12}>
            <div className="flex flex-col items-center justify-center">
              <span className="text-sm font-semibold leading-none w-full text-center mb-2">
                Canvas Tools
              </span>
            </div>
            <Separator orientation="horizontal" className="w-full mb-2" />
            <div className="grid grid-cols-1 gap-2">
              <Button
                variant="outline"
                size="icon"
                className={`rounded-full w-full px-4 ${
                  enabledTool === "select"
                    ? "bg-blue-600 text-white hover:bg-blue-700 hover:text-white"
                    : ""
                }`}
                onClick={() => setEnabledTool("select")}
              >
                <MousePointer2 className="scale-125" />
                Cursor
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={`rounded-full w-full px-4 ${
                  enabledTool === "draw"
                    ? "bg-blue-600 text-white hover:bg-blue-700 hover:text-white"
                    : ""
                }`}
                onClick={() => {
                  enabledTool !== "draw"
                    ? setEnabledTool("draw")
                    : setEnabledTool("select");
                }}
              >
                <Brush className="scale-125" />
                Marker
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={`rounded-full w-full px-4 ${
                  enabledTool === "text"
                    ? "bg-blue-600 text-white hover:bg-blue-700 hover:text-white"
                    : ""
                }`}
                onClick={() => {
                  enabledTool !== "text"
                    ? setEnabledTool("text")
                    : setEnabledTool("select");
                }}
              >
                <Type className="scale-125" />
                Text
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={`rounded-full w-full px-4 ${
                  enabledTool === "geo"
                    ? "bg-blue-600 text-white hover:bg-blue-700 hover:text-white"
                    : ""
                }`}
                onClick={() => {
                  enabledTool !== "geo"
                    ? setEnabledTool("geo")
                    : setEnabledTool("select");
                }}
              >
                <Square className="scale-125" />
                Rectangle
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={`rounded-full w-full px-4 ${
                  enabledTool === "arrow"
                    ? "bg-blue-600 text-white hover:bg-blue-700 hover:text-white"
                    : ""
                }`}
                onClick={() => {
                  enabledTool !== "arrow"
                    ? setEnabledTool("arrow")
                    : setEnabledTool("select");
                }}
              >
                <MoveRight className="scale-125" />
                Arrow
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`h-10 w-10 rounded-full ${
                enabledTool && editorTools.includes(enabledTool as EditorTool)
                  ? "bg-blue-600 text-white hover:bg-blue-700 hover:text-white"
                  : ""
              }`}
            >
              {enabledTool &&
              editorTools.includes(enabledTool as EditorTool) ? (
                toolIcons[enabledTool]
              ) : (
                <Network className="scale-125" />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2" align="center" sideOffset={12}>
            <div className="flex flex-col items-center justify-center">
              <span className="text-sm font-semibold leading-none w-full text-center mb-2">
                Editor Tools
              </span>
            </div>
            <Separator orientation="horizontal" className="w-full mb-2" />
            <div className="grid grid-cols-1 gap-2">
              <Button
                variant="outline"
                size="icon"
                className={`rounded-full w-full px-4 ${
                  enabledTool === "logicBlock"
                    ? "bg-blue-600 text-white hover:bg-blue-700 hover:text-white"
                    : ""
                }`}
                onClick={() => {
                  enabledTool !== "logicBlock"
                    ? setEnabledTool("logicBlock")
                    : setEnabledTool(null);
                }}
              >
                <Square className="scale-125" />
                Logic Block
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={`rounded-full w-full px-4 ${
                  enabledTool === "logicConnector"
                    ? "bg-blue-600 text-white hover:bg-blue-700 hover:text-white"
                    : ""
                }`}
                onClick={() => {
                  enabledTool !== "logicConnector"
                    ? setEnabledTool("logicConnector")
                    : setEnabledTool(null);
                }}
              >
                <ArrowRight className="scale-125" />
                Logic Connector
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <Separator orientation="vertical" className="h-10" />

      <div className="flex items-center justify-center">
        <Input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={
            protoState.chatMessages.length > 0
              ? "What's next?"
              : "What can we help you build today?"
          }
          className="h-10 w-96 rounded-full rounded-r-none"
        />
        <Button
          size="icon"
          onClick={() => {
            onPromptSubmit(prompt);
            setPrompt("");
          }}
          className="h-10 w-10 rounded-full rounded-l-none pr-1 bg-blue-600 text-white"
        >
          <Send size={64} className="scale-125" />
        </Button>
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full drop-shadow"
          >
            <Avatar className="h-10 w-10 border">
              <AvatarImage src={profile.avatar} />
              <AvatarFallback>{getInitials(profile.name)}</AvatarFallback>
            </Avatar>
          </Button>
        </PopoverTrigger>
        <PopoverContent align="center" className="w-auto" sideOffset={12}>
          <div className="flex justify-center items-center space-x-4">
            <Avatar>
              <AvatarImage src={profile.avatar} />
              <AvatarFallback>{getInitials(profile.name)}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">{profile.name}</h4>
              <Badge className="bg-blue-500 hover:bg-blue-600">
                {profile.role}
              </Badge>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
