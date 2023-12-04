import './Table.css'

import React, { FC } from 'react'

interface ITableProps {
  array: number[][]
}

const Table: FC<ITableProps> = ({ array }) => (
  <div className='matrix-multiplication'>
    <div>
      <pre>{array.map(row => row.join(' ')).join('\n')}</pre>
    </div>
  </div>
)

export default Table
