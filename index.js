import axios from "axios";

const api = "https://cors.shapeshift.io/";

// API list: https://info.shapeshift.io/api
const marketInfo = api + "marketinfo/"; // [coin_coin]
const statusDeposit = api + "txStat/"; // [address]
const rate = api + "rate/"; // [coin_coin]
const limit = api + "limit/"; // [coin_coin]
const timeRemain = api + "timeremaining/"; // [address]
const coinsAvailable = api + "getcoins";
const addressValidation = api + "validateAddress/"; // [address]/[coinSymbol]
const shapeshift = api + "shift";

export const validateAddress = function(coin, symbol) {
  const url = addressValidation + coin + "/" + symbol;
  return axios.get(url);
};

export const getCoinsRate = function(coin1, coin2) {
  const url = rate + coin1 + "_" + coin2;
  return axios.get(url);
};

export const getCoinsLimit = function(coin1, coin2) {
  const url = limit + coin1 + "_" + coin2;
  return axios.get(url);
};

export const getMarketInfo = function(coin1, coin2) {
  const url = marketInfo + coin1 + "_" + coin2;
  return axios.get(url);
};

export const getDepositStatus = function(address) {
  const url = statusDeposit + address;
  return axios.get(url);
};

export const getDepositTimeRemain = function(address) {
  const url = timeRemain + address;
  return axios.get(url);
};

export const getAvailableCoins = function() {
  return axios.get(coinsAvailable);
};

export const coinExchange = function(withdrawal, input, output, returnAddress) {
  const pair = input + "_" + output;
  returnAddress = returnAddress || input;
  const body = {
    withdrawal,
    pair,
    returnAddress
  };
  return axios.post(shapeshift, body);
};
