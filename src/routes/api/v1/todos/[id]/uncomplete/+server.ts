import type { RequestHandler } from './$types';
import { todoService } from '$lib/app/todo';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ params }) => {
	const id = params.id;
	await todoService.unCompleteTodo(id);
	return json({ message: 'Todo unCompleted' });
};
