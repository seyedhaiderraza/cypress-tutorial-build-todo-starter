describe('Smoke tests', ()=>{
  
    beforeEach(()=>{
        cy.request('GET', '/api/todos')
        .its('body')
        .each(todo=>cy.request('DELETE', `/api/todos/${todo.id}`))
    })

    context('With active todos',()=>{

        it.only('save a new todo item and assert the length of todo item to be 1',()=>{

            cy.visit("/")
            ///////////////////
            cy.server()
            cy.route('POST', '/api/todos')
            .as('create')
            ///////////////////

            cy.focused() //selects element on page where focus is ther elike input todo field
            .type('Buy eggs {enter}')
            /////////////////
            cy.wait('@create')
            ////////////////
            cy.get('.todo-list li')
            .should('have.length', 1)
        })

})
})