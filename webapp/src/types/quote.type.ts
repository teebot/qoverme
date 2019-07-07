import { QuoteParams } from "./quote-params.type";

export type Quote = QuoteParams & { id: number; plan: string };
