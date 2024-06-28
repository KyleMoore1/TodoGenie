import { Todo } from './todo';
import type { TodoModel } from '$lib/app/todo/data-access/todo-repository';
import type { Mapper } from '$lib/app/core/mapper';

export class TodoMapper implements Mapper<Todo, TodoModel> {
	toDomain(record: TodoModel): Todo {
		const entity = new Todo({
			id: record.id,
			created_at: new Date(record.created_at),
			updated_at: new Date(record.updated_at),
			props: {
				user_id: record.user_id,
				title: record.title,
				content: record.content ? record.content : undefined,
				completed: record.completed,
				completed_at: record.completed_at ? new Date(record.completed_at) : undefined,
				project_id: record.project_id ? record.project_id : undefined,
				due_date: record.due_date ? new Date(record.due_date) : undefined,
				priority: record.todo_priority ? record.todo_priority : undefined
			}
		});
		return entity;
	}
	toPersistence(entity: Todo): TodoModel {
		const copy = entity.getProps();
		const record: TodoModel = {
			id: copy.id,
			created_at: copy.created_at,
			updated_at: copy.updated_at,
			user_id: copy.user_id,
			title: copy.title,
			content: copy.content ? copy.content : null,
			completed: copy.completed,
			completed_at: copy.completed_at ? copy.completed_at : null,
			project_id: copy.project_id ? copy.project_id : null,
			due_date: copy.due_date ? copy.due_date : null,
			todo_priority: copy.priority ? copy.priority : null
		};
		return record;
	}
}
