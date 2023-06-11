// reducer.ts
import { UserActionTypes, ADD_USER, UPDATE_USER, DELETE_USER } from './action';
import { User, RootState } from './type';

const initialState: RootState = {
  users: [],
};

export function userReducer(state = initialState, action: UserActionTypes): RootState {
  switch (action.type) {
    case ADD_USER: 
        
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    
    return {
        ...state,
        // users: [...state.users, action.payload],
      };
    case UPDATE_USER:
        alert('update')
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    default:
      return state;
  }
}
