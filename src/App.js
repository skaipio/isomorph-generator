import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import TopBar from './components/TopBar'
import GroupSizeSelector from './components/GroupSizeSelector'
import Isomorph from './components/Isomorph'
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

class App extends Component {
  constructor(props) {
    super(props)
    this.classes = props.classes
  }
  render() {
    return (
      <>
        <CssBaseline />
        <TopBar />
        <div className={this.classes.layout}>
          <GroupSizeSelector />
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Isomorph />
          </Grid>
        </div>
      </>
    );
  }
}

export default withStyles(styles)(App);
