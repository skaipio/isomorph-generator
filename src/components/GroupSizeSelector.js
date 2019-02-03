import React from 'react';
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  groupSizeSelector: {
    padding: '5px'
  },
})

const GroupSizeSelector = ({classes}) => {
  return (
    <div className={classes.groupSizeSelector}>
      
    </div>
  );
};

export default withStyles(styles)(GroupSizeSelector);