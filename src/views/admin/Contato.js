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

class listContato extends Component{
    state = {
        contatos:[],
    }
    componentDidMount(){
        api.get('/contato-list/1').then(res=>{
            console.log(res.data.docs)
            this.setState({contatos:res.data.docs}) 
        })
    }

    render(){
      return(
        <div className="content">
            <Row>  
                <Col md="12">
                <Card>
                <CardHeader>
                    <CardTitle tag="h4">Contatos/Consulta Jurídica/Contratos</CardTitle>
                </CardHeader>
                <CardBody>
                <Table responsive>
                    <thead>
                        <tr>
                        {/* <th>#</th> */}
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Assunto</th>
                        <th>Mensagem</th>
                        <th>Tipo</th>
                        <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        this.state.contatos.map((credito,index)=> 
                            <tr key={credito._id}>
                                {/* <td>{index}</td> */}
                                <td>{credito.nome}</td>
                                <td>{credito.email}</td>
                                <td>{credito.assunto}</td>
                                <td>{credito.mensagem}</td>
                                <td>{credito.tipo}</td>
                                <td>{credito.status}</td>
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
export default withRouter(listContato);
