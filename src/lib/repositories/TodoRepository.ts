import type { Todo } from '$lib/todo/Todo';

export interface ITodoRepository {
	findAll(user_id: string): Promise<Todo[]>;
	findById(id: string): Promise<Todo>;
	create(todo: Omit<Todo, 'id'>): Promise<boolean>;
	update(todo: Todo): Promise<boolean>;
	delete(id: string): Promise<boolean>;
}

export class InMemoryTodoRepository implements ITodoRepository {
	private todos: Todo[] = [];

	async findAll(user_id: string): Promise<Todo[]> {
		return this.todos.filter((todo) => todo.user_id === user_id);
	}

	async findById(id: string): Promise<Todo> {
		const todo = this.todos.find((todo) => todo.id === id);
		if (!todo) {
			throw new Error(`Todo with id ${id} not found`);
		}
		return todo;
	}

	async create(todo: Omit<Todo, 'id'>): Promise<boolean> {
		const newTodo: Todo = {
			id: this.generateId(),
			...todo
		};
		this.todos.push(newTodo);
		return true;
	}

	async update(todo: Todo): Promise<boolean> {
		const index = this.todos.findIndex((t) => t.id === todo.id);
		if (index === -1) {
			throw new Error(`Todo with id ${todo.id} not found`);
		}
		this.todos[index] = todo;
		return true;
	}

	async delete(id: string): Promise<boolean> {
		const index = this.todos.findIndex((todo) => todo.id === id);
		if (index === -1) {
			throw new Error(`Todo with id ${id} not found`);
		}
		this.todos.splice(index, 1);
		return true;
	}

	private generateId(): string {
		return Math.random().toString(36).substr(2, 9);
	}
}
