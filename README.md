# Liverpool QA Challenge

Prueba automatizada con Cypress para validar el flujo de búsqueda de productos en Liverpool.

## Flujo automatizado

1. Entrar a https://www.liverpool.com.mx
2. Buscar `play station 5`
3. Ordenar por `Menor precio`
4. Filtrar por color `Blanco`
5. Extraer los primeros 5 productos visibles
6. Imprimir marca, nombre y precio en consola

## Tecnologías

- Cypress 15.16.0
- JavaScript
- Node.js

## Instalación

```bash
npm install

# Liverpool QA Challenge

Prueba automatizada con Cypress para validar el flujo de búsqueda de productos en Liverpool.

## Flujo automatizado

1. Entrar a https://www.liverpool.com.mx
2. Buscar `play station 5`
3. Ordenar por `Menor precio`
4. Filtrar por color `Blanco`
5. Extraer los primeros 5 productos visibles
6. Imprimir marca, nombre y precio en consola

## Tecnologías

- Cypress 15.16.0
- JavaScript
- Node.js

## Instalación

```bash
npm install

Consideraciones técnicas

Durante la automatización se identificó que Liverpool carga múltiples recursos externos de analítica, tracking, personalización, encuestas y contenido dinámico.

Por esta razón, no se utilizó cy.intercept('**'), ya que capturaba tráfico no relacionado con el flujo principal y generaba ruido en la prueba, incluyendo respuestas 503, 404 o scripts externos que no forman parte de la funcionalidad evaluada.

También se identificó que la validación estricta de orden ascendente no es confiable, ya que las tarjetas pueden mostrar múltiples precios, descuentos, promociones o variantes, y el sitio puede reordenar resultados después de aplicar filtros.

Como mejora propuesta, la validación UI vs API debería realizarse únicamente contra la petición interna responsable del listado de productos, observada como /getPlpFilter. Sin embargo, al tratarse de una API interna no documentada y de un sitio externo con contenido dinámico, no se recomienda bloquear la prueba por una comparación estricta producto por producto.

La prueba final prioriza estabilidad, reproducibilidad y validación funcional del flujo principal.


3. Guarda y cierra.

4. Verifica que exista:

```bash
dir

Debe aparecer:

README.md
Súbelo a Git:
git add README.md
git commit -m "Add project README"
git push