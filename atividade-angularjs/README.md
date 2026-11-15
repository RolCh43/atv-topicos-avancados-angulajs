# Atividade AngularJS – Componentes Visuais

Aplicação web responsiva feita com **AngularJS 1.8**. Ela tem os 6 componentes pedidos, todos criados como diretivas.

## Como executar

**Opção 1:** abrir o arquivo `index.html` no navegador. É preciso ter internet, porque o AngularJS é carregado por CDN.

**Opção 2 (GitHub Codespaces ou servidor local):**

```bash
python3 -m http.server 8080
# ou
npx serve .
```

Depois é só acessar `http://localhost:8080`.

## Estrutura

```
atividade-angularjs/
├── index.html                      # View principal
├── css/style.css                   # Estilos responsivos (mobile first)
└── js/
    ├── app.js                      # Módulo principal (orquestra os submódulos)
    ├── controllers/
    │   └── main.controller.js      # MainController ($scope)
    ├── services/
    │   ├── product.service.js      # factory: produtos
    │   ├── content.service.js      # service: FAQ, abas, idiomas
    │   └── toast.service.js        # factory: gerenciamento de toasts
    ├── filters/
    │   └── format.filters.js       # brl, capitalize, truncate
    └── directives/
        ├── accordion.directive.js
        ├── pagination.directive.js
        ├── progress-bar.directive.js
        ├── tabs.directive.js
        ├── dropdown.directive.js
        └── toast-container.directive.js
```

## Componentes (diretivas)

| Componente | Diretiva | Bindings |
| --- | --- | --- |
| Acordeão | `<app-accordion>` | `items` (`<`), `allow-multiple` (`<?`) |
| Paginação | `<app-pagination>` | `total-pages` (`<`), `current-page` (`<`), `on-page-change` (`&`) |
| Barra de Progresso | `<app-progress-bar>` | `value` (`<`), `label` (`@`), `show-percent` (`<?`) |
| Abas | `<app-tabs>` | `tabs` (`<`), `on-tab-change` (`&?`) |
| Menu Suspenso | `<app-dropdown>` | `label` (`@`), `options` (`<`), `selected` (`<?`), `on-select` (`&`) + `action` por opção |
| Toast | `ToastService` + `<app-toast-container>` | `ToastService.success/error/info(msg, duração)` |

## Conceitos demonstrados

| Conceito | Onde |
| --- | --- |
| Módulos | `app.js` (`app` + `app.services`, `app.filters`, `app.directives`, `app.controllers`) |
| Controladores e `$scope` | `main.controller.js` |
| Two-way binding (`ng-model`) | busca, slider de progresso, checkbox do FAQ, mensagem do toast |
| Services e factories | `ProductService` e `ToastService` (factory), `ContentService` (service) |
| Filtros personalizados | `brl`, `capitalize`, `truncate` |
| Filtros nativos | `filter`, `orderBy`, `limitTo`, `number` |
| Eventos | `ng-click`, `ng-change`, eventos de `document` (clique fora/Esc) |
| Responsividade | CSS Grid/Flexbox com breakpoints em 640px (tablet) e 1024px (desktop) |
