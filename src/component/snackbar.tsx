import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
interface Snackbar1{
message:string
}

const MySnackbar:React.FC<Snackbar1> = ({message}) => {
  const [open, setOpen] = useState(false);

  const handleOpenSnackbar = () => {
    setOpen(true);
  };

  const handleCloseSnackbar = () => {
    setOpen(false);
  };

  return (
    <div>
    
      <Snackbar open={true} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
             message
        </Alert>
      </Snackbar>
    </div>
  );
};

export default MySnackbar;
