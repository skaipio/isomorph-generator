import React from 'react';
import { withStyles } from '@material-ui/core/styles'
import { FormControl, FormLabel, Input } from '@material-ui/core';

const styles = theme => ({
  groupSizeSelector: {
    display: 'flex',
    justifyContent: 'center',
    padding: '5px'
  },
  input: {
    textAlign: 'center'
  }
})

const GroupSizeSelector = ({classes, groupSize, handleGroupSizeChange}) => {
  // override the input style
  const inputStyle = {
    input: classes.input
  }

  return (
    <div className={classes.groupSizeSelector}>
      <FormControl>
        <FormLabel>Select group size for isomorphs</FormLabel>
        <Input
          onChange={handleGroupSizeChange}
          classes={inputStyle}
          defaultValue={groupSize}
          type='number'
        >
          { groupSize }
        </Input>
      </FormControl>
    </div>
  );
};

export default withStyles(styles)(GroupSizeSelector);