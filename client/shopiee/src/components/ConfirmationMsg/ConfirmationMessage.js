import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { ConfirmationMessageContext } from '../../context/ConMessageCtx';
import { useDelete } from '../../hooks/useDelete';
import { useMessage } from '../../hooks/useMessage';
import { useUpdate } from '../../hooks/useUpdate';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import Slide from '@mui/material/Slide';
import { useNotifications } from '../../hooks/useNontifications';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmationMessage = () => {
  const { isMessage, setIsMessage, setIsDelete, setIsUpdate } = useMessage();
  const { isUpdate, isDelete } = useContext(ConfirmationMessageContext);
  const { setIsError, setIsSuccess, setOpen } = useNotifications();
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

  if (onDelete.isSuccess || update.isSuccess) {
    setIsError(false);
    setOpen(true);
    setIsSuccess(true);
  }
  if (onDelete.isError || update.isError) {
    setIsError(true);
    setOpen(true);
    setIsSuccess(false);
  }

  const cancel = (e) => {
    e.preventDefault();
    setIsMessage(false);
    setIsDelete(false);
    setIsUpdate(false);
  };
  return (
    <Dialog
      open={isMessage}
      TransitionComponent={Transition}
      keepMounted
      onClose={!isMessage}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{isDelete ? 'Delete Item' : 'Update item'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Do you want to {isDelete ? 'Delete ' : 'Update'} this Item ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancel}>No</Button>
        <Button onClick={handelSubmit}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationMessage;
