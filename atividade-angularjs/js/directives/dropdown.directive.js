/**
 * <app-dropdown label="texto" options="lista" selected="valor" on-select="fn(option)">
 *   options: [{ label, value, action? }]
 *   - "action" (opcional) é um callback próprio de cada opção.
 *   - "on-select" é chamado sempre que qualquer opção é escolhida.
 *   Fecha ao selecionar uma opção, ao clicar fora ou ao pressionar Esc.
 */
(function () {
  'use strict';

  angular.module('app.directives').directive('appDropdown', ['$document', function ($document) {
    return {
      restrict: 'E',
      scope: {
        label: '@',
        options: '<',
        selected: '<?',
        onSelect: '&'
      },
      template: `
        <div class="dropdown" ng-class="{ open: isOpen }">
          <button type="button" class="dropdown-toggle" aria-haspopup="true"
                  aria-expanded="{{ isOpen }}" ng-click="toggle()">
            {{ label }}<span ng-if="selectedLabel()">: <b>{{ selectedLabel() }}</b></span>
            <span class="dropdown-caret" aria-hidden="true">▾</span>
          </button>
          <ul class="dropdown-menu" role="menu" ng-show="isOpen">
            <li ng-repeat="option in options track by $index">
              <button type="button" role="menuitem"
                      ng-class="{ active: option.value === selected }"
                      ng-click="choose(option)">{{ option.label }}</button>
            </li>
          </ul>
        </div>`,
      link: function (scope, element) {
        scope.isOpen = false;

        scope.toggle = function () {
          scope.isOpen = !scope.isOpen;
        };

        scope.selectedLabel = function () {
          if (angular.isUndefined(scope.selected) || !scope.options) { return ''; }
          for (var i = 0; i < scope.options.length; i++) {
            if (scope.options[i].value === scope.selected) { return scope.options[i].label; }
          }
          return '';
        };

        scope.choose = function (option) {
          if (angular.isFunction(option.action)) {
            option.action(option);            // callback específico da opção
          }
          scope.onSelect({ option: option }); // callback geral
          scope.isOpen = false;
        };

        // Fecha ao clicar fora do componente
        function onDocumentClick(event) {
          if (scope.isOpen && !element[0].contains(event.target)) {
            scope.$apply(function () { scope.isOpen = false; });
          }
        }

        // Fecha ao pressionar Esc
        function onKeydown(event) {
          if (scope.isOpen && event.key === 'Escape') {
            scope.$apply(function () { scope.isOpen = false; });
          }
        }

        $document.on('click', onDocumentClick);
        $document.on('keydown', onKeydown);

        // Remove os listeners quando a diretiva é destruída
        scope.$on('$destroy', function () {
          $document.off('click', onDocumentClick);
          $document.off('keydown', onKeydown);
        });
      }
    };
  }]);
})();
