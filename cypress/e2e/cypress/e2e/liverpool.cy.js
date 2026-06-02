//AMBIENTE DE PRUEBAS ESTABLE SIN IMPRIMIR DATOS representacion NO grafica
//EJECUTAR CON --- npx cypress run ---

describe('Liverpool Challenge', () => {
  it('should search PlayStation 5 and apply filters', () => {
    cy.visit('https://www.liverpool.com.mx')

    cy.get('[data-testid*="search-input"]')
      .eq(1)
      .type('play station 5{enter}', { force: true })

    cy.wait(3000)

    // Abrir dropdown de orden
    cy.contains('Ordenar por:')
      .click({ force: true })

    cy.wait(1000)

    // Ordenar por menor precio
    cy.contains('Menor precio')
      .click({ force: true })

    cy.wait(3000)

    // Aplicar filtro blanco
    cy.contains('Blanco')
      .click({ force: true })

    cy.wait(3000)

    // Validar que el filtro se aplicó
    cy.contains('Blanco')
      .should('exist')

    // Validar que existan productos visibles
    cy.get('.m-product__card', { timeout: 30000 })
      .should('have.length.at.least', 5)
      .then(($products) => {
        const products = []

        Cypress.$($products)
          .slice(0, 5)
          .each((index, product) => {
            const $product = Cypress.$(product)

            const brand = $product
              .find('.a-card-brand')
              .first()
              .text()
              .trim()

            const name = $product
              .find('.card-title.a-card-description')
              .first()
              .text()
              .trim()

            const price = $product
              .find('.a-card-discount, .a-card-price')
              .first()
              .text()
              .trim()
              .replace(/\s+/g, ' ')

            products.push({
              position: index + 1,
              brand,
              name,
              price,
            })
          })

        cy.task('log', 'Primeros 5 productos encontrados:')
        cy.task('table', products)

        products.forEach((product) => {
          expect(product.name, `Product ${product.position} name`).to.not.equal('')
          expect(product.price, `Product ${product.position} price`).to.not.equal('')
        })
      })
  })
})
//REPRESENTACION GRAFICA 
//EJECUTAR CON --- npx cypress open ---
/* describe('Liverpool Challenge', () => {

  it('should search PlayStation 5 and apply filters', () => {

    cy.visit('https://www.liverpool.com.mx')

    cy.get('[data-testid*="search-input"]')
      .eq(1)
      .type('play station 5{enter}', { force: true })

    cy.wait(3000)

    // Abrir dropdown de orden
    cy.contains('Ordenar por:')
      .click({ force: true })

    // Ordenar por menor precio
    cy.contains('Menor precio')
      .click({ force: true })

    // Aplicar filtro blanco
    cy.contains('Blanco')
      .click({ force: true })

    // Validar que el filtro se aplicó
    cy.contains('Blanco')
      .should('exist')

  })

})
*/

/*
  Nota técnica:
  No se valida el orden estrictamente desde el DOM porque Liverpool puede
  re-renderizar los productos después de aplicar filtros y las tarjetas pueden
  contener más de un precio visible. Esto puede provocar falsos negativos.
  La validación fuerte del ordenamiento se documenta como riesgo y se propone
  contrastarla contra la respuesta de red en la capa de servicios. 
  coloquialmente dicho, back y front estan chocando
*/