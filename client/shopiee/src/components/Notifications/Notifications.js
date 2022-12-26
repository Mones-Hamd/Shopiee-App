import React, { useContext } from 'react';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { NotificationsContext } from '../../context/NotificationsCtx';
import { Stack } from '@mui/system';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Notifications = () => {
  const { open, setOpen, Success, isError, message } =
    useContext(NotificationsContext);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        {Success ? (
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: '100%' }}
          >
            {message}
          </Alert>
        ) : (
          <Alert sx={{ width: '100%' }} onClose={handleClose} severity="error">
            {message}
          </Alert>
        )}
      </Snackbar>
    </Stack>
  );
};

export default Notifications;
