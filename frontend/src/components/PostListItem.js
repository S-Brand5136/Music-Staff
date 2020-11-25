import React from "react";

// MaterialUI Imports
import {
  Chip,
  makeStyles,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  MuiListItem: {
    color: "white",
    margin: "1rem",
  },
}));

const PostListItem = () => {
  const classes = useStyles();

  return (
    <>
      <ListItem className={classes.MuiListItem}>
        <ListItemText>
          <Typography>
            Title <Chip label="Announcement" color="primary" size="small" />
          </Typography>
        </ListItemText>
        <ListItemText>
          <Typography>Posted By: Brandon Shemilt</Typography>
        </ListItemText>
        <ListItemText>
          <Typography>Replies: 50</Typography>
        </ListItemText>
      </ListItem>
    </>
  );
};

export default PostListItem;
