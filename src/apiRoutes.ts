export const ROUTES = ((host: string) => {
  const hostname = process.env.NODE_ENV === 'development' ? '' : host

  return {
    RATES: `${hostname}/api/rates`,
    FEES: `${hostname}/api/fees`,
  }
})('https://curzy-api.herokuapp.com')
