import { useEffect, useState } from 'react';
import { Input, Divider, Label } from 'semantic-ui-react'
import axios from 'axios'
import { ROUTES } from '../apiRoutes';
import RatesTable from './RatesTable';

function HomePage() {
  const [rates, setRates] = useState<RatesCollection>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(ROUTES.RATES);

      setRates(result.data);
    };

    fetchData();
  }, []);

  return (
    <div className="HomePage">
      <Input labelPosition='right' type='text'>
        <Label basic>CZK</Label>
        <input />
        <Label basic>Kč</Label>
      </Input>

      <Divider hidden />
    
      <Input labelPosition='right' type='text'>
        <Label basic>EUR</Label>
        <input />
        <Label basic>€</Label>
      </Input>

      <RatesTable rates={rates} />
    </div>
  );
}

export default HomePage;
