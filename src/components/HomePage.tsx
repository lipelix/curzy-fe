import { useEffect, useState } from 'react';
import { Input, Divider, Label } from 'semantic-ui-react'
import axios from 'axios'
import { ROUTES } from '../apiRoutes';
import RatesTable from './RatesTable';

const computeExchangeRates = (wantAmount: number, rates: RatesCollection) => {
  return rates
    .map((rate) => ({
      'rate': rate.rate,
      'timestamp': rate.timestamp,
      'institution': rate.institution,
      'price': (rate.rate * wantAmount),
    }))
    .sort((a, b) => a.price - b.price)
    .map((rate) => ({
      ...rate,
      'rate': rate.rate.toFixed(4),
      'price': `${rate.price.toFixed(2)} Kč`,
    }))
}

function HomePage() {
  const [rates, setRates] = useState<RatesCollection>([]);
  const [computedRates, setComputedRates] = useState<RatesTableCollection>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(ROUTES.RATES);

      setRates(result.data);
    };

    fetchData();
  }, []);

  return (
    <div className="HomePage">
      <span>I want </span>
      <Input labelPosition='right' type='text' onChange={(event) => {
          const wantAmountValue = parseInt(event.target.value)
          setComputedRates(computeExchangeRates(wantAmountValue, rates))
        }}>
        <Label basic>EUR</Label>
        <input />
        <Label basic>€</Label>
      </Input>
      {computedRates[0] && <>
        <Divider />
        <span>I will pay <strong>{computedRates[0].price}</strong> in {computedRates[0].institution}</span>
        <Divider />
        <RatesTable rates={computedRates} />
      </>}

    </div>
  );
}

export default HomePage;
