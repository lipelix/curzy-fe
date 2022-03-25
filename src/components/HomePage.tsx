import { useEffect, useState } from 'react';
import { Input, Divider, Label, Header } from 'semantic-ui-react'
import axios from 'axios'
import { ROUTES } from '../apiRoutes';
import RatesTable from './RatesTable';

const computeExchangeRates = (wantAmount: number, rates: RatesCollection, fees: Fees) => {

  return rates
    .map((rate) => {
      const paymentType = rate.paymentType
      const rawPrice = rate.rate * wantAmount
      const institutionFeePrice = rate.fee * wantAmount
      const cryptoExchangeFee = fees.BINANCE[paymentType].value
      const cryptoExchangeFeePrice = (rawPrice + institutionFeePrice) * (fees.BINANCE[paymentType].value / 100) // only Binance for now
      const price = rawPrice + institutionFeePrice + cryptoExchangeFeePrice

      return {
      'rate': rate.rate,
      'timestamp': rate.timestamp,
      'institution': rate.institution,
      'price': price,
      'paymentType': rate.paymentType,
      'institutionFee': rate.fee,
      'institutionFeePrice': institutionFeePrice,
      'cryptoExchangeFee': cryptoExchangeFee,
      'cryptoExchangeFeePrice': cryptoExchangeFeePrice,
    }})
    .sort((a, b) => a.price - b.price)
    .map((rate, index) => ({
      ...rate,
      'rate': `${rate.rate.toFixed(2)} Kč / 1 €`,
      'price': `${rate.price.toFixed(0)} Kč`,
      'institutionFee': `${rate.institutionFee} %`,
      'institutionFeePrice': `${rate.institutionFeePrice.toFixed(0)} Kč`,
      'cryptoExchangeFee': `${rate.cryptoExchangeFee} %`,
      'cryptoExchangeFeePrice': `${rate.cryptoExchangeFeePrice.toFixed(0)} Kč`,
      'cheapest': index === 0
    }))
}

function HomePage() {
  const [rates, setRates] = useState<RatesCollection>([]);
  const [fees, setFees] = useState<Fees>({
    'BINANCE': {
      'CARD': {
        'type': 'percentage',
        'value': 0,
      },
      'SEPA': {
        'type': 'percentage',
        'value': 0,
      }
    }
  });
  const [computedRates, setComputedRates] = useState<RatesTableCollection>([]);

  useEffect(() => {
    const fetchData = async () => {
      const rates = await axios(ROUTES.RATES);
      const fees = await axios(ROUTES.FEES);

      setRates(rates.data);
      setFees(fees.data);
    };

    fetchData();
  }, []);

  return (
    <div className="HomePage">
      <Header size='small' inverted>I want send</Header>
      <Input labelPosition='right' type='number' min={0} step={1} onChange={(event) => {
          const wantAmountValue = parseInt(event.target.value)
          const computedRates = computeExchangeRates(wantAmountValue, rates, fees)
          setComputedRates(computedRates)
        }}>
        <Label basic>EUR</Label>
        <input />
        <Label basic>€</Label>
      </Input>
      <Header size='small' inverted>to</Header>
      <img src="/binance-icon.png" alt='binance-logo' width={200}/>
      {computedRates[0] && <>
        <Divider />
        <Header size='large' inverted>
          {computedRates[0].price}
          <Header.Subheader>
            Pay with <strong>{computedRates[0].institution}</strong>
          </Header.Subheader>
        </Header> 
        <Divider />
        <RatesTable rates={computedRates} />
      </>}

    </div>
  );
}

export default HomePage;
