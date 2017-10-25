const api = 'https://cors.shapeshift.io/'

// API list: https://info.shapeshift.io/api
const marketInfo = api + 'marketinfo/' // [coin_coin]
const statusDeposit = api + 'txStat/' // [address]
const rate = api + 'rate/' // [coin_coin]
const limit = api + 'limit/' // [coin_coin]
const timeRemain = api + 'timeremaining/' // [address]
const coinsAvailable = api + 'getcoins'
const addressValidation = api + 'validateAddress/' // [address]/[coinSymbol]
const shapeshift = api + 'shift'

const headers = new Headers({
  'Content-Type': 'application/json'
})

const get = {
  method: 'GET',
  headers
}

const post = {
  method: 'POST',
  headers
}

const get = function (url) {
  const req = new Request(url, get)
  return fetch(req).then((res) => res.json())
}

export const validateAddress = function (coin, symbol) {
  const url = addressValidation + coin + '/' + symbol
  return get(url)
}

export const getCoinsRate = function (coin1, coin2) {
  const url = rate + coin1 + '_' + coin2
  return get(url)
}

export const getCoinsLimit = function (coin1, coin2) {
  const url = limit + coin1 + '_' + coin2
  return get(url)
}

export const getMarketInfo = function (coin1, coin2) {
  const url = marketInfo + coin1 + '_' + coin2
  return get(url)
}

export const getDepositStatus = function (address) {
  const url = statusDeposit + address
  return get(url)
}

export const getDepositTimeRemain = function (address) {
  const url = timeRemain + address
  return get(url)
}

export const getAvailableCoins = function () {
  return get(coinsAvailable)
}

export const coinExchange = function (withdrawal, input, output, returnAddress) {
  const pair = input + '_' + output
  returnAddress = returnAddress || input
  const body = {
    withdrawal,
    pair,
    returnAddress
  }
  const req = {
    ...post,
    body
  }
  const request = new Request(shapeshift, req)
  return fetch(request).then((res) => res.json())
}
