import { TodoRepository, type ITodoRepository } from '$lib/app/todo/data-access/todo-repository';
import { TodoService } from './domain/todo-service';

const todoRepository: ITodoRepository = new TodoRepository();
export const todoService: TodoService = new TodoService(todoRepository);
