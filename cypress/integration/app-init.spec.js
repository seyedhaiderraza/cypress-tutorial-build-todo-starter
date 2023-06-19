

describe("On App load Todo List Default entries",()=>{

    it('assert if todo-list is populated with 5 items',()=>{
      
        //  cy.server()
        //  cy.route('GET','api/todos', 'fixture:todos')
        //  cy.visit('/')
          cy.seedAndVisit()

        cy.get('.todo-list li')
        .should('have.length', 5)
    })
    it('failure on App load so error object and empty todolist',()=>{
        cy.server()
        cy.route({
            url: 'api/todos',
            method: 'GET',
            status: 500,
            response:{}
        })
        cy.visit('/')

        cy.get('.todo-list li')
        .should('not.exist')

        cy.get('.error')
        .should('be.visible')
        .and('contain', 'App load error')
    })
})