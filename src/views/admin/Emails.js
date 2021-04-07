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

class listNotificacao extends Component{
    constructor(props) {
        super(props);
        this.state = {
            notificacoes:[],
            page:1
        }
    }
    componentDidMount(){
        api.get('/notificacoes/'+this.page).then(res=>{
              this.setState({
                page: this.state.page+1,
                notificacoes:res.data.docs, 
              })
          })
    }
    render(){
      return(
        
        <div className="content">
            <Row>  
                <Col md="12">
                <Card>
                <CardHeader>
                    <CardTitle tag="h4">Notificações</CardTitle>
                </CardHeader>
                <CardBody className="responsiveTable">
                <Table >
                    <thead>
                        <tr>
                        <th>Remetente</th>
                        <th>Destinatário</th>
                        <th>Assunto</th>
                        <th>Template</th>
                        <th>Status</th>
                        <th>Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        this.state.notificacoes.map((notificacao,index)=> 
                            <tr key={notificacao._id}>
                                <td>{notificacao.mailOptions.from||"-----"}</td>
                                <td>{notificacao.mailOptions.to||"-----"}</td>
                                <td>{notificacao.mailOptions.subject||"-----"}</td>
                                <td>{notificacao.mailOptions.template||"-----"}</td>
                                <td>{notificacao.status||"-----"}</td>
                                <td>{notificacao.createdAt||"-----"}</td>
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
export default withRouter(listNotificacao);
