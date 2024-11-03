"use client";

import SandpackReact from "@/components/sandpack/SandpackReact";
import { useEffect, useState } from "react";
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from "@/components/ui/resizable";
import { Tldraw, useEditor, exportToBlob } from "tldraw";
import "tldraw/tldraw.css";
import NavbarWrapper from "@/components/navigation/navbar";
import { Tool, canvasTools, editorTools, CanvasTool, EditorTool } from "@/types/tools";
import { Editor, useValue } from "tldraw";
import LogicEditor from "@/components/logiceditor/logiceditor";
import { useAtom, getDefaultStore } from "jotai";
import { protoStateStore, type ProtoState } from "@/client-store";
import { useCompletion } from "ai/react";
import { useDebounce } from "@uidotdev/usehooks";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Node, Edge, MarkerType, useNodesState, useEdgesState } from "@xyflow/react";

const initialNodes: Node[] = [
	{ id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
	{ id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];

const initialEdges: Edge[] = [
	{
		id: "e1-2",
		source: "1",
		target: "2",
		markerEnd: { type: MarkerType.ArrowClosed, width: 24, height: 24 },
		animated: true,
		style: { stroke: "#71717a", strokeWidth: 2 },
		label: "Edge Label",
		type: "custom",
		data: { label: "" },
	},
];

export default function ClientPage() {
	const [editor, setEditor] = useState<Editor | null>(null);
	const [enabledTool, setEnabledTool] = useState<Tool | null>(null);
	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
	const [processedLogic, setProcessedLogic] = useState<string[]>([]);

	useEffect(() => {
		const logic = nodes
			.map((node) => {
				const connectedEdges = edges.filter((edge) => edge.source === node.id);
				return connectedEdges.map((edge) => {
					const targetNode = nodes.find((n) => n.id === edge.target);
					return `${node.data.label} -- ${edge?.data?.label} --> ${targetNode?.data.label}`;
				});
			})
			.flat();

		setProcessedLogic(logic);
		console.log(logic);
	}, [nodes, edges]);

	const [protoState, setProtoState] = useAtom(protoStateStore);

	const {
		complete: requestCompletion,
		completion,
		isLoading,
	} = useCompletion({
		api: "/api/ai/ui",
		onFinish: (_, finishedCompletion) => {
			setProtoState((draftState) => {
				draftState.chatMessages.push({
					role: "assistant",
					content: finishedCompletion,
					experimental_attachments: [],
				});
				return draftState;
			});
		},
	});

	useEffect(() => {
		if (completion && completion.length > 0) {
			console.log("[Completion UserEffect] completion update or did mount: ");
			console.log(completion);
			setProtoState((prevState) => {
				prevState.currentCode = completion;
				console.log("State Updated!");
				return prevState;
			});
			console.log("state post update: ");
			console.log(protoState);
		}
	}, [completion]);

	useEffect(() => {
		if (editor && enabledTool && !editorTools.includes(enabledTool as EditorTool)) {
			editor?.setCurrentTool(enabledTool ?? "select");
		}
	}, [enabledTool, editor]);

	async function newMessageSent(enteredPrompt: string) {
		if (!enteredPrompt || enteredPrompt.length <= 0) {
			alert("Please enter some text :)");
			return;
		}

		const imageb64 = await getb64editor();

		const images = imageb64 ? [{ url: imageb64, contentType: "image/png" }] : [];

		setProtoState((draftState) => {
			draftState.chatMessages.push({
				role: "user",
				content: enteredPrompt,
				experimental_attachments: images,
			});

			requestCompletion("", {
				body: {
					chatMessages: draftState.chatMessages,
					currentCode: draftState.currentCode,
					stateMachine: draftState.stateMachine,
				} satisfies ProtoState,
			});

			return draftState;
		});
	}

	async function blobToBase64(blob: Blob): Promise<string> {
		const reader = new FileReader();
		return new Promise((resolve, reject) => {
			reader.onloadend = () => {
				const result = reader.result as string; // Type assertion to string
				resolve(result.split(",")[1]);
			};
			reader.onerror = () => reject(new Error("Failed to convert Blob to Base64"));
			reader.readAsDataURL(blob);
		});
	}

	async function getb64editor() {
		if (!editor) {
			return null;
		}

		const shapeIDs = editor.getCurrentPageShapeIds();
		if (shapeIDs.size === 0) {
			return null;
		}

		const blob = await exportToBlob({
			editor,
			ids: [...shapeIDs],
			format: "png",
			opts: { background: false },
		});

		return "data:image/png;base64," + (await blobToBase64(blob));
	}

	const debouncedGeneratedCode = useDebounce(protoState.currentCode, 1000);

	return (
		<>
			<div className="fixed bottom-6 border left-1/2 -translate-x-1/2 flex items-center space-x-3 rounded-full bg-white/80 p-2 shadow-lg drop-shadow-lg backdrop-blur-sm z-[5000]">
				<NavbarWrapper
					onPromptSubmit={newMessageSent}
					enabledTool={enabledTool}
					setEnabledTool={setEnabledTool}
				/>
			</div>
			<div className="flex justify-center items-center min-h-screen gap-16 w-screen h-[calc(100vh-100rem)]">
				<main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full h-full justify-center">
					<ResizablePanelGroup
						direction="horizontal"
						className="w-full rounded-lg md:min-w-[450px]"
					>
						<ResizablePanel defaultSize={50}>
							<ResizablePanelGroup direction="vertical">
								<ResizablePanel
									defaultSize={50}
									className={`m-4 rounded-xl border ${
										enabledTool
											? canvasTools.includes(enabledTool as CanvasTool)
												? "border-blue-600 border-opacity-20"
												: "border-red-400 border-opacity-20 cursor-not-allowed"
											: ""
									}`}
								>
									<label className="relative ml-6 text-muted-foreground font-bold text-sm leading-none top-1">
										Canvas Editor
									</label>
									<div className="flex h-[calc(100%-1.5rem)] items-center justify-center p-6 pt-2">
										<span className="font-semibold w-full h-full">
											<Tldraw
												// [2]
												hideUi
												onMount={(editor) => setEditor(editor)}
												components={{ Toolbar: null }}
											/>
										</span>
									</div>
								</ResizablePanel>
								<ResizableHandle />
								<ResizablePanel
									defaultSize={50}
									className={`m-4 rounded-xl border ${
										enabledTool
											? editorTools.includes(enabledTool as EditorTool)
												? "border-blue-600 border-opacity-20"
												: "border-red-400 border-opacity-20 cursor-not-allowed"
											: ""
									}`}
								>
									<label className="relative ml-6 text-muted-foreground font-bold text-sm leading-none top-1">
										Logic Editor
									</label>
									<div className="flex h-[calc(100%-1.5rem)] items-center justify-center p-2">
										<LogicEditor
											enabledTool={enabledTool}
											nodes={nodes}
											setNodes={setNodes}
											onNodesChange={onNodesChange}
											edges={edges}
											setEdges={setEdges}
											onEdgesChange={onEdgesChange}
										/>
									</div>
								</ResizablePanel>
							</ResizablePanelGroup>
						</ResizablePanel>
						<ResizableHandle />
						<ResizablePanel
							defaultSize={50}
							className="w-full m-4 border rounded-xl h-[calc(100vh-2rem)]"
						>
							<div
								className={
									!isLoading
										? "flex items-center justify-center h-full w-full"
										: "hidden"
								}
							>
								<SandpackReact code={debouncedGeneratedCode ?? ""} />
							</div>
							<div
								className={
									isLoading
										? "flex items-center justify-center h-full w-full"
										: "hidden"
								}
							>
								<h1>Generating...</h1>
							</div>
						</ResizablePanel>
					</ResizablePanelGroup>
				</main>
			</div>
		</>
	);
}

const testcode = `export default function Example() {
    return (
    <div className="container mx-auto px-4 py-8 bg-zinc-100">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-500">Your Website Name</h1>
        <p className="text-lg text-gray-600">Your website tagline here</p>
      </header>

      <main>
        <section className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4">About Us</h2>
          <p>Write a brief introduction about your company or project.</p>
        </section>

        <section className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4">Services</h2>
          <ul>
            <li className="mb-2">Service 1</li>
            <li className="mb-2">Service 2</li>
            <li className="mb-2">Service 3</li>
          </ul>
        </section>

        <section className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>Provide contact information or a contact form.</p>
        </section>
      </main>

      <footer className="text-center mt-12 text-gray-500">
        &copy; {new Date().getFullYear()} Your Website Name
      </footer>
    </div>
  )
}`;
