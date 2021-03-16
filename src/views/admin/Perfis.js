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

class listPerfil extends Component{
    constructor(props) {
        super(props);
        this.state = {
            perfis:[],
            modal: false,
            modalTitle:"",
            perfil:{}
        }
        this.toggle = this.toggle.bind(this);
    }
    componentDidMount(){
        api.get('/perfis/').then(res=>{
            console.log(res.data.docs[0])
            this.setState({perfis:res.data.docs}) 
        })
    }

    modalContentResultados(perfil){
        this.setState({
          modalTitle: perfil.nome,
          perfil: perfil,          
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
                <h3><b>Processos: </b></h3>  
              
         </ModalBody>
         <ModalFooter>
           <Button color='primary' onClick={this.toggle}>Ok</Button>
         </ModalFooter>
        </Modal>

            <Row>  
                <Col md="12">
                <Card>
                <CardHeader>
                    <CardTitle tag="h4">Contas Cadastradas</CardTitle>
                </CardHeader>
                <CardBody className="responsiveTable">
                <Table >
                    <thead>
                        <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Cpf</th>
                        <th>Telefone</th>
                        <th>Produtora</th>
                        <th>Papel</th>
                        <th>Data</th>
                        <th>Detalhes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        this.state.perfis.map((perfil,index)=> 
                            <tr key={perfil._id}>
                                <td>{perfil.nome||"-----"}</td>
                                <td>{perfil.email||"-----"}</td>
                                <td>{perfil.cpf||"-----"}</td>
                                <td>{perfil.telefone||"-----"}</td>
                                <td>{perfil.nome_empresa||"-----"}</td>
                                <td>{perfil.papel||"-----"}</td>
                                <td>{perfil.createdAt||"-----"}</td>
                                <td className="detalhes" onClick={this.modalContentResultados.bind(this, perfil)}><i className="nc-icon nc-simple-add"></i></td>
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
export default withRouter(listPerfil);
