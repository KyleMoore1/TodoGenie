import type { ITodoRepository } from '$lib/repositories/TodoRepository';
import type { Todo } from '$lib/todo/Todo';

export class TodoService {
	private readonly _repository: ITodoRepository;
	constructor(repository: ITodoRepository) {
		this._repository = repository;
	}

	public addTodo(title: string, user_id: string): Promise<boolean> {
		const newTodo: Omit<Todo, 'id'> = {
			title: title,
			completed: false,
			user_id: user_id
		};
		return this._repository.create(newTodo);
	}

	public getAllTodos(user_id: string): Promise<Todo[]> {
		return this._repository.findAll(user_id);
	}

	public getTodo(id: string): Promise<Todo> {
		return this._repository.findById(id);
	}

	public updateTodo(todo: Todo): Promise<boolean> {
		return this._repository.update(todo);
	}

	public deleteTodo(id: string): Promise<boolean> {
		return this._repository.delete(id);
	}

	public async completeTodo(id: string): Promise<boolean> {
		const todo: Todo = await this._repository.findById(id);
		if (todo.completed) {
			return false;
		}
		todo.completed = true;
		return this._repository.update(todo);
	}

	public async unCompleteTodo(id: string): Promise<boolean> {
		const todo: Todo = await this._repository.findById(id);
		if (!todo.completed) {
			return false;
		}
		todo.completed = false;
		return this._repository.update(todo);
	}
}
