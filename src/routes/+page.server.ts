import type { PageServerLoad } from './$types';
import { todoService } from '$lib/services';
import type { Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const user_id = locals.user?.id;
	if (!user_id) {
		throw new Error('User not found');
	}
	return {
		todos: await todoService.getAllTodos(user_id)
	};
};

export const actions = {
	default: async ({ request, locals }) => {
		const user_id = locals.user?.id;
		const data = await request.formData();
		todoService.addTodo(data.get('title'), user_id);
	}
};
