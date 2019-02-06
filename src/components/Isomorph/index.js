import React from 'react';
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import { TableRow } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  isomorphTable: {
    border: `2px solid ${theme.palette.primary.light}`,
    width: 'auto',
  },
  isomorphCell: {
    border: `1px solid ${theme.palette.primary.light}`,
  },
  parameter: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  }
})

const Isomorph = ({classes, group}) => {
  const tableCells = (classNames, row) => row.map(n =>
    <TableCell
      align='center'
      className={classNames.join(' ')}
      key={n}
    >
      {n}
    </TableCell>)

  const rows = () => group.map((row, i) =>
    <TableRow key={i}>
      {tableCells([classes.isomorphCell], row)}
    </TableRow>
  )

  return (
    <Grid item>
      <Card raised={true}>
        <Table
          className={classes.isomorphTable}
          padding='dense'>
          <TableBody>
            { rows() }
          </TableBody>
        </Table>
      </Card>
    </Grid>
  );
};

export default withStyles(styles)(Isomorph);