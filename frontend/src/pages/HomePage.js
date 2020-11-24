import React from "react";

// MaterialUI Imports
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  InputLabel,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Paper,
  Typography,
  Input,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
    backgroundColor: "#8D8C8A",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    color: "white",
  },
  iconButton: {
    padding: 10,
    color: "white",
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const HomePage = () => {
  const classes = useStyles();

  return (
    <Box>
      <Grid container direction="row">
        <Grid item lg={12}>
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="flex-end"
            spacing={5}
          >
            <Grid item xl={7} xs={12} md={8}>
              <Typography variant="h3">General</Typography>
            </Grid>

            <Grid item xl={4} xs={12} md={8}>
              <Paper component="form" className={classes.root}>
                <InputBase
                  className={classes.input}
                  placeholder="Search Forum..."
                  inputProps={{ "aria-label": "search google maps" }}
                />
                <Divider className={classes.divider} orientation="vertical" />
                <IconButton
                  type="submit"
                  aria-label="search"
                  className={classes.iconButton}
                >
                  <Search />
                </IconButton>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xl={12}>
          <Grid container>
            <Grid item>
              <Typography>Discussions</Typography>
            </Grid>

            <Grid item>
              <List>
                <ListItem>
                  <ListItemText>
                    <Typography>Title</Typography>
                  </ListItemText>
                  <Chip label="Announcement" color="primary" />

                  <ListItemText>
                    <Typography>Posted By: Brandon Shemilt</Typography>
                  </ListItemText>
                  <ListItemText>
                    <Typography>Replies: 50</Typography>
                  </ListItemText>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
