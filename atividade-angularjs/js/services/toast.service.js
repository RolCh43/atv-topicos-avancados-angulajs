/**
 * ToastService (factory) - gerencia múltiplas notificações temporárias.
 *
 * Uso:  ToastService.success('Salvo!');  ToastService.error('Falhou');
 *       ToastService.show('Mensagem', 'info', 3000);
 */
(function () {
  'use strict';

  angular.module('app.services').factory('ToastService', ['$timeout', function ($timeout) {
    var DEFAULT_DURATION = 4000; // ms
    var toasts = [];
    var nextId = 1;

    function show(message, type, duration) {
      var toast = { id: nextId++, message: message, type: type || 'info' };
      var time = angular.isNumber(duration) ? duration : DEFAULT_DURATION;

      toasts.push(toast);

      // Remove automaticamente após "time" ms (0 = permanece até fechar)
      if (time > 0) {
        toast.timer = $timeout(function () { remove(toast.id); }, time);
      }
      return toast.id;
    }

    function remove(id) {
      for (var i = 0; i < toasts.length; i++) {
        if (toasts[i].id === id) {
          $timeout.cancel(toasts[i].timer);
          toasts.splice(i, 1);
          return;
        }
      }
    }

    return {
      toasts: toasts,
      show: show,
      remove: remove,
      success: function (message, duration) { return show(message, 'success', duration); },
      error: function (message, duration) { return show(message, 'error', duration); },
      info: function (message, duration) { return show(message, 'info', duration); }
    };
  }]);
})();
