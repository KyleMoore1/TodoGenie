import type { ITodoRepository } from '$lib/app/todo/data-access/todo-repository';
import { Todo, type CreateTodoProps, type TodoPriority } from '$lib/app/todo/domain/todo';

export class TodoService {
	private readonly _repository: ITodoRepository;
	constructor(repository: ITodoRepository) {
		this._repository = repository;
	}

	public async addTodo(title: string, user_id: string): Promise<string> {
		const props: CreateTodoProps = { user_id, title };
		const newTodo = Todo.create(props);
		await this._repository.save(newTodo);
		return newTodo.id;
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

	public async setTitle(id: string, title: string): Promise<boolean> {
		const todo: Todo = await this._repository.findById(id);
		todo.setTitle(title);
		return this._repository.update(todo);
	}

	public async setContent(id: string, content: string): Promise<boolean> {
		const todo: Todo = await this._repository.findById(id);
		todo.setContent(content);
		return this._repository.update(todo);
	}

	public async setDueDate(id: string, due_date: Date): Promise<boolean> {
		const todo: Todo = await this._repository.findById(id);
		todo.setDueDate(due_date);
		return this._repository.update(todo);
	}

	public async removeDueDate(id: string): Promise<boolean> {
		const todo: Todo = await this._repository.findById(id);
		todo.removeDueDate();
		return this._repository.update(todo);
	}

	public async setPriority(id: string, priority: TodoPriority): Promise<boolean> {
		const todo: Todo = await this._repository.findById(id);
		todo.setPriority(priority);
		return this._repository.update(todo);
	}

	public async removePriority(id: string): Promise<boolean> {
		const todo: Todo = await this._repository.findById(id);
		todo.removePriority();
		return this._repository.update(todo);
	}

	public async setProject(id: string, project_id: string): Promise<boolean> {
		const todo: Todo = await this._repository.findById(id);
		todo.setProject(project_id);
		return this._repository.update(todo);
	}

	public async removeProject(id: string): Promise<boolean> {
		const todo: Todo = await this._repository.findById(id);
		todo.removeProject();
		return this._repository.update(todo);
	}
}
