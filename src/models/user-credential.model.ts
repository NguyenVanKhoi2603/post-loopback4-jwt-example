import {belongsTo, Entity, model, property} from '@loopback/repository';
import {User} from './user.model';

@model()
export class UserCredential extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: false,
  })
  id: string;

  @property({
    type: 'string',
  })
  password?: string;

  @belongsTo(() => User)
  userId: string;

  constructor(data?: Partial<UserCredential>) {
    super(data);
  }
}

export interface UserCredentialRelations {
  // describe navigational properties here
}

export type UserCredentialWithRelations = UserCredential & UserCredentialRelations;
