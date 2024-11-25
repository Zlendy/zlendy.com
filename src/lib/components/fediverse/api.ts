import { PUBLIC_FEDIVERSE_HOST } from '$env/static/public';
import * as v from 'valibot';

type ValibotSchema = v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>;

export async function fediverseRequest<Schema extends ValibotSchema>({
	method,
	url,
	body,
	schema
}: {
	method?: 'POST' | 'GET';
	url: `/${string}`;
	body?: Record<string, unknown>;
	schema: Schema;
}) {
	const response = await fetch(`${PUBLIC_FEDIVERSE_HOST}${url}`, {
		method: method || 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: body ? JSON.stringify(body) : null
	});

	const json: unknown = await response.json();
	return v.parse(schema, json);
}

export function fediverseProxy(url: string) {
	return `${PUBLIC_FEDIVERSE_HOST}/proxy/image.webp?url=${url}`;
}
