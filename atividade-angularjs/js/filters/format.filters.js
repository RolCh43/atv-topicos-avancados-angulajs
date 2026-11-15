/**
 * Filtros personalizados de formatação.
 *   {{ 199.9 | brl }}                  -> R$ 199,90
 *   {{ 'mouse sem fio' | capitalize }} -> Mouse Sem Fio
 *   {{ texto | truncate:60 }}          -> corta o texto em 60 caracteres
 */
(function () {
  'use strict';

  var filters = angular.module('app.filters');

  filters.filter('brl', function () {
    var formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    return function (value) {
      var number = Number(value);
      return isNaN(number) ? '' : formatter.format(number);
    };
  });

  filters.filter('capitalize', function () {
    return function (text) {
      if (!text) { return ''; }
      return String(text).split(' ').map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }).join(' ');
    };
  });

  filters.filter('truncate', function () {
    return function (text, limit) {
      limit = limit || 50;
      if (!text) { return ''; }
      return text.length > limit ? text.substring(0, limit).trim() + '…' : text;
    };
  });
})();
