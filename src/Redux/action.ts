// actions.ts
import { User } from './type';

export const ADD_USER = 'ADD_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';

interface AddUserAction {
  type: typeof ADD_USER;
  payload: User;
}

interface UpdateUserAction {
  type: typeof UPDATE_USER;
  payload: User;
}

interface DeleteUserAction {
  type: typeof DELETE_USER;
  payload: string; // id of the user to delete
}

export type UserActionTypes = AddUserAction | UpdateUserAction | DeleteUserAction;

export function addUser(user: User): UserActionTypes {
  return {
    type: ADD_USER,
    payload: user,
  };
}

export function updateUser(user: User): UserActionTypes {
  return {
    type: UPDATE_USER,
    payload: user,
  };
}

export function deleteUser(id: string): UserActionTypes {
  return {
    type: DELETE_USER,
    payload: id,
  };
}
