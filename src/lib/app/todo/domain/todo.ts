import { Entity } from '$lib/app/core/entity';

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
		super.update();
		this.completed = true;
	}

	public uncomplete() {
		super.update();
		this.completed = false;
	}
}
