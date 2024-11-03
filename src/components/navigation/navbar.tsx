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

export default function Navbar() {
  const profile = {
    name: "Ryan Lahlou",
    role: "Pro",
    avatar: "https://github.com/lryanle.png",
  };

  return (
    <>
      <div className="flex items-center space-x-1">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 flex flex-col items-center justify-center gap-0 rounded-full"
            >
              <PencilRuler className="scale-125" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2" align="start" sideOffset={12}>
            <div className="flex flex-col items-center justify-center">
              <span className="text-sm font-semibold leading-none w-full text-center mb-2">
                Canvas Tools
              </span>
            </div>
            <Separator orientation="horizontal" className="w-full mb-2" />
            <div className="grid grid-cols-3 gap-2">
              {/* <div className="flex justify-center items-center gap-2 w-full"> */}
                <Button variant="outline" size="icon" className="rounded-full">
                  <Square className="scale-125" />
                </Button>
                {/* <span className="text-sm font-semibold leading-none">Rectangle</span> */}
              {/* </div> */}
              <Button variant="outline" size="icon" className="rounded-full">
                <Brush className="scale-125" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Type className="scale-125" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <MoveRight className="scale-125" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <MousePointer2 className="scale-125" />
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full"
            >
              <Network className="scale-125" />
              <span className="sr-only">Toolset 1</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2" align="center" sideOffset={12}>
            <div className="flex flex-col items-center justify-center">
              <span className="text-sm font-semibold leading-none w-full text-center mb-2">
                Editor Tools
              </span>
            </div>
            <Separator orientation="horizontal" className="w-full mb-2" />
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" className="rounded-full">
                <Circle className="scale-125" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <ArrowRight className="scale-125" />
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <Separator orientation="vertical" className="h-10" />

      <div className="flex items-center justify-center">
        <Input
          placeholder="Enter a prompt"
          className="h-10 w-[200px] rounded-full rounded-r-none"
        />
        <Button size="icon" type="submit" className="h-10 w-10 rounded-full rounded-l-none pr-1">
          <Send size={64} className="scale-125" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-10" />

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
