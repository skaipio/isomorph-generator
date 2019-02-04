import React from 'react';
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

const HeaderRow = ({classes}) => {
  const classNames = [classes.isomorphCell, classes.parameter].join(' ')

  const tableCells = () => [1,2,3].map(n =>
    <TableCell
      align='center'
      className={classNames}
      key={n}
    >
      {n}
    </TableCell>)
    
  return (
    <TableRow>
      <TableCell
        align='center'
        className={classNames}>
          *
      </TableCell>
      {tableCells()}
    </TableRow>
  )
}

export default HeaderRow;