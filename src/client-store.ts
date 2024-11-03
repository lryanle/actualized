import { atom } from "jotai";
import { uiGeneratorRequestSchema } from "./validators";
import { z } from "zod";

export const uiGeneratorRequestAtom = atom<z.infer<typeof uiGeneratorRequestSchema> | null>(null);
