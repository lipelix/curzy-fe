type PaymentTypes = 'CARD' | 'SEPA'

type RatesDb = {
  from: string
  to: string
  rate: number
  timestamp: EpochTimeStamp
  institution: Institutions
  paymentType: PaymentTypes
  fee: number
}

type Fees = {
  BINANCE: {
    CARD: {
      type: 'percentage'
      value: number
    }
    SEPA: {
      type: 'percentage'
      value: number
    }
  }
}

type Institutions = 'REVOLUT' | 'CSOB'

type RatesCollection = Array<RatesDb>

type RatesTable = {
  rate: string
  timestamp: EpochTimeStamp
  institution: Institutions
  price: string
  paymentType: string
  institutionFee: string
  institutionFeePrice: string
  cryptoExchangeFee: string
  cryptoExchangeFeePrice: string
  cheapest: boolean
}

type RatesTableCollection = Array<RatesTable>
