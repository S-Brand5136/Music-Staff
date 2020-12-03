import React, { useState } from "react";

// Material UI Imports
import { Close } from "@material-ui/icons";
import { Collapse, IconButton } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const Message = ({ message, variant }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Collapse in={open}>
        <Alert
          style={{ width: "75%" }}
          variant="filled"
          severity={variant}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <Close fontSize="inherit" />
            </IconButton>
          }
        >
          {message}
        </Alert>
      </Collapse>
    </div>
  );
};

export default Message;
