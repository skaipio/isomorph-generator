import React from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

const NonHeaderRow = ({classes, firstCellText}) => {
  const tableCells = () => [1,2,3].map(n =>
    <TableCell
      align='center'
      className={classes.isomorphCell}
      key={n}
    >
      {n}
    </TableCell>)

  return (
    <TableRow>
      <TableCell
        align='center'
        className={[classes.isomorphCell, classes.parameter].join(' ')}>
        {firstCellText}
      </TableCell>
      {tableCells()}
    </TableRow>
  )
}

export default NonHeaderRow;