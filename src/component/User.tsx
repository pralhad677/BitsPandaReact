import React,{ useCallback, useEffect } from 'react';
import { connect } from 'react-redux';  
  
import { Container, Grid, Paper, Typography,Button,Box } from '@mui/material';
import Modal from 'react-modal'; 
import { fn } from './generic'; 

import { useDispatch, useSelector } from 'react-redux';
import { addUser, updateUser, deleteUser } from '../Redux/action';
import { RootState, User } from '../Redux/type';

 
Modal.setAppElement('#root');
 interface Counter{
  counter:number
 }
const UserList: React.FC<Counter>  = ({counter}) => { 
   
  const users = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();
  
  const [newUser, setNewUser] = React.useState<User>({ id: '', username: '', password: '' });
  const [updateUserDetails, setUpdateUserDetails] = React.useState<User | null>(null);

  const handleAddUser = () => {
    if (newUser.username.trim() === '' || newUser.password.trim() === '') {
      return; // Do not add if username or password is empty
    }

    dispatch(addUser(newUser));
    setNewUser({ id: '', username: '', password: '' });
  };

  const handleUpdateUser = () => {
    if (updateUserDetails && updateUserDetails.username.trim() !== '' && updateUserDetails.password.trim() !== '') {
      dispatch(updateUser(updateUserDetails));
      setUpdateUserDetails(null);
    }
  };

  const handleDeleteUser = (id: string) => {
    dispatch(deleteUser(id));
  };
  const dispatchAddUser = useCallback((user: User) => dispatch(addUser(user)), [dispatch]);
  const dispatchUpdateUser = useCallback((user: User) => dispatch(updateUser(user)), [dispatch]);
  const dispatchDeleteUser = useCallback((id: string) => dispatch(deleteUser(id)), [dispatch]);

  useEffect( () => { 
   
    const fetch = async ()=>{

       let x =await fn({ method: 'get', url: 'https://localhost:7224/api/admin/getAll', data:null });   
       let {data} =x as any
       console.log('data',data)
       data.forEach((element:User) => dispatch(addUser(element as User)))
   
    }
    fetch()
  },[counter]); 
  // debugger
  // },[users,userCount]); 
  return (
    <div>
        
 
    <Container maxWidth="md">
      <Paper elevation={0} sx={{ p: 2 }}>
        <Typography variant="h5"></Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={3}>
                <Typography variant="h5">Id</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h5">Username</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h5">Password</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h5">Action</Typography>
              </Grid>
              <Grid item xs={3}></Grid>
            </Grid>
          </Grid>
          {users?.length}
          {users?.map((user) => (
            <Grid item xs={12} key={user?.id}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={3}>
                  <Typography>{user.id}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography>{user.username}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography>{user.password}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      // onClick={() => handleUpdateUser(user,"random")}
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
 
    <button onClick={handleAddUser}>Add User</button>
      <button onClick={handleUpdateUser}>Update User</button> 
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            Username: {user.username}, Password: {user.password}
          </li>
        ))}
      </ul>

    {/* <button className='btn btn-primary' onClick={()=>handleAddUser(number)}>Add User</button> */}
  

    {/* <button onClick={openModal}>Open Modal</button> */}
    {/* <Modal isOpen={isOpen} onRequestClose={closeModal}>
       
        <p>This is the content of the modal.</p>
        <button onClick={closeModal}>Close</button>
      </Modal> */}
      
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
