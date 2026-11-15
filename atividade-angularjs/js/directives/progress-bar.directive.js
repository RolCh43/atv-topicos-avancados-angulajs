/**
 * <app-progress-bar value="0-100" label="texto" show-percent="bool">
 *   Atualiza a largura da barra de acordo com o valor recebido.
 */
(function () {
  'use strict';

  angular.module('app.directives').directive('appProgressBar', function () {
    return {
      restrict: 'E',
      scope: {
        value: '<',
        label: '@?',
        showPercent: '<?'
      },
      template: `
        <div class="progress">
          <div class="progress-header">
            <span>{{ label }}</span>
            <span ng-if="showPercent !== false">{{ percent | number:0 }}%</span>
          </div>
          <div class="progress-track" role="progressbar" aria-valuemin="0"
               aria-valuemax="100" aria-valuenow="{{ percent }}">
            <div class="progress-fill" ng-class="{ complete: percent >= 100 }"
                 ng-style="{ width: percent + '%' }"></div>
          </div>
        </div>`,
      link: function (scope) {
        // Garante que o valor fique sempre entre 0 e 100
        scope.$watch('value', function (newValue) {
          var number = parseFloat(newValue);
          if (isNaN(number)) { number = 0; }
          scope.percent = Math.min(100, Math.max(0, number));
        });
      }
    };
  });
})();
