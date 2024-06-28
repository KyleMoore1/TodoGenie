import { Entity } from '../../core/entity';

export interface CreateTodoProps {
	user_id: string;
	title: string;
}

export interface TodoProps {
	user_id: string;
	title: string;
	completed: boolean;
}

export class Todo extends Entity<TodoProps> {
	static create(create: CreateTodoProps): Todo {
		const props: TodoProps = { ...create, completed: false };
		return new Todo({ props });
	}

	complete() {
		super.update();
		this.props.completed = true;
	}

	uncomplete() {
		super.update();
		this.props.completed = false;
	}
}
