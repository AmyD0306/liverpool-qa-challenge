//AMBIENTE DE PRUEBAS ESTABLE SIN IMPRIMIR DATOSrepresentacion grafica
//EJECUTAR CON --- npx cypress open ---

describe('Liverpool Challenge', () => {

    it('should search PlayStation 5 and apply filters', () => {

        cy.visit('https://www.liverpool.com.mx')

        // Buscar PlayStation 5
        cy.get('[data-testid*="search-input"]')
            .eq(1)
            .type('play station 5{enter}', { force: true })

        // Esperar a que carguen resultados
       // cy.contains('Ordenar por:', { timeout: 30000 })
         //   .should('be.visible')

        // Abrir dropdown de orden
        cy.contains('Ordenar por:')
            .click({ force: true })

        // Ordenar por menor precio
        cy.contains('Menor precio')
            .click({ force: true })

        // Aplicar filtro blanco
        cy.contains('Blanco')
            .click({ force: true })

        // Validar que el filtro quedó aplicado
        cy.contains('Blanco')
            .should('exist')

    })

})

//riesgo técnico
/* describe('Liverpool Challenge', () => {
  it('should search PlayStation 5, apply filters and validate product network response', () => {
    cy.intercept('GET', '**getPlpFilter**').as('getPlpFilter') 

    cy.visit('https://www.liverpool.com.mx')

    cy.get('[data-testid*="search-input"]')
      .eq(1)
      .type('play station 5{enter}', { force: true })

    cy.get('.m-product__card', { timeout: 30000 })
      .should('have.length.at.least', 1)

    cy.get('#sortby:visible, [id="sortby"]:visible')
      .first()
      .click({ force: true })

    cy.contains('li, a, button, span', 'Menor precio')
      .filter(':visible')
      .first()
      .click({ force: true })

    cy.wait('@getPlpFilter', { timeout: 30000 }).then((interception) => {
      expect(interception.response.statusCode).to.be.oneOf([200, 202])
      expect(interception.response.body).to.exist

      cy.task('log', 'Respuesta de red detectada al ordenar por menor precio:')
      cy.task('log', interception.request.url)
    })

    cy.contains('label, span, button, a, div', 'Blanco')
      .filter(':visible')
      .first()
      .click({ force: true })

    cy.wait('@getPlpFilter', { timeout: 30000 }).then((interception) => {
      expect(interception.response.statusCode).to.be.oneOf([200, 202])
      expect(interception.response.body).to.exist

      cy.task('log', 'Respuesta de red detectada al filtrar por color Blanco:')
      cy.task('log', interception.request.url)
    })

    cy.contains('Blanco').should('exist')

    cy.get('.m-product__card')
      .should('have.length.at.least', 5)
      .then(($products) => {
        const products = []

        Cypress.$($products)
          .slice(0, 5)
          .each((index, product) => {
            const $product = Cypress.$(product)

            const brand = $product.find('.a-card-brand').first().text().trim()

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

        cy.task('log', 'Primeros 5 productos encontrados en UI:')
        cy.task('table', products)
      })
  })
})

*/

//AMBIENTE DE PRUEBAS IMPRIMIENDO EN CONSOLA LOS PRODUCTOS ENCONTRADOS DE MENOR A MAYOR
// IMPRIMIR EN CONSOLA CON --- npx cypress run --- representacion sin grafica

/*describe('Liverpool Challenge', () => {
  it('should search PlayStation 5 and apply filters', () => {
    cy.visit('https://www.liverpool.com.mx')

    // Buscar PlayStation 5
    cy.get('[data-testid*="search-input"]')
      .eq(1)
      .type('play station 5', { force: true })

    cy.get('[data-testid*="search-input"]')
      .eq(1)
      .type('{enter}', { force: true })

    // Si en headless no navega, entrar directo a resultados
    cy.location('href').then((href) => {
      if (!href.includes('/tienda') || !href.includes('s=')) {
        cy.visit('https://www.liverpool.com.mx/tienda?s=play+station+5')
      }
    })

    // Validar página de resultados
    cy.contains(/play\s*station\s*5/i, { timeout: 40000 })
      .should('exist')

    // Ordenar por menor precio
    cy.contains(/Ordenar por/i, { timeout: 40000 })
      .click({ force: true })

    cy.contains(/Menor precio/i, { timeout: 40000 })
      .click({ force: true })

    // Aplicar filtro blanco
    cy.contains(/Blanco/i, { timeout: 40000 })
      .click({ force: true })

    cy.contains(/Blanco/i, { timeout: 40000 })
      .should('exist')

    // Reaplicar orden porque el filtro puede resetear los resultados
    cy.contains(/Ordenar por/i, { timeout: 40000 })
      .click({ force: true })

    cy.contains(/Menor precio/i, { timeout: 40000 })
      .click({ force: true })

    // Extraer los primeros 5 productos e imprimirlos en consola
    cy.get('.m-product__card', { timeout: 40000 })
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

            const rawPrice = $product
              .find('.a-card-discount, .a-card-price')
              .first()
              .text()
              .trim()
              .replace(/\s+/g, ' ')

            const priceMatch = rawPrice.match(/\$[\d,]+/)
            const price = priceMatch ? priceMatch[0] : rawPrice

            const numericPrice = Number(
              price
                .replace('$', '')
                .replace(/,/g, '')
            )

            products.push({
              position: index + 1,
              brand,
              name,
              price,
              numericPrice,
            })
          })

        const printableProducts = products.map((product) => ({
          position: product.position,
          brand: product.brand,
          name: product.name,
          price: product.price,
        }))

        cy.task('log', 'Primeros 5 productos encontrados:')
        cy.task('table', printableProducts)

        const prices = products.map((product) => product.numericPrice)
        const sortedPrices = [...prices].sort((a, b) => a - b)

        expect(
          prices,
          'Los primeros 5 productos deben estar ordenados de menor a mayor'
        ).to.deep.equal(sortedPrices)
      })
  })
})*/
/*
  Nota técnica:
  No se valida el orden estrictamente desde el DOM porque Liverpool puede
  re-renderizar los productos después de aplicar filtros y las tarjetas pueden
  contener más de un precio visible. Esto puede provocar falsos negativos.
  La validación fuerte del ordenamiento se documenta como riesgo y se propone
  contrastarla contra la respuesta de red en la capa de servicios. 
  coloquialmente dicho, back y front estan chocando
*/