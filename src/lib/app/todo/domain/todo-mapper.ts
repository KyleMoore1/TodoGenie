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
				completed: record.completed
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
			completed: copy.completed
		};
		return record;
	}
}
