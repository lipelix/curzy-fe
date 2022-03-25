import { Header, Label, Table } from 'semantic-ui-react'

const RatesTable: React.FC<{rates: RatesTableCollection}> = ({rates}) => {

  return (
    <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Institution</Table.HeaderCell>
          <Table.HeaderCell>Price</Table.HeaderCell>
          <Table.HeaderCell>Fee</Table.HeaderCell>
          <Table.HeaderCell>Type</Table.HeaderCell>
          <Table.HeaderCell>
            <Header as='h2'>
              Rate
              <Header.Subheader>
                Last updated
              </Header.Subheader>
            </Header>               
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {rates.map((row: RatesTable) => (
          <Table.Row key={row.institution}>
            <Table.Cell>{row.cheapest && <Label ribbon color='green' style={{display: 'block', margin: '-2em 0 1em -1em'}}>Cheapest</Label>}<span>{row.institution}</span></Table.Cell>
            <Table.Cell>
              <Header as='h1'>
                {row.price}
              </Header>              
            </Table.Cell>
            <Table.Cell>
              <Header as='h2'>
                {row.cryptoExchangeFeePrice}
                <Header.Subheader>
                  {row.cryptoExchangeFee}
                </Header.Subheader>
              </Header> 
            </Table.Cell>
            <Table.Cell>{row.paymentType}</Table.Cell>
            <Table.Cell>
              <Header as='h2'>
                {row.rate}
                <Header.Subheader>
                  {new Date(row.timestamp).toLocaleString()}
                </Header.Subheader>
              </Header>               
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default RatesTable