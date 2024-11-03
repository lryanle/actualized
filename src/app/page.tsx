"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Sparkles, Image as ImageIcon, Send } from "lucide-react";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import Image from "next/image";
import Link from "next/link";

type Project = {
  title: string;
  description: string;
  image: string;
  author: string;
  date: string;
};

export default function Component() {
  const [file, setFile] = React.useState<File | null>(null);

  const projects: Project[] = [
    {
      title: "E-commerce Dashboard",
      description: "A modern dashboard with dark mode and analytics",
      image: "/placeholder.svg",
      author: "Sarah L.",
      date: "2024-02-15",
    },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen gap-16 w-screen h-[calc(100vh-100rem)]">
      <main className="flex flex-col gap-8 row-start-2 items-center w-full h-full justify-start">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-center">
          <div className="container flex h-14 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/logo.svg" alt="AIAIO" width={32} height={32} />
              <span className="text-2xl font-bold">AIAIO</span>
            </Link>
            <nav className="flex items-center space-x-4">
              <Button asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </nav>
          </div>
        </header>
        <main className="flex-1">
          <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
            <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
              <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
                Build amazing things with AIAIO.
              </h1>
              <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
                Upload your designs, diagram your logic, describe your vision, and watch as we
                convert your concepts to prototypes.
              </p>
            </div>
            <Card className="mx-auto w-full max-w-[800px]">
              <CardContent className="p-6">
                <div className="flex flex-col gap-4">
                  <Textarea
                    className="min-h-[100px] resize-none"
                    placeholder="Describe what you want to prototype..."
                  />
                  <div className="flex gap-4">
                    <div className="relative flex-1">
                      <Input
                        type="file"
                        className="hidden"
                        id="file-upload"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                      />
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() =>
                          document.getElementById("file-upload")?.click()
                        }
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        {file ? file.name : "Upload file"}
                      </Button>
                    </div>
                    <Button className="w-24">
                      <Send className="mr-2 h-4 w-4" />
                      Send
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
          <section className="container py-12">
            <h2 className="mb-8 text-2xl font-bold leading-tight tracking-tighter md:text-3xl">
              Featured Projects
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <Card key={index} className="overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="aspect-video object-cover"
                  />
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{project.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {project.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                      <span>{project.author}</span>
                      <span>{project.date}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </main>
        <footer className="border-t py-6">
          <div className="container flex flex-col items-center justify-between gap-4 md:h-14 md:flex-row">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Built at <Link href="https://devpost.com/software/aiaio" className="underline">HackTX 2024</Link>. By Carter, Josh, Liam, and Ryan (sorted lexically).
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
