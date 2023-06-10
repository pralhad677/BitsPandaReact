import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import TextField from '@mui/material/TextField';
import   './Form.css'
import { Link, useNavigate } from 'react-router-dom';
import { fn } from './generic';

const schema = z.object({
  Username: z.string().nonempty().max(20),
  Password: z.string().min(6),
  confirmPassword: z.string(),
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

const MyForm = () => {
  const navigate  = useNavigate();
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
    watch,
  } = useForm();
  const watchPassword = watch('Password');

  const validateConfirmPassword = (value:string) => {
    return value === watchPassword || 'Passwords do not match';
  };

  const onSubmit = async (data:Record<string,any>) => {
   
    console.log('data',data);
    let x = await fn({ method: 'post', url: 'https://localhost:7224/api/admin/SignUp', data });   
    let {message:token,isSuccess} =x as any
    
    if(isSuccess){
      
 
      //  setAuthenticated(true);
      //  setOpen(true)
       navigate('/Login');
   } 
  };

  const isFormValid = Object.keys(errors).length === 0;
  React.useEffect(()=>{
    let url = "https://localhost:7224/api/admin/SignUp"
    
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
              <TextField
                label="Confirm Password"
                type="password"
                {...register('confirmPassword', {
                  validate: validateConfirmPassword,
                })}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword ? String(errors.confirmPassword.message) : ''}
              />
            </div>
            <div className="m-3">
              <button className="btn btn-primary" type="submit" disabled={!isFormValid}>
                Signup
              </button>
               <div className='d-flex'>
                <text>already a user?</text>
                <Link className="nav-link " style={myStyle} to="/Login">Login</Link> 

               </div>
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
};

export default MyForm;
