import { Button, CircularProgress, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext } from 'react';
import { ConfirmationMessageContext } from '../../context/ConMessageCtx';
import { useDelete } from '../../hooks/useDelete';
import { useMessage } from '../../hooks/useMessage';
import { useUpdate } from '../../hooks/useUpdate';
import classes from './Styles.module.css';
const ConfirmationMessage = () => {
  const { isMessage, setIsMessage, setIsDelete, setIsUpdate } = useMessage();
  const { isUpdate, isDelete } = useContext(ConfirmationMessageContext);

  const { onDelete } = useDelete();
  const { update } = useUpdate();
  const handelSubmit = (e) => {
    if (isDelete) {
      onDelete.perform();

      setIsMessage(false);
      setIsDelete(false);
      return;
    }
    if (isUpdate) {
      update.perform();
      setIsMessage(false);

      setIsUpdate(false);
      return;
    }
  };

  const cancel = (e) => {
    e.preventDefault();
    setIsMessage(false);
    setIsDelete(false);
    setIsUpdate(false);
  };
  return (
    <Box
      className={classes.messageContainer}
      display={isMessage ? 'block' : 'none'}
    >
      <Paper elevation={3} className={classes.msgPaper}>
        {onDelete.isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography variant="h6">
              Do you want to{isDelete ? ' delete' : ' update'} this Item ?{' '}
            </Typography>
            <div className={classes.msgAction}>
              <Button onClick={handelSubmit}> Yes</Button>
              <Button onClick={cancel}>No</Button>
            </div>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default ConfirmationMessage;
