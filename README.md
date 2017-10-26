# shapeshift-service
[Shapeshift](https://shapeshift.io/) API Module for browser,using Fetch API and ES6+.

## Usage 

```js
import * as shapeshift from 'shapeshift-service'
```
All methods will return a Promise,for example

```js
shapeshift.getAvailableCoins().then((res) => {
    // The res is a plain object
    console.log(res)
})
```

### Get all available coins

```js
shapeshift.getAvailableCoins()
```

Success Output:

```
{
    "SYMBOL1" :
        {
            name: ["Currency Formal Name"],
            symbol: <"SYMBOL1">,
            image: ["https://shapeshift.io/images/coins/coinName.png"],
            status: [available / unavailable]
        }
}
```
### Validate receive Address
```js
shapeshift.validateAddress(address,symbol)
```

Success Output:

```
{
   isValid: [true / false],
   error: [(if isvalid is false, there will be an error message)]
}
```

### Get coin pair rate

```js
shapeshift.getCoinRate(coin1,coin2)
```

Success Output:

 ```
{
    "pair" : "btc_ltc",
    "rate" : "70.1234"
}
```

### Get Depsit Limit
Gets the current deposit limit set by Shapeshift. Amounts deposited over this limit will be sent to the return address if one was entered, otherwise the user will need to contact ShapeShift support to retrieve their coins. This is an estimate because a sudden market swing could move the limit.

```js
shapeshift.getCoinsLimit(coin1,coin2)
```

Success Output:

```
    {
        "pair" : "btc_ltc",
        "limit" : "1.2345"
    }
```

### Get Market Info
This gets the market info (pair, rate, limit, minimum limit, miner fee)

```js
shapeshift.getMarketInfo(coin1,coin2)
```

Success Output:

```
    {
        "pair"     : "btc_ltc",
        "rate"     : 130.12345678,
        "limit"    : 1.2345,
        "min"      : 0.02621232,
        "minerFee" : 0.0001
    }
```

### Get deposit address status

```js
shapeshift.getDepositStatus(depositAddress)
```

```
// Status: No Deposits Received
    {
        status:"no_deposits",
        address:[address]           //matches address submitted
    },
 
// Status: Received (we see a new deposit but have not finished processing it)
    {
        status:"received",
        address:[address]   //matches address submitted
    },
 
// Status: Complete
{
    status : "complete",
    address: [address],
    withdraw: [withdrawal address],
    incomingCoin: [amount deposited],
    incomingType: [coin type of deposit],
    outgoingCoin: [amount sent to withdrawal address],
    outgoingType: [coin type of withdrawal],
    transaction: [transaction id of coin sent to withdrawal address]
},
 
// Status: Failed
{
    status : "failed",
    error: [Text describing failure]
}
```

### Get deposit time remain

```js
shapeshift.getDepositTimeRemain(address)
```

Success Output:

 ```
    {
        status:"pending",
        seconds_remaining: 600
    }
 ```

### Exchange Coin
withdrawal = the address for resulting coin to be sent to
pair = what coins are being exchanged in the form [input coin]_[output coin]  ie btc_ltc
returnAddress  = (Optional) address to return deposit to if anything goes wrong with exchange

```js
shapeshift.coinExchange(withdrawal, input, output, returnAddress?)
```

Success Output:

```
    {
        deposit: [Deposit Address (or memo field if input coin is BTS / BITUSD)],
        depositType: [Deposit Type (input coin symbol)],
        withdrawal: [Withdrawal Address], //-- will match address submitted in post
        withdrawalType: [Withdrawal Type (output coin symbol)],
        public: [NXT RS-Address pubkey (if input coin is NXT)],
        xrpDestTag : [xrpDestTag (if input coin is XRP)],
        apiPubKey: [public API attached to this shift, if one was given]
    }  
```

## Fetch API polyfill
Old [browsers](https://caniuse.com/#search=fetch) doesn't support Fetch API,Chrome 42+ and Firefox 39+ supports Fetch API,Maybe you need fetch JavaScript [polyfill](https://github.com/github/fetch).

```
yarn add whatwg-fetch 
// or
npm i whatwg-fetch -S
``` 

## TODO
- [x] UEAGE
- [ ] TESTING