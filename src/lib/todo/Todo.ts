import { Entity } from '$lib/core/entity';

export class Todo extends Entity {
	user_id: string;
	title: string;
	completed: boolean;

	constructor(user_id: string, title: string) {
		super();
		this.completed = false;
		this.user_id = user_id;
		this.title = title;
	}

	public complete() {
		this.update();
		this.completed = true;
	}

	public uncomplete() {
		this.update();
		this.completed = false;
	}

	private update() {
		this.updated_at = new Date();
	}
}
