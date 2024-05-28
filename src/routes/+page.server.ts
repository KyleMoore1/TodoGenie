import type { PageServerLoad } from './$types';
import { todoService } from '$lib/services';
import type { Actions } from './$types';

export const load: PageServerLoad = async () => {
	return {
		todos: await todoService.getAllTodos()
	};
};

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		todoService.addTodo(data.get('title'));
	}
};
