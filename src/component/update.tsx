import React,{useContext} from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import TextField from '@mui/material/TextField';
import   './Form.css'
import { Link,useNavigate   } from 'react-router-dom'; 
import { fn } from './generic';
import { AuthContext } from '../AuthGuard/AuthProvider'; 
import MySnackbar from './snackbar';
import { useDispatch } from 'react-redux';
 
import { addUser } from '../Redux/action';
import {User} from '../Redux/type'
 
 
const schema = z.object({
  Username: z.string().nonempty().max(20),
  
});

const validateUsername = (value:string) => {
  if (value.length === 0) {
    return 'Username is required';
  }
  return value.length <= 20 || 'Username should not exceed 20 characters';
};

 

interface UpdateForm{
    id:string,
    username:string,
    closeModal: () => void,
    handleUpdateUser:(user:  User) => void
    // password:string,
}
export const Update:React.FC<UpdateForm> = ({username,id,closeModal,handleUpdateUser}) => {
   
const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    
  } = useForm(); 
   
 
//   const [open,setOpen] = React.useState(false) 
   
  const onSubmit =async (data:Record<string,any>) => {
    
    console.log('data',data.Username); 
    console.log(`https://localhost:7224/api/admin/updateAdmin?Id=${id}&Username=${username}`)
    let x = await fn({ method: 'patch', url: `https://localhost:7224/api/admin/updateAdmin?Id=${id}&Username=${data.Username}`, data });   
    // let x = await fn({ method: 'patch', url: `https://localhost:7224/api/admin/updateAdmin?Id=${id}&Username="lkll"`, data });   
    console.log('x',x)
    let { isSuccess,data:data1} =x as any
    if(isSuccess){
        handleUpdateUser(data1[0] as User)
      closeModal()
  
   } 
  };
  
  const isFormValid = Object.keys(errors).length === 0;
  console.log('isFormValid',isFormValid)

 
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
                // value={text}
                type="text"
                // onChange={handleTextChange}
                {...register('Username', {
                    validate: validateUsername,
                  })}
                error={!!errors.Username}
                helperText={errors.Username ? String(errors.Username.message) : ''}
                />

            </div>
           
          
            <div className="m-3">
              <button className="btn btn-primary" type="submit" disabled={!isFormValid}>
                update
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
 