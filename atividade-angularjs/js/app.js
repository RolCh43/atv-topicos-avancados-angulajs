/**
 * app.js - Módulo principal da aplicação.
 *
 * Cria os submódulos (serviços, filtros, diretivas e controladores) e o
 * módulo 'app', que orquestra todos eles. Os demais arquivos apenas
 * recuperam o módulo correspondente (getter) e registram seus itens.
 */
(function () {
  'use strict';

  angular.module('app.services', []);
  angular.module('app.filters', []);
  angular.module('app.directives', ['app.services']);
  angular.module('app.controllers', ['app.services']);

  angular.module('app', [
    'app.services',
    'app.filters',
    'app.directives',
    'app.controllers'
  ]);
})();
