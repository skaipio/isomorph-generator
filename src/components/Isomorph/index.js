import React from 'react';
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import HeaderRow from './HeaderRow'
import NonHeaderRow from './NonHeaderRow'

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

const Isomorph = ({classes}) => {
  const tableCells = (classNames) => [1,2,3].map(n =>
    <TableCell
      align='center'
      className={classNames.join(' ')}
      key={n}
    >
      {n}
    </TableCell>)

  const nonHeaderRows = () => [1,2,3].map(n =>
    <NonHeaderRow
      key={n}
      classes={classes}
      firstCellText={n}
    />
  )

  return (
    <Card raised={true}>
      <Table
        className={classes.isomorphTable}
        padding='dense'>
        <TableHead>
          <HeaderRow classes={classes} tableCells={tableCells} />
        </TableHead>
        <TableBody>
          { nonHeaderRows() }
        </TableBody>
      </Table>
    </Card>
  );
};

export default withStyles(styles)(Isomorph);