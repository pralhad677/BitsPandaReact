import React,{ useEffect } from 'react';
import { connect } from 'react-redux'; 
import { User, addUser, deleteUser, updateUser } from '../Redux/userActions';
  
import { Container, Grid, Paper, Typography,Button,Box } from '@mui/material';
import Modal from 'react-modal';
import MyForm from './SignUp';
// import {useQueries} from 'react-query'
Modal.setAppElement('#root');
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
     
  const handleAddUser = (id:number) => {
    alert(id);
    const newUser: User = {
      Id: id,
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
  const userCount = (users?.length ?? 0) + 1; 
  const [isOpen, setIsOpen] = React.useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  

  const [number, setNumber] = React.useState(userCount);
   
  useEffect(() => {
    // This code will run after every render
    // You can perform DOM manipulation or other side effects here
    console.log('DOM has changed');
    console.log(users)
    setNumber(userCount)
  },[users,userCount]); 
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
          {users?.map((user) => (
            <Grid item xs={12} key={user.Id}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={3}>
                  <Typography>{user.Id}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography>{user.Username}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography>{user.Password}</Typography>
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
                      onClick={() => handleDeleteUser(user.Id)}
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

    <button onClick={openModal}>Open Modal</button>
    <Modal isOpen={isOpen} onRequestClose={closeModal}>
       {/* <MyForm /> */}
        <p>This is the content of the modal.</p>
        <button onClick={closeModal}>Close</button>
      </Modal>
      
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
