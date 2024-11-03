import { z } from "zod";

export const uiGeneratorRequestSchema = z.object({
	stateMachine: z.string(),
	chatMessages: z.array(
		z.object({
			role: z.enum(["system", "user", "assistant", "function", "data", "tool"]),
			content: z.string(),
			experimental_attachments: z.array(
				z.object({
					url: z.string(),
				})
			),
		})
	),
});