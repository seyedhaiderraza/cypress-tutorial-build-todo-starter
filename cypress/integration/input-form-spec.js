describe('input form', ()=>{
    beforeEach(()=>{
       // cy.visit('/')
       cy.seedAndVisit([])
    })
    it('focuses input on load', ()=>{
        cy.visit('http://localhost:3030')
        cy.focused()
          .should('have.class', 'new-todo')
    })

    it('accepts input', ()=>{
        cy.visit('http://localhost:3030')
        cy.get('.new-todo')
    })
    it('accepts input', ()=>{
        const typedText = 'Buy Milk'
        cy.visit('http://localhost:3030')

        cy.get('.new-todo')
        .type('Buy Milk')
        .should('have.value',typedText)
    })
    

    context('Form submission', ()=>{

        // it.only('a new todo item and form submit' , ()=>{
        //     cy.get('.new-todo')
        //       .type('Buy Milk')
        //       .type('{enter}')
        // })

          it('a new todo item and form submit' , ()=>{
            cy.server()
            cy.route('POST','api/todos',{
                name:'complete testing tutorial',
                id:1,
                isComplete: false
            })
            // cy.get('.new-todo')
            //   .type('Buy Milk')
            //   .type('{enter}')
       

        cy.get('.new-todo')
        .type('complete testing tutorial')
        .type('{enter}')
        .should('have.value','') //assert after press enter form submit is the input filed cleared
        cy.get('.todo-list li')
          .should('have.length', 1)
          .and('contain', 'complete testing tutorial')
        })

        it('show error  on form submit', ()=>{
            cy.server()
            //instead of todo object we now have a error object
            cy.route({
                url: 'api/todos',
                method: 'POST',
                status: 500,
                response: {}
            })

            cy.get('.new-todo')
              .type('test{enter}')

            cy.get('.todo-list li')
             .should('not.exist')

            cy.get('.error')
              .should('be.visible')
        })
     })
})