/**
 * <app-toast-container>
 *   Exibe as notificações gerenciadas pelo ToastService.
 *   Basta colocar uma vez na página; qualquer controlador pode chamar o serviço.
 */
(function () {
  'use strict';

  angular.module('app.directives').directive('appToastContainer', ['ToastService', function (ToastService) {
    return {
      restrict: 'E',
      scope: {},
      template: `
        <div class="toast-container" aria-live="polite">
          <div class="toast toast-{{ toast.type }}" role="status"
               ng-repeat="toast in toasts track by toast.id">
            <span class="toast-icon" aria-hidden="true">{{ icons[toast.type] }}</span>
            <span class="toast-message">{{ toast.message }}</span>
            <button type="button" class="toast-close" aria-label="Fechar"
                    ng-click="close(toast.id)">&times;</button>
          </div>
        </div>`,
      link: function (scope) {
        scope.toasts = ToastService.toasts; // mesma referência do serviço
        scope.icons = { success: '✔', error: '✖', info: 'ℹ' };
        scope.close = ToastService.remove;
      }
    };
  }]);
})();
