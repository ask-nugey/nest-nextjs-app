import createClient from "openapi-fetch";

import type { paths } from "./schema.gen";

// MEMO: cors + includeじゃないとset-cookieされない
export const api = createClient<paths>({
	baseUrl: process.env.NEXT_PUBLIC_API_URL,
	mode: "cors",
	credentials: "include",
});
