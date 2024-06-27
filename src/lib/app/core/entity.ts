export abstract class Entity {
	id: string;
	created_at: Date;
	updated_at: Date;

	constructor() {
		this.id = crypto.randomUUID();
		const now = new Date();
		this.created_at = now;
		this.updated_at = now;
	}

	public update() {
		this.updated_at = new Date();
	}
}
