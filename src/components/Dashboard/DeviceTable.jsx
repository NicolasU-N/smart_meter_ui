import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useTable, useSortBy } from 'react-table'
import { format } from 'date-fns'

function DevicesTable () {
  const { devices } = useSelector(state => state.devices)

  const columns = useMemo(
    () => [
      {
        id: 'id',
        Header: 'ID',
        accessor: 'id'
      },
      {
        id: 'eui',
        Header: 'EUI',
        accessor: 'eui',
        disableSortBy: true
      },
      {
        id: 'rssi',
        Header: 'RSSI',
        accessor: 'rssi'
      },
      {
        id: 'snr',
        Header: 'SNR',
        accessor: 'snr'
      },
      {
        id: 'volume',
        Header: 'Volume',
        accessor: 'volume',
        Cell: ({ value }) => `${value} L`
      },
      {
        id: 'battery_percentage',
        Header: 'Battery',
        accessor: 'battery_level',
        Cell: ({ value }) => `${value}%`
      },
      {
        id: 'created_at',
        Header: 'Last update',
        accessor: 'created_at',
        Cell: ({ value }) => format(new Date(value), 'dd/MM/yyyy HH:mm:ss')
      },
      {
        id: 'details',
        Header: '',
        accessor: 'id',
        disableSortBy: true,
        Cell: ({ value }) => (
          <Link to={`/devices/${value}/history`} className='btn btn-primary'>
            View Details
          </Link>
        )
      }
    ],
    []
  )

  const data = useMemo(() => devices, [devices])

  const tableInstance = useTable({ columns, data }, useSortBy)

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = tableInstance

  return (
    <div className='table-responsive'>
      <table className='table table-striped table-hover table-bordered' {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className='text-center px-2'
                  key={column.id}
                >
                  {column.render('Header')}
                  <span>
                    {column.canSort ? column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ' ▶️' : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map(cell => (
                  <td
                    {...cell.getCellProps()}
                    className='text-center px-2'
                    key={cell.column.id}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default DevicesTable
