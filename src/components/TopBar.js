import React from 'react';
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  toolbarMain: {
    backgroundColor: theme.palette.primary.light,
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    color: theme.palette.common.white
  },
  toolbarTitle: {
    flex: 1,
  },
})

const TopBar = ({classes}) => {
  return (
    <Toolbar className={classes.toolbarMain}>
      <Typography
        component="h2"
        variant="h5"
        color="inherit"
        align="center"
        noWrap
        className={classes.toolbarTitle}
      >
        Isomorfia
      </Typography>
    </Toolbar>
  );
};

export default withStyles(styles)(TopBar);