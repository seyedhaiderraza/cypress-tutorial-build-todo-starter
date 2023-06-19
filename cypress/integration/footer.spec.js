describe('Footer', ()=>{

    context('add single todo ',()=>{
        it('assert todo list contains only 1 count', ()=>{
            cy.seedAndVisit([{
                "id": 1,
                "name": "Complete NexTJS Tutorials",
                "isComplete": false
            }])

            cy.get('.todo-count')
            .should('contain', '1 todo left')
        })
    })

    context('add multiple todo ',()=>{
        beforeEach(()=>{
            cy.seedAndVisit()
        })

        it('assert todo list contains multiple count', ()=>{
           cy.get('.todo-count')
            .should('contain', '4 todos left')
        })

        it('active tab click shows only incomplete todos', ()=>{
           cy.contains('Active')
             .click()

           cy.get('.todo-list li')
            .should('have.length', 4)

         })
         it('Completed tab click shows only complete todos', ()=>{
            cy.contains('Completed')
              .click()

              cy.get('.todo-list li')
              .should('have.length', 1)
          })
    })
})