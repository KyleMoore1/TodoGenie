import { Entity } from '../../core/entity';

export enum TodoPriority {
	Low,
	Medium,
	High
}

export interface CreateTodoProps {
	user_id: string;
	title: string;
	content?: string;
	project_id?: string;
	due_date?: Date;
	priority?: TodoPriority;
}

export interface TodoProps {
	user_id: string;
	title: string;
	content?: string;
	completed: boolean;
	completed_at?: Date;
	project_id?: string;
	due_date?: Date;
	priority?: TodoPriority;
}

export class Todo extends Entity<TodoProps> {
	static create(create: CreateTodoProps): Todo {
		const props: TodoProps = { ...create, completed: false };
		return new Todo({ props });
	}

	complete() {
		super.update();
		this.props.completed_at = this.updated_at;
		this.props.completed = true;
	}

	uncomplete() {
		super.update();
		this.props.completed_at = undefined;
		this.props.completed = false;
	}

	setTitle(title: string) {
		super.update();
		this.props.title = title;
	}

	setContent(content: string) {
		super.update();
		this.props.content = content;
	}

	setDueDate(due_date: Date) {
		super.update();
		this.props.due_date = due_date;
	}

	removeDueDate() {
		super.update();
		this.props.due_date = undefined;
	}

	setPriority(priority: TodoPriority) {
		super.update();
		this.props.priority = priority;
	}

	removePriority() {
		super.update();
		this.props.priority = undefined;
	}

	setProject(project_id: string) {
		super.update();
		this.props.project_id = project_id;
	}

	removeProject() {
		super.update();
		this.props.project_id = undefined;
	}
}
