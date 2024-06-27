import type { RequestHandler } from './$types';
import { todoService } from '$lib/app/todo';
import { json } from '@sveltejs/kit';

export const DELETE: RequestHandler = async ({ params }) => {
	const id = params.id;
	await todoService.deleteTodo(id);
	return json({ message: 'Todo deleted' });
};
