import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Table } from 'semantic-ui-react'
import { ROUTES } from '../apiRoutes'

const RatesTable = () => {
  const [data, setData] = useState({ rates: [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(ROUTES.RATES);

      setData({ rates: result.data });
    };

    fetchData();
  }, []);

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
        {data.rates.map((row: RatesDb) => (
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