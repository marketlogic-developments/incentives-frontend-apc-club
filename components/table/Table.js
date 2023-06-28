import React from 'react'

const Table = ({
    containerStyles = "",
    tableStyles = "",
    thStyles = "",
    cols = [],
    children,
  }) => {
  return (
    <div className={`w-full overflow-y-auto ${containerStyles}`}>
      <table className={`w-full table-auto ${tableStyles}`}>
        <thead className={`bg-black ${thStyles}`}>
          <tr>
            {cols.length !== 0 && cols.map((col) => <th className="text-left p-4">{col}</th>)}
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>
    </div>
  )
}

export default Table