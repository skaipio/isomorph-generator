import React from 'react';
import Isomorph from './Isomorph'
import Grid from '@material-ui/core/Grid'

const Groups = ({groups}) => {
  const groupCards = () => groups.map((group, i ) => 
    <Isomorph group={group} key={i}/>
  )

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={8}
    >
      { groupCards() }
    </Grid>
  );
};

export default Groups;