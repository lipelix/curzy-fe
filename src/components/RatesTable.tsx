import { Table } from 'semantic-ui-react'

const RatesTable: React.FC<{rates: RatesCollection}> = ({rates}) => {

  return (
    <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Institution</Table.HeaderCell>
          <Table.HeaderCell>Rate</Table.HeaderCell>
          <Table.HeaderCell>Timestamp</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {rates.map((row: RatesDb) => (
          <Table.Row key={row.institution}>
            <Table.Cell>{row.institution}</Table.Cell>
            <Table.Cell>{row.rate}</Table.Cell>
            <Table.Cell>{row.timestamp}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default RatesTable