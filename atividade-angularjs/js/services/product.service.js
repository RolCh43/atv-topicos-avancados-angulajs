/**
 * ProductService (factory) - fornece os dados fictícios de produtos.
 */
(function () {
  'use strict';

  angular.module('app.services').factory('ProductService', function () {
    var categories = ['eletrônicos', 'livros', 'casa', 'esportes'];

    var products = [
      { id: 1, name: 'fone de ouvido bluetooth', category: 'eletrônicos', price: 199.9, description: 'Fone sem fio com cancelamento de ruído e bateria de até 30 horas de duração.' },
      { id: 2, name: 'smartwatch fitness', category: 'eletrônicos', price: 349.0, description: 'Relógio inteligente com monitor cardíaco, GPS integrado e resistência à água.' },
      { id: 3, name: 'teclado mecânico rgb', category: 'eletrônicos', price: 279.5, description: 'Teclado com switches mecânicos, iluminação RGB personalizável e layout ABNT2.' },
      { id: 4, name: 'mouse sem fio', category: 'eletrônicos', price: 89.9, description: 'Mouse ergonômico com sensor óptico de alta precisão e receptor USB.' },
      { id: 5, name: 'caixa de som portátil', category: 'eletrônicos', price: 159.0, description: 'Caixa de som resistente à água, com graves potentes e conexão bluetooth.' },
      { id: 6, name: 'o senhor dos anéis', category: 'livros', price: 119.9, description: 'Edição de colecionador da trilogia completa, com capa dura e ilustrações.' },
      { id: 7, name: 'código limpo', category: 'livros', price: 94.0, description: 'Guia clássico de boas práticas para escrever código legível e sustentável.' },
      { id: 8, name: 'dom casmurro', category: 'livros', price: 29.9, description: 'Romance de Machado de Assis, um dos maiores clássicos da literatura brasileira.' },
      { id: 9, name: 'algoritmos: teoria e prática', category: 'livros', price: 289.0, description: 'Referência completa sobre estruturas de dados e análise de algoritmos.' },
      { id: 10, name: 'a arte da guerra', category: 'livros', price: 24.5, description: 'Tratado milenar sobre estratégia, liderança e tomada de decisão.' },
      { id: 11, name: 'luminária de mesa led', category: 'casa', price: 79.9, description: 'Luminária articulada com três níveis de intensidade e porta USB.' },
      { id: 12, name: 'jogo de panelas antiaderente', category: 'casa', price: 399.0, description: 'Conjunto com cinco peças antiaderentes, compatível com fogão de indução.' },
      { id: 13, name: 'cafeteira elétrica', category: 'casa', price: 189.9, description: 'Cafeteira programável com jarra térmica e capacidade para 30 xícaras.' },
      { id: 14, name: 'kit organizador de gaveta', category: 'casa', price: 49.9, description: 'Organizadores modulares para manter talheres e utensílios sempre no lugar.' },
      { id: 15, name: 'tapete de yoga', category: 'esportes', price: 99.0, description: 'Tapete antiderrapante com 6 mm de espessura e alça para transporte.' },
      { id: 16, name: 'bola de futebol oficial', category: 'esportes', price: 149.9, description: 'Bola costurada à mão, com tamanho e peso oficiais para campo.' },
      { id: 17, name: 'garrafa térmica 1l', category: 'esportes', price: 69.9, description: 'Mantém bebidas geladas por 24 horas e quentes por até 12 horas.' },
      { id: 18, name: 'par de halteres 5kg', category: 'esportes', price: 129.0, description: 'Halteres emborrachados, ideais para treinos funcionais em casa.' },
      { id: 19, name: 'bicicleta ergométrica', category: 'esportes', price: 1299.0, description: 'Bicicleta com 8 níveis de carga, monitor digital e assento ajustável.' },
      { id: 20, name: 'corda de pular profissional', category: 'esportes', price: 39.9, description: 'Corda com rolamentos e cabo de aço para treinos de alta intensidade.' }
    ];

    return {
      /** Retorna uma cópia da lista para não alterar a fonte original. */
      getAll: function () {
        return angular.copy(products);
      },
      getCategories: function () {
        return categories.slice();
      }
    };
  });
})();
