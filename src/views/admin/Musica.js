import React, { Component } from "react";
import { 
    Row, 
    Col, 
    Table, 
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    } from 'reactstrap'
import api from '../../services/api'

import { withRouter } from "react-router-dom";

class listMusica extends Component{
    state = {
        musicas:[],
    }
    componentDidMount(){
        api.get('/musica-list/1').then(res=>{
            this.setState({musicas:res.data.docs}) 
        })
    }

    render(){
      return(
          <div className='content'>
            <Row>  
                <Col md="12">
                <Card>
                <CardHeader>
                    <CardTitle tag="h4">Cadastro de Músicas</CardTitle>
                </CardHeader>
                <CardBody>
                <Table responsive>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Subtitulo</th>
                        <th>Estilo</th>
                        <th>Letra</th>
                        <th>Duração</th>
                        <th>Autores</th>
                        <th>Interpretes</th>
                        <th>Feats</th>
                        <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        this.state.musicas.map((obj,index)=> 
                            <tr key={obj._id}>
                                <td>{index}</td>
                                <td>{obj.nome}</td>
                                <td>{obj.subtitulo}</td>
                                <td>{obj.estilo}</td>
                                <td>{obj.letra}</td>
                                <td>{obj.duracao}</td>
                                <td>{obj.autores[0].nome_autor}</td>
                                <td>{obj.interprete[0]}</td>
                                <td>{obj.feat[0]}</td>
                                <td>{obj.status}</td>
                            </tr>
                            )
                        }
                    </tbody>
                </Table>
                </CardBody>
                </Card>
                </Col>    
            </Row>
        </div>

      )};
}
export default withRouter(listMusica);
