import { InMemoryTodoRepository, type ITodoRepository } from '$lib/repositories/TodoRepository';
import { TodoService } from './TodoService';

const todoRepository: ITodoRepository = new InMemoryTodoRepository();
export const todoService: TodoService = new TodoService(todoRepository);
