import { describe, test, expect, beforeEach } from 'vitest';
import { TodoService } from '$lib/app/todo/domain/todo-service';
import {
	type ITodoRepository,
	InMemoryTodoRepository,
	TodoRepository
} from '$lib/app/todo/data-access/todo-repository';
import { faker } from '@faker-js/faker';
import { TodoPriority } from './todo';

describe.concurrent('TodoService', () => {
	let service: TodoService;
	let repository: ITodoRepository;

	beforeEach(() => {
		repository = new TodoRepository();
		service = new TodoService(repository);
	});

	test('should add a new todo', async () => {
		const title = faker.lorem.sentence();
		const user_id = faker.string.uuid();
		const result = await service.addTodo(title, user_id);
		const todos = await service.getAllTodos(user_id);
		expect(result).toBeDefined();
		expect(todos.length).toBe(1);
		expect(todos[0].props.title).toBe(title);
		expect(todos[0].props.completed).toBe(false);
	});

	test('should get all todos', async () => {
		const title1 = faker.lorem.sentence();
		const title2 = faker.lorem.sentence();
		const user_id = faker.string.uuid();
		await service.addTodo(title1, user_id);
		await service.addTodo(title2, user_id);
		const todos = await service.getAllTodos(user_id);
		expect(todos.length).toBe(2);
		expect(todos[0].props.title).toBe(title2);
		expect(todos[1].props.title).toBe(title1);
	});

	test('should return empty array if no todos are added', async () => {
		const user_id = faker.string.uuid();
		const todos = await service.getAllTodos(user_id);
		expect(todos.length).toBe(0);
	});

	test('should update an existing todo', async () => {
		const title = faker.lorem.sentence();
		const user_id = faker.string.uuid();
		const todo_id = await service.addTodo(title, user_id);
		const todo = await service.getTodo(todo_id);
		todo.props.title = 'Updated Title';
		const result = await service.updateTodo(todo);
		const updatedTodo = await service.getTodo(todo.id);
		expect(result).toBe(true);
		expect(updatedTodo.props.title).toBe('Updated Title');
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
		const todo_id = await service.addTodo(title, user_id);
		const result = await service.completeTodo(todo_id);
		const completedTodo = await service.getTodo(todo_id);
		expect(result).toBe(true);
		expect(completedTodo.props.completed).toBe(true);
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
		expect(uncompletedTodo.props.completed).toBe(false);
	});

	test('should set title of a todo', async () => {
		const title = faker.lorem.sentence();
		const user_id = faker.string.uuid();
		await service.addTodo(title, user_id);
		const todos = await service.getAllTodos(user_id);
		const todo = todos[0];
		const result = await service.setTitle(todo.id, 'New Title');
		const updatedTodo = await service.getTodo(todo.id);
		expect(result).toBe(true);
		expect(updatedTodo.props.title).toBe('New Title');
	});

	test('should set content of a todo', async () => {
		const title = faker.lorem.sentence();
		const user_id = faker.string.uuid();
		await service.addTodo(title, user_id);
		const todos = await service.getAllTodos(user_id);
		const todo = todos[0];
		const result = await service.setContent(todo.id, 'New Content');
		const updatedTodo = await service.getTodo(todo.id);
		expect(result).toBe(true);
		expect(updatedTodo.props.content).toBe('New Content');
	});

	test('should set due date of a todo', async () => {
		const title = faker.lorem.sentence();
		const user_id = faker.string.uuid();
		const todo_id = await service.addTodo(title, user_id);
		const due_date = faker.date.future();
		const result = await service.setDueDate(todo_id, due_date);
		const updatedTodo = await service.getTodo(todo_id);
		expect(result).toBe(true);
		expect(updatedTodo.props.due_date?.getMilliseconds).toBe(due_date.getMilliseconds);
	});

	test('should remove due date of a todo', async () => {
		const title = faker.lorem.sentence();
		const user_id = faker.string.uuid();
		const todo_id = await service.addTodo(title, user_id);
		const due_date = faker.date.future();
		await service.setDueDate(todo_id, due_date);
		const result = await service.removeDueDate(todo_id);
		const updatedTodo = await service.getTodo(todo_id);
		expect(result).toBe(true);
		expect(updatedTodo.props.due_date).toBe(undefined);
	});

	test('should set priority of a todo', async () => {
		const title = faker.lorem.sentence();
		const user_id = faker.string.uuid();
		await service.addTodo(title, user_id);
		const todos = await service.getAllTodos(user_id);
		const todo = todos[0];
		const result = await service.setPriority(todo.id, TodoPriority.High);
		const updatedTodo = await service.getTodo(todo.id);
		expect(result).toBe(true);
		expect(updatedTodo.props.priority).toBe(TodoPriority.High);
	});

	test('should remove priority of a todo', async () => {
		const title = faker.lorem.sentence();
		const user_id = faker.string.uuid();
		await service.addTodo(title, user_id);
		const todos = await service.getAllTodos(user_id);
		const todo = todos[0];
		await service.setPriority(todo.id, TodoPriority.High);
		await service.removePriority(todo.id);
		const updatedTodo = await service.getTodo(todo.id);
		expect(updatedTodo.props.priority).toBe(undefined);
	});
});
