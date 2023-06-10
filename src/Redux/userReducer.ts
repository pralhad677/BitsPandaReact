// userReducer.ts
interface User {
    id:string,
    username:string,
    password:string
}

interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [],
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'ADD_USER':
      console.log('action.payload',action.payload)
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    case 'UPDATE_USER':
       
      alert('update')
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    case 'GET_USER':
      alert('get user')
      return {
        ...state
       
         
      };
    default:
      return state;
  }
};

export default userReducer;
