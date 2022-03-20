import { Table } from 'semantic-ui-react'

const RatesTable: React.FC<{rates: RatesTableCollection}> = ({rates}) => {

  return (
    <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Institution</Table.HeaderCell>
          <Table.HeaderCell>Price</Table.HeaderCell>
          <Table.HeaderCell>Rate</Table.HeaderCell>
          <Table.HeaderCell>Last update at</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {rates.map((row: RatesTable) => (
          <Table.Row key={row.institution}>
            <Table.Cell>{row.institution}</Table.Cell>
            <Table.Cell>{row.price}</Table.Cell>
            <Table.Cell>{row.rate}</Table.Cell>
            <Table.Cell>{new Date(row.timestamp).toLocaleString()}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default RatesTable