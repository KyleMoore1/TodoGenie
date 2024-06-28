import type { ITodoRepository } from '$lib/app/todo/data-access/todo-repository';
import { Todo, type CreateTodoProps } from '$lib/app/todo/domain/todo';

export class TodoService {
	private readonly _repository: ITodoRepository;
	constructor(repository: ITodoRepository) {
		this._repository = repository;
	}

	public addTodo(title: string, user_id: string): Promise<boolean> {
		const props: CreateTodoProps = { user_id, title };
		const newTodo = Todo.create(props);
		return this._repository.save(newTodo);
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
		todo.complete();
		return this._repository.update(todo);
	}

	public async unCompleteTodo(id: string): Promise<boolean> {
		const todo: Todo = await this._repository.findById(id);
		todo.uncomplete();
		return this._repository.update(todo);
	}
}
