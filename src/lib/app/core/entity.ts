export interface BaseEntityProps {
	id: string;
	created_at: Date;
	updated_at: Date;
}

export interface CreateEntityProps<T> {
	id?: string;
	props: T;
	created_at?: Date;
	updated_at?: Date;
}

export abstract class Entity<EntityProps> {
	id: string;
	created_at: Date;
	updated_at: Date;
	props: EntityProps;

	constructor({ id, created_at, updated_at, props }: CreateEntityProps<EntityProps>) {
		this.id = id || crypto.randomUUID();
		const now = new Date();
		this.created_at = created_at || now;
		this.updated_at = updated_at || now;
		this.props = props;
	}

	public update() {
		this.updated_at = new Date();
	}

	public getProps(): EntityProps & BaseEntityProps {
		const propsCopy = {
			id: this.id,
			created_at: this.created_at,
			updated_at: this.updated_at,
			...this.props
		};
		return Object.freeze(propsCopy);
	}
}
