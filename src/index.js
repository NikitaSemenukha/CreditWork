$(document).ready(function () {
    'use strict';
    const bitcoin = "Qwsogvtv82FCd";
    const ethereum = "razxDUgYGNAdQ";
    const litecoin = "D7B1x_ks7WhV5";
    const referenceCurrencyUuidUSD = 'yhjMzLPhuIDl';
    const referenceCurrencyUuidEUR = '5k-_VTxqtCEI';
    const referenceCurrencyUuidGBP = 'Hokyui45Z38f';
    var uuid = bitcoin;
    var time = "24h";
    var referenceCurrencyUuid = referenceCurrencyUuidUSD; // Default reference currency is USD
    let myChart;

    getCoinData(uuid, time, referenceCurrencyUuid);

    function getCoinData(currency, timeframe, referenceCurrency) {
        console.log("getCoinData Success");
        var baseUrl = "https://api.coinranking.com/v2/coin/" + currency + "?timePeriod=" + timeframe + "&referenceCurrencyUuid=" + referenceCurrency;
        var apiKey = "coinranking20a96a6c4f14c02c88723dc420a49b198c557f146f3206cb";
        $(`#${timeframe}`).prop("checked", true).css("border", "4px solid green");
        fetch(`${baseUrl}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `${apiKey}`,
                'Access-Control-Allow-Origin': "*"
            }
        }).then((response) => {
            if (response.ok) {
                response.json().then((json) => {
                    console.log("getCoinDataResponse Success");
                    handlerFunction(json.data);
                });
            }
        });
    }

    function handlerFunction(data) {
        console.log(data);
        if (myChart) {
            console.log("destroying old chart.");
            myChart.destroy();
            $("#currentPrice").empty();
            $("img").attr("src", "#");
            $("#percentChange").empty();
            $("#infoContainer").empty();
        }
        let coinsData = data.coin;
        var price = Math.round((parseFloat(coinsData.price) + Number.EPSILON) * 100) / 100;
        $("#currency").text(coinsData.name);
        $("img").attr("src", coinsData.iconUrl);
        $("#currentPrice").text(price);

        var change = Math.round((parseFloat(coinsData.change) + Number.EPSILON) * 100) / 100;

        $("#percentChange").text(change);
        if (change > 0) {
            $("#percentChange").css("color", "green").prepend("+").append("%");
        } else {
            $("#percentChange").css("color", "red").append("%");
        }

        $('#cryptoList').change(function () {
            var selectedCurrency = $(this).val();
            convertCurrency(selectedCurrency);
        });

        var description = `<p>${coinsData.description}</p>`;
        $("#infoContainer").append(description);

        var ctx = document.getElementById('myChart');
        myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
                datasets: [{
                    data: coinsData.sparkline,
                    label: coinsData.symbol,
                    lineTension: 0,
                    backgroundColor: 'transparent',
                    borderColor: coinsData.color,
                    borderWidth: 4,
                    pointBackgroundColor: coinsData.color,
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: false,
                            callback: function (value, index, values) {
                                return '$' + value;
                            }
                        }
                    }]
                },
                legend: {
                    display: true,
                }
            }
        });
    }

    $('.currency-button').click(function () {
        var currency = $(this).data('currency');
        convertCurrency(currency);
    });

    $('input:radio[name=options]').on("click", function () {
        if (time != $("input[name=options]:checked").val()) {
            time = $("input[name=options]:checked").val();
            console.log(time);
            getCoinData(uuid, time, referenceCurrencyUuid);
        }
    });

    $('input:radio[name=currencyOptions]').on("click", function () {
        var currencyOption = $(this).val();
        switch (currencyOption) {
            case "USD":
                referenceCurrencyUuid = referenceCurrencyUuidUSD;
                break;
            case "EUR":
                referenceCurrencyUuid = referenceCurrencyUuidEUR;
                break;
            case "GBP":
                referenceCurrencyUuid = referenceCurrencyUuidGBP;
                break;
        }
        getCoinData(uuid, time, referenceCurrencyUuid);
    });

    // function convertCurrency(currency) {
    //     switch (currency) {
    //         case "USD":
    //             uuid = bitcoin;
    //             referenceCurrencyUuid = referenceCurrencyUuidUSD;
    //             break;
    //         case "EUR":
    //             uuid = ethereum;
    //             referenceCurrencyUuid = referenceCurrencyUuidEUR;
    //             break;
    //         case "GBP":
    //             uuid = litecoin;
    //             referenceCurrencyUuid = referenceCurrencyUuidGBP;
    //             break;
    //     }
    //     getCoinData(uuid, time, referenceCurrencyUuid);
    // }

    function convertCurrency(currency) {
        switch (currency) {
            case "0":
                uuid = bitcoin;
                break;
            case "1":
                uuid = ethereum;
                break;
            case "2":
                uuid = litecoin;
                break;
        }
        getCoinData(uuid, time, referenceCurrencyUuid);
    }
});