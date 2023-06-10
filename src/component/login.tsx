import React,{useContext} from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import TextField from '@mui/material/TextField';
import   './Form.css'
import { Link,useNavigate   } from 'react-router-dom'; 
import { fn } from './generic';
import { AuthContext } from '../AuthGuard/AuthProvider'; 
import MySnackbar from './snackbar';
interface Post {
    userId: number;
    id:number 
  title: string
  body:string
}


const schema = z.object({
  Username: z.string().nonempty().max(20),
  Password: z.string().min(6), 
});

const validateUsername = (value:string) => {
  if (value.length === 0) {
    return 'Username is required';
  }
  return value.length <= 20 || 'Username should not exceed 20 characters';
};

const validatePassword = (value:string) => {
  return value.length >= 6 || 'Password should be at least 6 characters';
};

export const Login = () => {
  const myStyle = {
    color: 'red',
    fontSize: '16px',
    fontWeight: 'bold',
     
    ':hover': {
      backgroundColor: 'black',
      cursor: 'pointer',
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    
  } = useForm(); 
   

  const { isAuthenticated, setAuthenticated } = useContext(AuthContext);
  const [open,setOpen] = React.useState(false)
  const navigate = useNavigate();
  const onSubmit =async (data:Record<string,any>) => {
    console.log('data',data);
    // { method: 'get', url: 'https://localhost:7224/api/admin/getAll', data: null }
    let x = await fn({ method: 'post', url: 'https://localhost:7224/api/admin/Login', data });   
    let {message:token,isSuccess} =x as any
    
    if(isSuccess){
      

       sessionStorage.setItem('token',token);
       setAuthenticated(true);
       setOpen(true)
       navigate('/');
   } 
  };

  const isFormValid = Object.keys(errors).length === 0;
  React.useEffect(()=>{ 
    
  },[])

  return (
    <div className="container-lg bg-light">
        <div className="Parent">
      <div className="row justify-content-center ">
        <div className="col-md-3">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="m-3">
              <TextField
                label="Username"
                type="text"
                {...register('Username', {
                  validate: validateUsername,
                })}
                error={!!errors.Username}
                helperText={errors.Username ? String(errors.Username.message) : ''}
              />
            </div>
            <div className="m-3">
              <TextField
                label="Password"
                type="password"
                {...register('Password', {
                  validate: validatePassword,
                })}
                error={!!errors.Password}
                helperText={errors.Password ? String(errors.Password.message) : ''}
              />
            </div>
          
            <div className="m-3">
              <button className="btn btn-primary" type="submit" disabled={!isFormValid}>
                Login
              </button>
              {/* {open && <MySnackbar message="You have been logged in successfully"/>}  */}
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
};
 