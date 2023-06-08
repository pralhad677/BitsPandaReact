import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import TextField from '@mui/material/TextField';
import   './Form.css'

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

  const onSubmit = (data:Record<string,any>) => {
    console.log(data);
  };

  const isFormValid = Object.keys(errors).length === 0;

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

export default MyForm;
