import React,{ useEffect } from 'react';
import { connect } from 'react-redux'; 
import { User, addUser, deleteUser, updateUser } from '../Redux/userActions';
  



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
        <div className="container">
            <div className="row row-cols-3  gx-3">
                <div className="col-sm-3 m-3 bg-light "><h5>Id</h5>
                <table className="table">
            <tbody>
              {users?.map((user) => (
                <tr key={user.Id}>
                  <td>{user.Id}</td>
                </tr>
              ))}
            </tbody>
          </table>
                </div>
                <div className="col-sm-3 m-3 bg-light">Username</div>
                <div className="col-sm-3 m-3 bg-light">Password</div>
            </div>
        </div>
      <button className='btn btn-primary' onClick={handleAddUser}>Add User</button>

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
