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
import { CSVLink, CSVDownload } from "react-csv";

import { withRouter } from "react-router-dom";
import '../../assets/css/Credito.css'

class listNotificacao extends Component{
    constructor(props) {
        super(props);
        this.state = {
            notificacoes:[],
            emails:[],
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
        
        api.get('/listEmails/').then(res=>{
            this.setState({
                emails: res.data.records,
            })
        })
    }
    render(){
      return(
        
        <div className="content">
            <Row>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                    <h3>Gerar Lista de Emails</h3>
                  <CSVLink 
                      data={this.state.emails} 
                      filename={"Emails.csv"}
                      className="btn btn-primary"
                      separator={";"}
                      > Lista de Emails </CSVLink>
                </CardBody>
              </Card>
            </Col>
            </Row>
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
