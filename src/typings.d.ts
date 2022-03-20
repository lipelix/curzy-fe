type RatesDb = {
  'from': String,
  'to': String,
  'rate': number,
  'timestamp': EpochTimeStamp,
  'institution': Institutions
}

type Institutions =
  'REVOLUT' |
  'CSOB'

type RatesCollection = Array<RatesDb>