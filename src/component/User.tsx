import React,{ useCallback, useEffect } from 'react';
import { connect } from 'react-redux';  
  
import { Container, Grid, Paper, Typography,Button,Box } from '@mui/material';
import Modal from 'react-modal'; 
import { fn } from './generic'; 

import { useDispatch, useSelector } from 'react-redux';
import { addUser, updateUser, deleteUser } from '../Redux/action';
import { RootState, User } from '../Redux/type';
import { Update } from './update';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthGuard/AuthProvider';
 
 
Modal.setAppElement('#root');
 interface Counter{
  counter:number
 }
const UserList: React.FC = () => { 
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [updateUsername,setupdateUserName] = React.useState<string>("")
  const navigate = useNavigate();
  const [userId,setUserId] = React.useState<string>("")
  const openModal = (username:string,id:string) => {
    setIsModalOpen(true);
    setupdateUserName(username)
    setUserId(id)
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const users = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();
  const { isAuthenticated, setAuthenticated } = React.useContext(AuthContext);
  
  const [newUser, setNewUser] = React.useState<User>({ id: '', username: '', password: '' });
  const [updateUserDetails, setUpdateUserDetails] = React.useState<User | null>(null);

  const handleAddUser = () => {
    if (newUser.username.trim() === '' || newUser.password.trim() === '') {
      return; // Do not add if username or password is empty
    }

    dispatch(addUser(newUser));
    setNewUser({ id: '', username: '', password: '' });
  };

  const handleUpdateUser = (user:User) => {
    
    
    dispatch(updateUser(user));
  };

  const handleDeleteUser = async (id: string) => {
    
    let x =await fn({ method: 'delete', url: `https://localhost:7224/api/admin/deleteByAdminId?Id=${id}`, data:null });   
   console.log(x)
    dispatch(deleteUser(id));
  }; 
const logout = ()=>{
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
  setAuthenticated(false)
 navigate('/')
}
  useEffect( () => { 
  //  alert(' useEffect')
    const fetch = async ()=>{

       let x =await fn({ method: 'get', url: 'https://localhost:7224/api/admin/getAll', data:null });   
       let {data} =x as any
       console.log('data',data)
       data.forEach((element:User) => dispatch(addUser(element as User)))
   users.filter(data=>{
    return data.id !== userId
   })
    }
    fetch()
    const handleBackNavigation = () => {
      window.location.href = '/user'; // Redirect to home page or another URL of your choice
    };

    // Add event listener to block the back button
    window.addEventListener('popstate', handleBackNavigation);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('popstate', handleBackNavigation);
    };
  },[dispatch]);   
  return (
    <div>
        <button onClick={logout} className='btn btn-danger'>logout</button>
 
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
          {users?.filter(x=>x.username !==sessionStorage.getItem('user') )?.map((user) => (
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
                      onClick={()=>openModal(user.username,user.id)}
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
  
      {/* <button onClick={handleUpdateUser}>Update User</button>  */}
    

    {/* <button className='btn btn-primary' onClick={()=>handleAddUser(number)}>Add User</button> */}
  

    {/* <button onClick={openModal}>Open Modal</button> */}
    <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
       
        {/* <p>This is the content of the modal.</p> */}
        <Update username={updateUsername} id={userId} closeModal={closeModal} handleUpdateUser={handleUpdateUser}/>
        <button onClick={closeModal}>Close</button>
      </Modal>
      
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    ...state,  
  };
};

const mapDispatchToProps = {
  addUser,
  deleteUser,
  updateUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
