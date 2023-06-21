

// const options = {
//     headers: {
//         'x-access-token': 'coinranking20a96a6c4f14c02c88723dc420a49b198c557f146f3206cb',
//     },
// };
// const fiat = ['USD', 'UAH', 'EUR', 'PLN', 'GBP'];
// fetch('https://api.coinranking.com/v2/reference-currencies?types[]=fiat', options)
//     .then((response) => response.json())
//     .then((result) => {
//         // console.log(result.data.currencies)
//         return result.data.currencies;
//     })
//     .then(res => {
//         res.forEach(element => {
//             for(let i in fiat) {
//                 if (element.symbol == fiat[i]) {
//                     console.log(element);
//                 }
//             }

//         });

//     });

const options = {
    headers: {
        'x-access-token': 'coinranking20a96a6c4f14c02c88723dc420a49b198c557f146f3206cb',
    },
};

const referenceCurrencyUuidUSD = 'yhjMzLPhuIDl';
const referenceCurrencyUuidEUR = '5k-_VTxqtCEI';
const referenceCurrencyUuidGBP = 'Hokyui45Z38f';


fetch(`https://api.coinranking.com/v2/coins?referenceCurrencyUuid=${referenceCurrencyUuidUSD}`, options)
    .then((response) => response.json())
    .then((result) => console.log(result.data.coins[0]));
fetch(`https://api.coinranking.com/v2/coins?referenceCurrencyUuid=${referenceCurrencyUuidEUR}`, options)
    .then((response) => response.json())
    .then((result) => console.log(result.data.coins[0]));
fetch(`https://api.coinranking.com/v2/coins?referenceCurrencyUuid=${referenceCurrencyUuidGBP}`, options)
    .then((response) => response.json())
    .then((result) => console.log(result.data.coins[0]));
