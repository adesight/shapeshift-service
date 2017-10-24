const api = 'https://cors.shapeshift.io/'

// API list: https://info.shapeshift.io/api
const marketInfo = api + 'marketinfo/' // [coin_coin]
const statusDeposit = api + 'txStat/' // [address]
const rate = api + 'rate/' // [coin_coin]
const limit = api + 'limit/' // [coin_coin]
const timeRemain = api + 'timeremaining/' // [address]
const coinsAvailable = api + 'getcoins'
const addressValidation = api + 'validateAddress/' //[address]/[coinSymbol]
const shapeshift = api + 'shift'

const headers = new Headers({
    'API-MODULE': 'shapeshift-service'
})

const get = {
    method: 'GET',
    headers,
}

const post = {
    method: 'POST',
    headers,
}

export const validateAddress = function(coin, symbol) {
    const url = addressValidation + coin + '/' + symbol
    const requst = new Request(url, get)
    return fetch(requst).then((res) => res.json())
}

export const getCoinsRate = function(coin1, coin2) {
    const url = rate + coin1 + '_' + coin2
    const requst = new Request(url, get)
    return fetch(requst).then((res) => res.json())
}

export const getCoinsLimit = function(coin1, coin2) {
    const url = limit + coin1 + '_' + coin2
    const requst = new Request(url, get)
    return fetch(requst).then((res) => res.json())
}


export const getMarketInfo = function(coin1, coin2) {
    const url = marketInfo + coin1 + '_' + coin2
    const requst = new Request(url, get)
    return fetch(requst).then((res) => res.json())
}

export const getDepositStatus = function(address) {
    const url = statusDeposit + address
    const requst = new Request(url, get)
    return fetch(requst).then((res) => res.json())
}

export const getDepositTimeRemain = function(address) {
    const url = timeRemain + address
    const requst = new Request(url, get)
    return fetch(requst).then((res) => res.json())
}

export const getAvailabelCoins = function() {
    const request = new Request(coinsAvailable, get)
    return fetch(request).then((res) => res.json())
}

export const coinExchange = function(withdrwal, input, output, returnAddress) {
    const pair = input + '_' + output
    returnAddress = returnAddress || input
    const body = {
        withdrwal,
        pair,
        returnAddress
    }
    const req = { ...post,
        ['body']: body
    }
    const request = new Request(pair, req)
    return fetch(request).then((res) => res.json())
}