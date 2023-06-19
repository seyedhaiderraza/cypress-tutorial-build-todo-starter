describe('List items', ()=>{
    beforeEach(()=>{
        cy.seedAndVisit()
    })

    it('properly displays completed items', ()=>{
        cy.get('.todo-list li')
          .filter('.completed') //
          .should('have.length',1) //only one todos.json item iscompleted: true
          .and('contain','Milk')
           //todos.json edited where Milk todo has iscompleted:true
          .find('.toggle') 
          //input on todolist component to have toggle class
          .should('be.checked') 
          //code: add checked? condtion on input
    })
    it('shows correct todos left in footer', ()=>{
      cy.get('.todo-count')
      .should('contain',4)
    })
    it('removes a todo from todo list', ()=>{
        cy.route({
            url: '/api/todos/1',
            method: 'DELETE',
            status: 200,
            response: {}
        })

        cy.get('.todo-list li')
        .as('list')

        cy.get('@list')
        .first() //first list item
        .find('.destroy')
        .invoke('show') //find button with delte functionality in dom
        .click({force:true}) //click it to delete
/*
.invoke('show')
{force: true} option is used when clicking the delete button .destroy
inside the first list item .todo-list li. It ensures that the click is performed
even if the button is not directly visible
*/
            cy.get('@list')
            .should('have.length', 4)
            .and('not.contain', 'Milk')
            

         })

         it.only('Marks an incomplete item complete', ()=>{
            cy.fixture('todos')
            .then(todos=>{
                const target = Cypress._.head(todos)
                cy.route(
                    'PUT',
                    `api/todos/${target.id}`,
                    Cypress._.merge(target,{isComplete: true})
                )
            })
            cy.get('.todo-list li')
            .first()
            .as('first-todo')

            cy.get('@first-todo')
            .find('.toggle')
            .click()
            .should('be.checked')

            cy.get('@first-todo')
            .should('have.class', 'completed')

            
            cy.get('.todo-count')
            .should('contain', 3)

         })
})