import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import TextField from '@mui/material/TextField';
import   './Form.css'
import { Link } from 'react-router-dom';

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
   

  const onSubmit = (data:Record<string,any>) => {
    console.log('data',data);
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
              <button className="btn btn-primary" type="submit" disabled={!isFormValid}>
                Submit
              </button>
               
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
};
 