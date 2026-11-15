/**
 * <app-tabs tabs="lista" on-tab-change="fn(index, tab)">
 *   tabs: [{ title, content, items? }]
 *   A aba ativa é controlada no $scope da própria diretiva.
 */
(function () {
  'use strict';

  angular.module('app.directives').directive('appTabs', function () {
    return {
      restrict: 'E',
      scope: {
        tabs: '<',
        onTabChange: '&?'
      },
      template: `
        <div class="tabs">
          <div class="tab-list" role="tablist">
            <button type="button" class="tab" role="tab"
                    ng-repeat="tab in tabs track by $index"
                    ng-class="{ active: $index === activeIndex }"
                    aria-selected="{{ $index === activeIndex }}"
                    ng-click="select($index)">{{ tab.title }}</button>
          </div>
          <div class="tab-panel" role="tabpanel" ng-if="tabs[activeIndex]">
            <p>{{ tabs[activeIndex].content }}</p>
            <ul ng-if="tabs[activeIndex].items">
              <li ng-repeat="item in tabs[activeIndex].items track by $index">{{ item }}</li>
            </ul>
          </div>
        </div>`,
      link: function (scope) {
        scope.activeIndex = 0;

        scope.select = function (index) {
          if (index === scope.activeIndex) { return; }
          scope.activeIndex = index;
          if (scope.onTabChange) {
            scope.onTabChange({ index: index, tab: scope.tabs[index] });
          }
        };
      }
    };
  });
})();
