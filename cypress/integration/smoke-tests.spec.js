describe('Smoke tests', ()=>{
  
    beforeEach(()=>{
        cy.request('GET', '/api/todos')
        .its('body')
        .each(todo=>cy.request('DELETE', `/api/todos/${todo.id}`))
    })

    context('With active todos',()=>{

        it('save a new todo item and assert the length of todo item to be 1',()=>{

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

        it.only('add multiple each items from todo list',()=>{
           
            const items = [
                {text: 'Complete cypress tutorial', expectedLength: 1},
                {text: 'Play assassins creed', expectedLength: 2},
                {text: 'Complete React testing 1hr tutorial', expectedLength: 3},
                {text: 'Complete React another 1 hr tutorial', expectedLength: 4}
            ]
            cy.visit("/")
            cy.server()
            cy.route('POST', '/api/todos')
            .as('create')
            cy.wrap(items)
            .each(todo=>{
                cy.focused()
                .type(`${todo.text}{enter}`)

                cy.wait('@create')

                cy.get('.todo-list li')
                .should('have.length', todo.expectedLength)
            })
         })




    })
})