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

class listMarca extends Component{
    state = {
        marcas:[],
    }
    componentDidMount(){
        api.get('/marca-list/1').then(res=>{
            this.setState({marcas:res.data.docs}) 
        })
    }

    render(){
      return(
      <div className="content">
               
            <Row>  
                <Col md="12">
                <Card>
                <CardHeader>
                    <CardTitle tag="h4">Registro de Marcas</CardTitle>
                </CardHeader>
                <CardBody>
                <Table responsive>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Cpf</th>
                        <th>Comprovante Cpf</th>
                        <th>Descrição</th>
                        <th>Logo</th>
                        <th>Sintese</th>
                        <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        this.state.marcas.map((obj,index)=> 
                            <tr key={obj._id}>
                                <td>{index}</td>
                                <td>{obj.nome}</td>
                                <td>{obj.email}</td>
                                <td>{obj.telefone}</td>
                                <td>{obj.cpf}</td>
                                <td>{obj.cpf_comprovante_path}</td>
                                <td>{obj.descricao}</td>
                                <td>{obj.logo_path}</td>
                                <td>{obj.sintese_marca}</td>
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
export default withRouter(listMarca);
