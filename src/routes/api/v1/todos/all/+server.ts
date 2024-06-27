import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { todoService } from '$lib/app/todo';

export const GET: RequestHandler = async ({ locals }) => {
	const user_id = locals.user?.id;
	if (!user_id) {
		throw new Error('No User found');
	}
	const todos = await todoService.getAllTodos(user_id);
	return json(todos);
};
