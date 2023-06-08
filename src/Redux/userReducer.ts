// userReducer.ts
interface User {
    Id:string,
    Username:string,
    Password:string
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
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter((user) => user.Id !== action.payload),
      };
    case 'UPDATE_USER':
       
    console.log('state',state)
    console.log('action.payload.id',action.payload)
      return {
        ...state,
        users: state.users.map((user) =>
          user.Id === action.payload.Id ? action.payload : user
        ),
      };
    case 'GET_USER':
      return {
        ...state
       
         
      };
    default:
      return state;
  }
};

export default userReducer;
