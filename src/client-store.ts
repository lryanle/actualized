import { uiGeneratorRequestSchema } from "./validators";
import { z } from "zod";
import { atomWithImmer } from "jotai-immer";

export type ProtoState = z.infer<typeof uiGeneratorRequestSchema>;

export const protoStateStore = atomWithImmer<ProtoState>({
	stateMachine: null,
	currentCode: null,
	chatMessages: [],
});
