import type { Entity } from './entity';

export interface Mapper<DomainEntity extends Entity, DbRecord> {
	toPersistence(entity: DomainEntity): DbRecord;
	toDomain(record: any): DomainEntity;
}
