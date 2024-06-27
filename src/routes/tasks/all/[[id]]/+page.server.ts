import type { PageServerLoad } from './$types';
import { todoService } from '$lib/app/todo';

export const load: PageServerLoad = async ({ fetch }) => {
	const response = await fetch('/api/v1/todos/all');
	const todos = await response.json();
	return {
		todos: todos
	};
};

export const actions = {
	default: async ({ request, locals }) => {
		const user_id = locals.user?.id;
		const data = await request.formData();
		todoService.addTodo(data.get('title'), user_id);
	}
};
