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
import '../../assets/css/Credito.css'

class listCredito extends Component{
    state = {
        creditos:[],
    }
    componentDidMount(){
        api.get('/credito-retido-list/1').then(res=>{
            this.setState({creditos:res.data.docs}) 
        })
    }

    render(){
      return(
        <div className="content">

            <Row>  
                <Col md="12">
                <Card>
                <CardHeader>
                    <CardTitle tag="h4">Recuperação de Crédito Retido</CardTitle>
                </CardHeader>
                <CardBody className="responsiveTable">
                <Table >
                    <thead>
                        <tr>
                        {/* <th>#</th> */}
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Cpf</th>
                        <th>Telefone</th>
                        <th>Nome Artístico</th>
                        <th>Associação</th>
                        <th>Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        this.state.creditos.map((credito,index)=> 
                            <tr key={credito._id}>
                                {/* <td>{index}</td> */}
                                <td>{credito.nome}</td>
                                <td>{credito.email}</td>
                                <td>{credito.cpf}</td>
                                <td>{credito.telefone}</td>
                                <td>{credito.nome_artistico}</td>
                                <td>{credito.associacao}</td>
                                <td>{credito.createdAt}</td>
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
export default withRouter(listCredito);
