import React, {Component} from 'react';
import Menu from '../../components/menu';
import Jumbotron from '../../components/jumbotron';

class Filmes extends Component {

    componentDidMount(){
        this.Listar();
    }

    constructor(){
        super()

        this.state = {
            url : 'https://5f7fc612d6aabe00166f094f.mockapi.io/api/filmes',
            id : '',
            nome : '',
            categoria : '',
            ano : '',
            filmes : []
        }
    }

    Listar() {
        fetch( this.state.url ,{
            method : 'GET'
        })
        .then(response => response.json())
        .then(dados => {
            this.setState({filmes : dados});

            this.novoFilme();

            console.log(this.state.filmes)
        })
        .catch(err => console.log(err));
    }

    remover(event){
        event.preventDefault();

        console.log(event.target.value);

        fetch(this.state.url + '/' + event.target.value, {
            method : 'DELETE'
        })
        .then(response => response.json())
        .then(dados => {
            alert('Filme Removido!');
            this.Listar();
        })
        .catch(err => console.log(err))

    }

    editar(event) {
        event.preventDefault()

        fetch(this.state.url + '/' + event.target.value)
            .then(response => response.json())
            .then(dado => {
              console.log(dado)
              this.setState({id : dado.id})
              this.setState({nome : dado.nome})
              this.setState({categoria : dado.categoria})
              this.setState({anoLancamento : dado.anoLancamento})
            })
    }

    salvar(event) {
        event.preventDefault()

          const filme = {
            nome : this.state.nome,
            categoria : this.state.categoria,
            anoLancamento : this.state.anoLancamento
          }

          let method = (this.state.id === "" ? 'POST' : 'PUT')
          let urlRequest = (this.state.id === "" ? this.state.url : this.state.url + '/' + this.state.id)

          fetch(urlRequest, {
            method : method,
            body : JSON.stringify(filme),
            headers : {
              'content-type' : 'application/json'
            }
          })
            .then(response => response.json())
            .then(dados => {
                alert('Filme Salvo!');

                this.Listar();
            })
    }
    novoFilme() {
        this.setState({id : ''})
        this.setState({nome : ''})
        this.setState({categoria : ''})
        this.setState({anoLancamento : ''})
    }

    render () {
        return(
            <div>
                <Menu/>
                <Jumbotron titulo='Filmes' descricao='gerencie seus filmes'/>
                <meta charSet="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossOrigin="anonymous"></link>
                <div className="container">
                    <div className="bd-example" >
                    <form id="formFilme" onSubmit={this.salvar.bind(this)}>
                        <div className="form-group" >
                            <label htmlFor="nome">Nome</label>
                            <input type="text" className="form-control" value={this.state.nome} onChange={e => {this.setState({nome : e.target.value})}}  id="nome" aria-describedby="nome" placeholder="Informe o Nome"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="categoria">Categoria</label>
                            <input type="text" className="form-control" value={this.state.categoria} onChange={e => {this.setState({categoria : e.target.value})}} id="categoria" placeholder="Informe a Categoria"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="ano">Ano de Lançamento</label>
                            <input type="text" className="form-control small" value={this.state.anoLancamento} onChange={e => {this.setState({anoLancamento : e.target.value})}} id="anoLancamento" placeholder="Informe o Ano de Lançamento"/>
                        </div>
                        <button type="button" onClick={this.novoFilme.bind(this)}  className="btn btn-secondary">Cancelar</button>
                        <button type="submit" className="btn btn-success">Salvar</button>
                    </form>

                    <table className="table" style={{marginTop : '40px'}}>
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Categoria</th>
                            <th scope="col">Ano Lançamento</th>
                            <th scope="col">Ações</th>
                            <th scope="col"><button type="reset" className="btn btn-primary" onClick={this.novoFilme.bind(this)} >Novo Filme</button></th>
                        </tr>
                        </thead>
                        <tbody id="tabela-lista-corpo">
                            {
                                this.state.filmes.map((item, index) => {
                                    return(
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.nome}</td>
                                            <td>{item.categoria}</td>
                                            <td>{item.anoLancamento}</td>
                                            <td>
                                                <button type='button' value={item.id} onClick={this.remover.bind(this)} className='btn btn-danger'>Remover</button>
                                                <button type='button' value={item.id} onClick={this.editar.bind(this)} className='btn btn-warning'>Editar</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    
                    </div>
                </div>
            </div>
        )
    }
}

export default Filmes;