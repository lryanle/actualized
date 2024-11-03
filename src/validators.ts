import { z } from "zod";

export const uiGeneratorRequestSchema = z.object({
	stateMachine: z.string().nullable(),
	currentCode: z.string().nullable(),
	chatMessages: z.array(
		z.object({
			role: z.enum(["system", "user", "assistant", "function", "data", "tool"]),
			content: z.string(),
			experimental_attachments: z.array(
				z.object({
					url: z.string(),
					contentType: z.string().optional(),
				})
			),
		})
	),
});
