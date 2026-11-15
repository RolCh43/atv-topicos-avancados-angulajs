/**
 * <app-pagination total-pages="n" current-page="p" on-page-change="fn(page)">
 *   Desabilita "Anterior"/"Próxima" quando não aplicável e destaca a página atual.
 */
(function () {
  'use strict';

  angular.module('app.directives').directive('appPagination', function () {
    return {
      restrict: 'E',
      scope: {
        totalPages: '<',
        currentPage: '<',
        onPageChange: '&'
      },
      template: `
        <nav class="pagination" aria-label="Paginação">
          <button type="button" class="page-btn" ng-disabled="currentPage <= 1"
                  ng-click="goTo(currentPage - 1)">&lsaquo; Anterior</button>
          <button type="button" class="page-btn" ng-repeat="page in pages track by page"
                  ng-class="{ active: page === currentPage }" ng-click="goTo(page)">{{ page }}</button>
          <button type="button" class="page-btn" ng-disabled="currentPage >= totalPages"
                  ng-click="goTo(currentPage + 1)">Próxima &rsaquo;</button>
          <span class="page-info">Página {{ currentPage }} de {{ totalPages }}</span>
        </nav>`,
      link: function (scope) {
        // Recalcula a lista de páginas sempre que o total mudar
        scope.$watch('totalPages', function (total) {
          scope.pages = [];
          for (var i = 1; i <= (total || 0); i++) {
            scope.pages.push(i);
          }
        });

        scope.goTo = function (page) {
          if (page < 1 || page > scope.totalPages || page === scope.currentPage) { return; }
          scope.onPageChange({ page: page }); // callback para o controlador pai
        };
      }
    };
  });
})();
