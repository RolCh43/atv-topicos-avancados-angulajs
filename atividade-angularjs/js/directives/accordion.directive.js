/**
 * <app-accordion items="lista" allow-multiple="bool">
 *   items: [{ title, content }]
 *   allow-multiple (opcional): permite mais de um item aberto. Padrão: apenas um.
 */
(function () {
  'use strict';

  angular.module('app.directives').directive('appAccordion', function () {
    return {
      restrict: 'E',
      scope: {
        items: '<',
        allowMultiple: '<?'
      },
      template: `
        <div class="accordion">
          <div class="accordion-item" ng-repeat="item in items track by $index"
               ng-class="{ open: isOpen($index) }">
            <button type="button" class="accordion-header"
                    aria-expanded="{{ isOpen($index) }}" ng-click="toggle($index)">
              <span>{{ item.title }}</span>
              <span class="accordion-icon" aria-hidden="true">+</span>
            </button>
            <div class="accordion-panel">
              <div class="accordion-inner"><p>{{ item.content }}</p></div>
            </div>
          </div>
        </div>`,
      link: function (scope) {
        scope.openIndex = null; // modo "um por vez"
        scope.openMap = {};     // modo "vários abertos"

        scope.isOpen = function (index) {
          return scope.allowMultiple ? !!scope.openMap[index] : scope.openIndex === index;
        };

        scope.toggle = function (index) {
          if (scope.allowMultiple) {
            scope.openMap[index] = !scope.openMap[index];
          } else {
            scope.openIndex = scope.openIndex === index ? null : index;
          }
        };

        // Ao trocar de modo, fecha tudo para evitar estados inconsistentes
        scope.$watch('allowMultiple', function (newValue, oldValue) {
          if (newValue !== oldValue) {
            scope.openIndex = null;
            scope.openMap = {};
          }
        });
      }
    };
  });
})();
