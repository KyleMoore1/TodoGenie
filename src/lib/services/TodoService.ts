import type { ITodoRepository } from '$lib/repositories/TodoRepository';
import type { Todo } from '$lib/todo/Todo';

export class TodoService {
	private readonly _repository: ITodoRepository;
	constructor(repository: ITodoRepository) {
		this._repository = repository;
	}

	public addTodo(title: string): Promise<boolean> {
		const newTodo: Omit<Todo, 'id'> = {
			title: title,
			completed: false
		};
		return this._repository.create(newTodo);
	}

	public getAllTodos(): Promise<Todo[]> {
		return this._repository.findAll();
	}
}
