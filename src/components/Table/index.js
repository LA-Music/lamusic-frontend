import React from 'react';
import { Table } from 'reactstrap';

const DynamicTable = ({header, body}) => {

  function createRow(){
    var data = []
    for (let a = 0; a < body.length; a++) {
      var row =[]
      for (let b = 0; b < header.length; b++) {
        row.push(
            <td>{body[a][header[b].key]}</td>
        )
      }
      data.push(<tr>{row}</tr>)
    }
    return data
  }

  return (
    <Table borderless>
      <thead>
        <tr>
          {header.map((hd) => (
            <th key={hd.key}>{hd.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {createRow()}
      </tbody>
    </Table>
  )
}

export default DynamicTable