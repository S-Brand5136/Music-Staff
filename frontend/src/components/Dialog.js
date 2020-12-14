import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CREATE_COMMENT_CLOSE } from "../constants/discussionConstants";
import { createComment } from "../actions/discussionActions";

// MaterialUI imports
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";

const AddCommentDialog = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);

  const [reply, setReply] = useState("");

  const discussion = useSelector((state) => state.discussion);
  const { discussion: id } = discussion;

  const handleClose = () => {
    setOpen(false);
    setReply("");
    dispatch({ type: CREATE_COMMENT_CLOSE });
  };

  const handleConfirm = () => {
    dispatch(createComment(reply, id._id));
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Reply</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To reply to the post, please add your comment below.
          </DialogContentText>
          <TextField
            id="reply"
            label="Reply"
            multiline
            rows={10}
            fullWidth
            variant="outlined"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddCommentDialog;
