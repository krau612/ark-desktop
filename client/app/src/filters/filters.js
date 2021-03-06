;(function () {
  'use strict'

  angular.module('arkclient.filters')
    .filter('smallId', function () {
      return function (fullId) {
        return fullId.slice(0, 5) + '...' + fullId.slice(-5)
      }
    })
    .filter('exchangedate', function () {
      return function (exchangetime) {
        return new Date(exchangetime * 1000)
      }
    })
    .filter('amountToCurrency', function () {
      return function (amount, scope) {
        if (typeof amount === 'undefined' || amount == 0) return 0
        var price = scope.ul.connectedPeer.market.price[scope.ul.currency.name]
        return (amount * price).toFixed(5)
      }
    }).filter('formatCurrency', function () {
      return function (val, self) {
        var currencyName = self.currency.name
        var languageCode = self.language.replace('_', '-')
        var options = {
          style: 'currency',
          currency: currencyName,
          currencyDisplay: 'symbol'
        }

        var localeVersion

        if (currencyName === 'btc') {
          localeVersion = 'Ƀ' + val
        } else {
          localeVersion = Number(val).toLocaleString(languageCode, options)
        }

        return localeVersion
      }
    })
})()
