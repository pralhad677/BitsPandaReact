import React,{ useEffect } from 'react';
import { connect } from 'react-redux'; 
import { User, addUser, deleteUser, updateUser } from '../Redux/userActions';
  
import { Container, Grid, Paper, Typography,Button,Box } from '@mui/material';
import Modal from 'react-modal';
import MyForm from './SignUp';
import { fn } from './generic'; 

import { useSelector, useDispatch } from 'react-redux';
Modal.setAppElement('#root');
interface UserListProps {
  users?: User[];
  // Add other props from the store if needed
  // ...
  addUser?: (user: User) => void;
  deleteUser?: (userId: number) => void;
  updateUser?: (user: User) => void;
   getAllUser?:()=>void
}

const UserList: React.FC<UserListProps> = ({
  users,
  addUser,
  deleteUser,
  updateUser,
  getAllUser
}) => { 
  const handleAddUser = (id:number) => {
    alert(id);
    

    // addUser?.(newUser);
  };

  const handleDeleteUser = (userId: number) => {
    deleteUser?.(userId);
  };

  const handleUpdateUser = (user: User,Username:string) => {
    
    console.log('user',user)
    const updatedUser1: User = {
      ...user,

      username:"asd",
      password: 'newpassword',
    };
    console.log('udpate user',updatedUser1)
    updateUser?.(updatedUser1);
  };
  const getAll = ()=>{
    getAllUser?.()
  }
  const userCount = (users?.length ?? 0) + 1; 
  const [isOpen, setIsOpen] = React.useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  

  const [number, setNumber] = React.useState(userCount);
  const [listOfUser,setListOfUser] = React.useState(Array<object>)
 console.log('listOfUser',listOfUser)
  useEffect( () => { 
    console.log('DOM has changed');
    console.log(users)
    setNumber(userCount)
    const fetch = async ()=>{

       let x =await fn({ method: 'get', url: 'https://localhost:7224/api/admin/getAll', data:null });   
       let {data} =x as any
       setListOfUser(data);
       addUser?.(data)
   
    }
    fetch()
  },[]); 
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
                      onClick={() => handleUpdateUser(user,"random")}
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
 


    <button className='btn btn-primary' onClick={()=>handleAddUser(number)}>Add User</button>
    <button className='btn btn-primary' onClick={()=>getAll()}>get All User</button>

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
