/**
 * MainController - orquestra os componentes da página.
 * Usa $scope para expor dados e funções à view (two-way data binding).
 */
(function () {
  'use strict';

  angular.module('app.controllers').controller('MainController', [
    '$scope', '$filter', '$interval', 'ProductService', 'ContentService', 'ToastService',
    function ($scope, $filter, $interval, ProductService, ContentService, ToastService) {
      var PAGE_SIZE = 6;
      var allProducts = ProductService.getAll();
      var sortState = { field: '', reverse: false };
      var uploadTimer = null;
      var capitalize = $filter('capitalize');

      /* ---------- Idioma (Dropdown no cabeçalho) ---------- */
      $scope.languages = ContentService.getLanguages();
      $scope.texts = ContentService.getTexts();
      $scope.language = 'pt';

      $scope.changeLanguage = function (option) {
        $scope.language = option.value;
        ToastService.info('Idioma alterado para ' + option.label + '.');
      };

      /* ---------- Produtos (Paginação + Dropdowns de filtro) ---------- */
      $scope.cart = [];
      $scope.filters = { search: '', category: '' };
      $scope.currentPage = 1;
      $scope.totalPages = 1;

      $scope.categories = [{ label: 'Todas', value: '' }].concat(
        ProductService.getCategories().map(function (category) {
          return { label: capitalize(category), value: category };
        })
      );

      // Cada opção possui seu próprio callback (action)
      $scope.currentSort = '';
      $scope.sortOptions = [
        { label: 'Menor preço', value: 'price-asc', action: function () { setSort('price', false); } },
        { label: 'Maior preço', value: 'price-desc', action: function () { setSort('price', true); } },
        { label: 'Nome (A-Z)', value: 'name-asc', action: function () { setSort('name', false); } },
        { label: 'Nome (Z-A)', value: 'name-desc', action: function () { setSort('name', true); } }
      ];

      function setSort(field, reverse) {
        sortState = { field: field, reverse: reverse };
        $scope.refreshList(true);
      }

      function updatePage() {
        var begin = ($scope.currentPage - 1) * PAGE_SIZE;
        $scope.pagedProducts = $filter('limitTo')($scope.filteredProducts, PAGE_SIZE, begin);
      }

      // Aplica busca, categoria e ordenação usando os filtros nativos do AngularJS
      $scope.refreshList = function (resetPage) {
        var list = allProducts;

        if ($scope.filters.search) {
          list = $filter('filter')(list, { name: $scope.filters.search });
        }
        if ($scope.filters.category) {
          list = $filter('filter')(list, { category: $scope.filters.category }, true);
        }
        if (sortState.field) {
          list = $filter('orderBy')(list, sortState.field, sortState.reverse);
        }

        $scope.filteredProducts = list;
        $scope.totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
        if (resetPage || $scope.currentPage > $scope.totalPages) {
          $scope.currentPage = 1;
        }
        updatePage();
      };

      $scope.selectCategory = function (option) {
        $scope.filters.category = option.value;
        $scope.refreshList(true);
      };

      $scope.onSortSelected = function (option) {
        $scope.currentSort = option.value;
        ToastService.info('Ordenação: ' + option.label + '.');
      };

      $scope.changePage = function (page) {
        $scope.currentPage = page;
        updatePage();
      };

      $scope.addToCart = function (product) {
        $scope.cart.push(product);
        ToastService.success(capitalize(product.name) + ' adicionado ao carrinho!');
      };

      /* ---------- Upload (Barra de Progresso) ---------- */
      $scope.upload = { progress: 0, running: false };

      function stopUpload() {
        if (uploadTimer) {
          $interval.cancel(uploadTimer);
          uploadTimer = null;
        }
        $scope.upload.running = false;
      }

      $scope.startUpload = function (shouldFail) {
        if ($scope.upload.running) { return; }
        $scope.upload.progress = 0;
        $scope.upload.running = true;
        ToastService.info('Upload iniciado...');

        uploadTimer = $interval(function () {
          var step = Math.floor(Math.random() * 9) + 3; // 3 a 11%
          $scope.upload.progress = Math.min(100, $scope.upload.progress + step);

          if (shouldFail && $scope.upload.progress >= 60) {
            stopUpload();
            ToastService.error('Falha no upload: conexão perdida.');
          } else if ($scope.upload.progress >= 100) {
            stopUpload();
            ToastService.success('Upload concluído com sucesso!');
          }
        }, 200);
      };

      $scope.resetUpload = function () {
        stopUpload();
        $scope.upload.progress = 0;
      };

      $scope.onProgressChange = function () {
        if ($scope.upload.progress === 100) {
          ToastService.success('Progresso manual chegou a 100%!');
        }
      };

      /* ---------- Abas ---------- */
      $scope.profileTabs = ContentService.getProfileTabs();
      $scope.activeTabTitle = $scope.profileTabs[0].title;
      $scope.onTabChange = function (tab) {
        $scope.activeTabTitle = tab.title;
      };

      /* ---------- Acordeão ---------- */
      $scope.faqItems = ContentService.getFaq();
      $scope.faqAllowMultiple = false;

      /* ---------- Toast ---------- */
      $scope.toastTypes = ContentService.getToastTypes();
      $scope.toastForm = { message: 'Alterações salvas com sucesso!', type: 'success' };

      $scope.showCustomToast = function () {
        var message = ($scope.toastForm.message || '').trim();
        if (!message) {
          ToastService.error('Digite uma mensagem antes de exibir a notificação.');
          return;
        }
        ToastService.show(message, $scope.toastForm.type);
      };

      /* ---------- Inicialização / limpeza ---------- */
      $scope.refreshList(true);
      ToastService.info('Bem-vindo! Explore os componentes da página.');

      $scope.$on('$destroy', stopUpload);
    }
  ]);
})();
