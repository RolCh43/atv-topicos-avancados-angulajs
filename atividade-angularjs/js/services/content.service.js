/**
 * ContentService (service) - conteúdos fictícios de FAQ, abas e textos.
 * Usa .service() (construtor) para diferenciar da factory de produtos.
 */
(function () {
  'use strict';

  angular.module('app.services').service('ContentService', function () {
    var faq = [
      { title: 'Qual é o prazo de entrega?', content: 'O prazo varia de 3 a 10 dias úteis, de acordo com a sua região. O código de rastreio é enviado por e-mail assim que o pedido é despachado.' },
      { title: 'Quais formas de pagamento são aceitas?', content: 'Aceitamos cartão de crédito em até 10x sem juros, Pix com 5% de desconto e boleto bancário.' },
      { title: 'Como faço para trocar ou devolver um produto?', content: 'Você tem até 7 dias após o recebimento para solicitar a devolução na área Meus Pedidos. A coleta é gratuita.' },
      { title: 'Os produtos têm garantia?', content: 'Sim. Todos os produtos possuem garantia mínima de 90 dias, além da garantia oferecida pelo fabricante.' },
      { title: 'Como acompanho meu pedido?', content: 'Acesse a aba Pedidos no seu perfil ou utilize o código de rastreio enviado por e-mail.' },
      { title: 'É seguro comprar no site?', content: 'Sim. Utilizamos conexão criptografada (HTTPS) e não armazenamos os dados completos do seu cartão.' }
    ];

    var profileTabs = [
      {
        title: 'Dados pessoais',
        content: 'Informações básicas da conta do usuário.',
        items: ['Nome: Maria Souza', 'E-mail: maria.souza@email.com', 'Cidade: Salvador - BA', 'Cliente desde: março de 2022']
      },
      {
        title: 'Pedidos',
        content: 'Histórico dos pedidos mais recentes.',
        items: ['#1023 - Fone de ouvido bluetooth - Entregue', '#1047 - Código limpo - Em transporte', '#1051 - Tapete de yoga - Aguardando pagamento']
      },
      {
        title: 'Configurações',
        content: 'Preferências da conta.',
        items: ['Notificações por e-mail: ativadas', 'Autenticação em dois fatores: ativada', 'Tema: claro']
      }
    ];

    var languages = [
      { label: 'Português', value: 'pt' },
      { label: 'English', value: 'en' },
      { label: 'Español', value: 'es' }
    ];

    var texts = {
      pt: { title: 'Bem-vindo à Loja Demo!', subtitle: 'Página de demonstração com 6 componentes: paginação, menu suspenso, barra de progresso, abas, acordeão e notificações toast.' },
      en: { title: 'Welcome to the Demo Store!', subtitle: 'Demo page with 6 components: pagination, dropdown menu, progress bar, tabs, accordion and toast notifications.' },
      es: { title: '¡Bienvenido a la Tienda Demo!', subtitle: 'Página de demostración con 6 componentes: paginación, menú desplegable, barra de progreso, pestañas, acordeón y notificaciones toast.' }
    };

    var toastTypes = [
      { label: 'Sucesso', value: 'success' },
      { label: 'Erro', value: 'error' },
      { label: 'Informação', value: 'info' }
    ];

    this.getFaq = function () { return angular.copy(faq); };
    this.getProfileTabs = function () { return angular.copy(profileTabs); };
    this.getLanguages = function () { return angular.copy(languages); };
    this.getTexts = function () { return angular.copy(texts); };
    this.getToastTypes = function () { return angular.copy(toastTypes); };
  });
})();
