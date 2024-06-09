import { describe, test, expect, beforeEach } from 'vitest';
import { TodoService } from '$lib/services/TodoService';
import { InMemoryTodoRepository } from '$lib/repositories/TodoRepository';
import { faker } from '@faker-js/faker';

describe.concurrent('TodoService', () => {
	let service: TodoService;
	let repository: InMemoryTodoRepository;

	beforeEach(() => {
		repository = new InMemoryTodoRepository();
		service = new TodoService(repository);
	});

	test('should add a new todo', async () => {
		const title = faker.lorem.sentence();
		const user_id = faker.string.uuid();
		const result = await service.addTodo(title, user_id);
		const todos = await service.getAllTodos(user_id);
		expect(result).toBe(true);
		expect(todos.length).toBe(1);
		expect(todos[0].title).toBe(title);
		expect(todos[0].completed).toBe(false);
	});

	test('should get all todos', async () => {
		const title1 = faker.lorem.sentence();
		const title2 = faker.lorem.sentence();
		const user_id = faker.string.uuid();
		await service.addTodo(title1, user_id);
		await service.addTodo(title2, user_id);
		const todos = await service.getAllTodos(user_id);
		expect(todos.length).toBe(2);
		expect(todos[0].title).toBe(title1);
		expect(todos[1].title).toBe(title2);
	});

	test('should return empty array if no todos are added', async () => {
		const user_id = faker.string.uuid();
		const todos = await service.getAllTodos(user_id);
		expect(todos.length).toBe(0);
	});

	test('should update an existing todo', async () => {
		const title = faker.lorem.sentence();
		const user_id = faker.string.uuid();
		await service.addTodo(title, user_id);
		const todos = await service.getAllTodos(user_id);
		const todo = todos[0];
		todo.title = 'Updated Title';
		const result = await service.updateTodo(todo);
		const updatedTodo = await service.getTodo(todo.id);
		expect(result).toBe(true);
		expect(updatedTodo.title).toBe('Updated Title');
	});

	test('should delete an existing todo', async () => {
		const title = faker.lorem.sentence();
		const user_id = faker.string.uuid();
		await service.addTodo(title, user_id);
		let todos = await service.getAllTodos(user_id);
		const todo = todos[0];
		const result = await service.deleteTodo(todo.id);
		todos = await service.getAllTodos(user_id);
		expect(result).toBe(true);
		expect(todos.length).toBe(0);
	});

	test('should complete an incomplete todo', async () => {
		const title = faker.lorem.sentence();
		const user_id = faker.string.uuid();
		await service.addTodo(title, user_id);
		const todos = await service.getAllTodos(user_id);
		const todo = todos[0];
		const result = await service.completeTodo(todo.id);
		const completedTodo = await service.getTodo(todo.id);
		expect(result).toBe(true);
		expect(completedTodo.completed).toBe(true);
	});

	test('should uncomplete a completed todo', async () => {
		const title = faker.lorem.sentence();
		const user_id = faker.string.uuid();
		await service.addTodo(title, user_id);
		const todos = await service.getAllTodos(user_id);
		const todo = todos[0];
		await service.completeTodo(todo.id);
		const result = await service.unCompleteTodo(todo.id);
		const uncompletedTodo = await service.getTodo(todo.id);
		expect(result).toBe(true);
		expect(uncompletedTodo.completed).toBe(false);
	});
});
