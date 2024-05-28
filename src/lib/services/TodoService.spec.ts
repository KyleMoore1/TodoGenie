import { describe, it, expect, beforeEach } from 'vitest';
import { TodoService } from '$lib/services/TodoService';
import { InMemoryTodoRepository } from '$lib/repositories/TodoRepository';
import { faker } from '@faker-js/faker';

describe('TodoService', () => {
	let service: TodoService;
	let repository: InMemoryTodoRepository;

	beforeEach(() => {
		repository = new InMemoryTodoRepository();
		service = new TodoService(repository);
	});

	it('should add a new todo', async () => {
		const title = faker.lorem.sentence();
		const result = await service.addTodo(title);
		const todos = await service.getAllTodos();
		expect(result).toBe(true);
		expect(todos.length).toBe(1);
		expect(todos[0].title).toBe(title);
		expect(todos[0].completed).toBe(false);
	});

	it('should get all todos', async () => {
		const title1 = faker.lorem.sentence();
		const title2 = faker.lorem.sentence();
		await service.addTodo(title1);
		await service.addTodo(title2);
		const todos = await service.getAllTodos();
		expect(todos.length).toBe(2);
		expect(todos[0].title).toBe(title1);
		expect(todos[1].title).toBe(title2);
	});
});
