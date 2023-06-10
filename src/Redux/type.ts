// types.ts
export interface User {
    id: string;
    username: string;
    password: string;
  }
  
  export interface RootState {
    users: User[];
  }
  