import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import TopBar from './components/TopBar'
import GroupSizeSelector from './components/GroupSizeSelector'
import Groups from './components/Groups'
import groupService from './services/groups'
import './App.css';

// Not very SRP, but this is a small application
const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  }
})

const App = ({classes}) => {
  const [groupSize, setGroupSize] = useState(4)

  function handleGroupSizeChange(event) {
    const size = Number(event.target.value)
    setGroupSize(size)
  }

  const groups = groupService.generateUniqueGroups(groupSize)

  console.log(groups)

  return (
    <>
      <CssBaseline />
      <TopBar />
      <div className={classes.layout}>
        <GroupSizeSelector
          groupSize={groupSize}
          handleGroupSizeChange={handleGroupSizeChange}
        />
        <Groups groups={groups} />
      </div>
    </>
  );
}

export default withStyles(styles)(App);
