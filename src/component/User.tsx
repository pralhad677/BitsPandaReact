import React,{ useEffect } from 'react';
import { connect } from 'react-redux'; 
import { User, addUser, deleteUser, updateUser } from '../Redux/userActions';
  
import { Container, Grid, Paper, Typography } from '@mui/material';


interface UserListProps {
  users?: User[];
  // Add other props from the store if needed
  // ...
  addUser?: (user: User) => void;
  deleteUser?: (userId: number) => void;
  updateUser?: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({
  users,
  addUser,
  deleteUser,
  updateUser,
}) => {
     
  const handleAddUser = () => {
    const newUser: User = {
      Id: 1,
      Username: 'JohnDoe',
      Password: 'password',
    };

    addUser?.(newUser);
  };

  const handleDeleteUser = (userId: number) => {
    deleteUser?.(userId);
  };

  const handleUpdateUser = (user: User,Username:string) => {
    // alert(Username)
    console.log('user',user)
    const updatedUser1: User = {
      ...user,
      Username:"asd",
      Password: 'newpassword',
    };
    console.log('udpate user',updatedUser1)
    updateUser?.(updatedUser1);
  };
  useEffect(() => {
    // This code will run after every render
    // You can perform DOM manipulation or other side effects here
    console.log('DOM has changed');
    console.log(users)
  },[users]);
  return (
    <div>
          <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Paper elevation={0} sx={{ p: 2 }}>
            <Typography variant="h5">Id</Typography>
            {users?.map((user) => (
              <Typography key={user.Id}>{user.Id}</Typography>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={0} sx={{ p: 2 }}>
            <Typography variant="h5">Username</Typography>
            {users?.map((user) => (
              <Typography key={user.Id}>{user.Username}</Typography>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={0} sx={{ p: 2 }}>
            <Typography variant="h5">Password</Typography>
            {users?.map((user) => (
              <Typography key={user.Id}>{user.Password}</Typography>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Container>

      {users?.map((user) => (
        <div key={user.Id}>
          <span>{user.Username}</span>
          <button onClick={() => handleDeleteUser(user.Id)}>Delete</button>
          <button onClick={() => handleUpdateUser(user,"random")}>Update</button>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    ...state, // Pass all state properties to the component
  };
};

const mapDispatchToProps = {
  addUser,
  deleteUser,
  updateUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
