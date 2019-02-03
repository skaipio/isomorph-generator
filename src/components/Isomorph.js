import React from 'react';
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

const styles = theme => ({
  isomorphTable: {
    border: `2px solid ${theme.palette.primary.light}`,
    width: 'auto',
  },
  isomorphCell: {
    border: `1px solid ${theme.palette.primary.light}`,
  }
})

const Isomorph = ({classes}) => {

  const headerCells = () => ['*',1,2,3].map(n =>
    <TableCell align='center' variant='head' className={classes.isomorphCell}>
      {n}
    </TableCell>)
  const tableCells = () => [0,1,2,3].map(n => <TableCell align='center' className={classes.isomorphCell}>{n}</TableCell>)

  return (
    <Card raised={true}>
      <Table className={classes.isomorphTable} padding='dense'>
        <TableHead>
          <TableRow>
            {headerCells()}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {tableCells()}
          </TableRow>
          <TableRow>
            {tableCells()}
          </TableRow>
          <TableRow>
            {tableCells()}
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};

export default withStyles(styles)(Isomorph);