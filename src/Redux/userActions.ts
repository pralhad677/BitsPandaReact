export interface User {
    Id:number,
    Username:string,
    Password:string
}

export const addUser = (user: User) => ({
  type: 'ADD_USER',
  payload: user,
});

export const deleteUser = (userId: number) => ({
  type: 'DELETE_USER',
  payload: userId,
});

export const updateUser = (user: User) => ({
  type: 'UPDATE_USER',
  payload: user,
});
export const getAllUser = (user: User) => ({
  type: 'GET_USER',
  payload: user,
});
