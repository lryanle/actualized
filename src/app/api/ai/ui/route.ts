import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { SYSTEM_PROMPT } from "@/prompt";
// import { Attachment } from "@ai-sdk/ui-utils";
import { z } from "zod";
import { uiGeneratorRequestSchema } from "@/validators";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

type ReqBody = z.infer<typeof uiGeneratorRequestSchema>;

export async function POST(req: Request) {
	const body: ReqBody = await req.json();

	const data = uiGeneratorRequestSchema.safeParse(body);

	if (!data.success) {
		return new Response("Invalid request body", { status: 400 });
	}

	// Note: you can pull the stateMachine here
	const { chatMessages } = data.data;

	const result = await streamText({
		model: openai("gpt-4o"),
		messages: [
			{
				role: "system",
				content: SYSTEM_PROMPT,
			},
			...chatMessages,
		],
	});

	return result.toDataStreamResponse();
}
