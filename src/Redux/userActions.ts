export interface User {
    id:number,
    username:string,
    password:string
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
export const getAllUser = () => ({
  type: 'GET_USER',
  
});
