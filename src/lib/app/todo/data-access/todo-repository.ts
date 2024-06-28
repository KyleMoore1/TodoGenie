import { pgTable, text, timestamp, uuid, boolean } from 'drizzle-orm/pg-core';
import { asc, between, count, eq, getTableColumns, sql } from 'drizzle-orm';
import { db } from '../../db';
import type { Todo } from '$lib/app/todo/domain/todo';
import { TodoMapper } from '../domain/todo-mapper';

export interface ITodoRepository {
	findAll(user_id: string): Promise<Todo[]>;
	findById(id: string): Promise<Todo>;
	save(todo: Omit<Todo, 'id'>): Promise<boolean>;
	update(todo: Todo): Promise<boolean>;
	delete(id: string): Promise<boolean>;
}

export class InMemoryTodoRepository implements ITodoRepository {
	private todos: Todo[] = [];

	async findAll(user_id: string): Promise<Todo[]> {
		return this.todos.filter((todo) => todo.props.user_id === user_id);
	}

	async findById(id: string): Promise<Todo> {
		const todo = this.todos.find((todo) => todo.id === id);
		if (!todo) {
			throw new Error(`Todo with id ${id} not found`);
		}
		return todo;
	}

	async save(todo: Todo): Promise<boolean> {
		this.todos.push(todo);
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
}

export const todos_table = pgTable('todos_table', {
	id: uuid('id').primaryKey(),
	created_at: timestamp('created_at').notNull(),
	updated_at: timestamp('updated_at').notNull(),
	user_id: uuid('user_id').notNull(),
	title: text('title').notNull(),
	completed: boolean('completed').notNull()
});

export type TodoModel = typeof todos_table.$inferSelect;

export class TodoRepository implements ITodoRepository {
	private mapper: TodoMapper = new TodoMapper();

	async findAll(user_id: string): Promise<Todo[]> {
		const todos: TodoModel[] = await db
			.select()
			.from(todos_table)
			.where(eq(todos_table.user_id, user_id));
		return todos.map((todo) => this.mapper.toDomain(todo));
	}

	async findById(id: string): Promise<Todo> {
		const result: TodoModel[] = await db
			.select()
			.from(todos_table)
			.where(eq(todos_table.id, id))
			.limit(1);

		if (!result.length) {
			throw new Error(`Todo with id ${id} not found`);
		}

		return this.mapper.toDomain(result[0]);
	}

	async save(todo: Todo): Promise<boolean> {
		const record = this.mapper.toPersistence(todo);
		await db.insert(todos_table).values(record);
		return true;
	}

	async update(todo: Todo): Promise<boolean> {
		const record = this.mapper.toPersistence(todo);
		await db.update(todos_table).set(record).where(eq(todos_table.id, todo.id));
		return true;
	}

	async delete(id: string): Promise<boolean> {
		await db.delete(todos_table).where(eq(todos_table.id, id));
		return true;
	}
}
