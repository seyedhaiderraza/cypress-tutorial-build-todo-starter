// Cypress.Commands.add('seedAndVisit',()=>{
//         cy.server()
//         cy.route('GET','api/todos', 'fixture:todos')
//         cy.visit('/')
// })

Cypress.Commands.add('seedAndVisit',(seedData = 'fixture:todos')=>{
        cy.server()
        cy.route('GET','api/todos', seedData)
        cy.visit('/')
})
