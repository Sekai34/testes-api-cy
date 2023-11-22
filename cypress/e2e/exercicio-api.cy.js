//// <reference types="cypress" />
import contrato from '../contracts/usuarios.contratcscopy'
const { any, array } = require("joi");

describe('Testes da Funcionalidade Usuários', () => {

    //feito
     it('Deve validar um usuário com email inválido', () => {
          cy.request({
           method:'POST',
           url:'login',
           body:{
               "email": "fulano@qa.co",
               "password": "teste",
             },
             failOnStatusCode: false
             }).then((response)=>{
                         expect(response.body.message).to.equal( "Email e/ou senha inválidos")
                         expect(response.status).to.equal(401)
                         
 
         
                      })
                    
     });
     it('Deve validar contrato de usuários', () => {
          cy.request({
               method:'POST',
               url:'usuarios',
               body: {
                    "nome": "Fulano da Silva",
                    "email": "beltrano@qa.com.br",
                    "password": "teste",
                    "administrador": "true"
                  }
          }).then((response) =>{
               expect(response.body.message).to.equal("Cadastro realizado com sucesso")
          })
     });
    
     it('Deve cadastrar um usuário com sucesso', () => {
          cy.request('usuarios').then(response=> {
               return contrato.validateAsync(response.body)
          })
     });

    it('Deve listar usuários cadastrados', () => {
     cy.request({
          method:'GET',
          url: 'usuarios',
          body:{
               "quantidade": 5,
               "usuarios": [
                 {
                   "nome": "Fulano da Silva",
                   "email": "beltrano@qa.com.br",
                   "password": "teste",
                   "administrador": "true",
                   "_id": "0uxuPY0cbmQhpEz1"
                 }
               ]
             }  
    });

    

   

    it('Deve editar um usuário previamente cadastrado', () => {
       cy.request({
          method:'PUT',
          url:'usuarios/{-id}',
          body:{
               "nome": "Fulano da Silva",
               "email": "beltrano@qa.com.br",
               "password": "teste",
               "administrador": "true"
             }


       }).then((response) =>{
          expect(response.body.usuarios.message).to.equal("Registro alterado com sucesso")
       }).then((response) => {
          expect(response.body.usuarios.messaage).to.equal("Cadastro realizado com sucesso")
     }).then((response)=> {
          expect(response.body.usuarios.message).to.equal("Este email já está sendo usado")
     }) 
    });

    it('Deve deletar um usuário previamente cadastrado', () => {
        cy.request({
          method:'DELETE',
          url:'usuarios',
          
        }).then((response) =>{
          expect(response.body.usuarios.message).to.equal('Registro excluído com sucesso | Nenhum registro excluído"')

        })
    });
    });
     
});
     



