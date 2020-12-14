import React, { Component } from "react";
import { 
    Row, 
    Col, 
    Table, 
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Modal, ModalHeader, ModalBody, ModalFooter, Button 
    } from 'reactstrap'
import api from '../../services/api'

import { withRouter } from "react-router-dom";
import '../../assets/css/Credito.css'

class listCredito extends Component{
    constructor(props) {
        super(props);
        this.state = {
            creditos:[],
            modal: false,
            modalTitle:"",
            credito:{}
        }
        this.toggle = this.toggle.bind(this);
    }
    componentDidMount(){
        api.get('/credito-retido-list/1').then(res=>{
            console.log(res.data.docs[0])
            this.setState({creditos:res.data.docs}) 
        })
    }

    modalContentResultados(credito){
        this.setState({
          modalTitle: credito.nome,
          credito: credito,          
        })
        this.toggle()
      }

    toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }

    render(){
      return(
        <div className="content">
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
         <ModalHeader toggle={this.toggle}>{this.state.modalTitle}</ModalHeader>
         <ModalBody>
                <h3><b>Nome: </b>{this.state.credito.nome}</h3>
                <hr></hr>
                <h3><b>Redes Sociais: </b></h3>  
                {
                this.state.credito.redes_sociais?this.state.credito.redes_sociais.map((rede) =>
                    <li key={rede}>{rede}</li>
                ):"---"
                }
                <hr></hr>
                <h3><b>Musicas: </b></h3>  
                {
                this.state.credito.lista_musicas?this.state.credito.lista_musicas.map((musicas) =>
                    <li key={musicas}>{musicas}</li>
                ):"---"
                }
         </ModalBody>
         <ModalFooter>
           <Button color='primary' onClick={this.toggle}>Ok</Button>
         </ModalFooter>
        </Modal>

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
                        <th>Produtor</th>
                        <th>Email do Requerente</th>
                        <th>Telefone</th>
                        <th>Nome Artista</th>
                        <th>Cpf</th>
                        <th>Associação</th>
                        <th>Data</th>
                        <th>Detalhes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        this.state.creditos.map((credito,index)=> 
                            <tr key={credito._id}>
                                <td>{credito.nome_produtor||"-----"}</td>
                                <td>{credito.email||"-----"}</td>
                                <td>{credito.telefone||"-----"}</td>
                                <td>{credito.nome||"-----"}</td>
                                <td>{credito.cpf||"-----"}</td>
                                <td>{credito.associacao||"-----"}</td>
                                <td>{credito.createdAt||"-----"}</td>
                                {/* <td>{credito.nome_artistico||"-----"}</td> */}
                                <td className="detalhes" onClick={this.modalContentResultados.bind(this, credito)}><i className="nc-icon nc-simple-add"></i></td>
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
