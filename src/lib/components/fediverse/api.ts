import { PUBLIC_FEDIVERSE_HOST } from '$env/static/public';
import * as v from 'valibot';

type ValibotSchema = v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>;

export async function fediverseRequest<Schema extends ValibotSchema>({
	url,
	body,
	schema
}: {
	url: `/${string}`;
	body: Record<string, unknown>;
	schema: Schema;
}) {
	const response = await fetch(`${PUBLIC_FEDIVERSE_HOST}${url}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	});

	const json: unknown = await response.json();
	return v.parse(schema, json);
}
