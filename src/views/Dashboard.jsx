import React from "react";
import api from '../services/api'

// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
import '../assets/css/Dashboard.css'

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Table,Button,
  Col,Modal, ModalHeader, ModalBody, ModalFooter, Input
} from "reactstrap";
// core components
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart
} from "variables/charts.jsx";

class Dashboard extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        processos:[],
        processos_rev:0,
        obras:[],
        fonogramas:[],
        modal: false,
        modalFonograma: false,
        modalTitle:"Obras Recuperadas",
        modalFonogramaTitle:"Fonogramas Recuperados"
      };
      this.toggle = this.toggle.bind(this);
      this.toggleFonograma = this.toggleFonograma.bind(this);
    }

  componentDidMount(){
    api.get('/processo-list/1').then(res=>{
        this.setState({
          processos:res.data.docs, 
          processos_total:res.data.totalDocs, 
          processos_rev: res.data.docs.filter((obj) => obj.reviewed === true).length
        })
    })
  }
  
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  
  toggleFonograma() {
    this.setState({
      modalFonograma: !this.state.modalFonograma
    });
  }
  
  modalContent(obras){
    this.setState({
      obras: obras
    });

    this.toggle()
  }
  
  modalContentFonogramas(fonogramas){
    this.setState({
      fonogramas: fonogramas
    });

    this.toggleFonograma()
  }

  
  async checkProcesso(processo_id, reviewed){
    const check = reviewed ? false : true
    const revisados = this.state.processos_rev 
    
    try {
      const response = await api.post("/checkProcesso", {
        "processo_id":processo_id,
        "check_value":check
      });
      const key = this.state.processos.findIndex(el => el._id === processo_id)
      const processos = this.state.processos
      processos[key].reviewed = response.data.processo.reviewed
      this.setState({
        processos,
        processos_rev: (processos[key].reviewed ? revisados+1 : revisados-1)
      });         
      alert("Atualizado com Sucesso")
    } catch (err) {
      alert("Erro"+err)
    }
  }
  render() {
    return (
      <>
        <div className="content">
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
         <ModalHeader toggle={this.toggle}>{this.state.modalTitle}</ModalHeader>
         <ModalBody>
         {
         this.state.obras.map((obra,index) =>
            <div key={obra._id}>
            <h3>cód Ecad {obra.codEcad}</h3>
             <ul className="modalObras">
                 <li><b>Título: </b>{obra.titulo}</li>
                 <li><b>Interprete: </b>{obra.interprete}</li>
                 <li><b>Competencia: </b>{obra.competencia}</li>
                 <li><b>Faixa: </b>{obra.faixa}</li>
                 <li><b>Motivo: </b>{obra.motivo}</li>
                 <li><b>Execucao: </b>{obra.execucao}</li>
                 <li><b>Autores: </b>{obra.autores}</li>
             </ul>
             </div>
             )
         }
         </ModalBody>
         <ModalFooter>
           {/* <Button color='primary' onClick={this.toggle}>Do Something</Button>{' '} */}
           <Button color='primary' onClick={this.toggle}>Ok</Button>
         </ModalFooter>
       </Modal>

       <Modal isOpen={this.state.modalFonograma} toggle={this.toggleFonograma} className={this.props.className}>
         <ModalHeader toggle={this.toggle}>{this.state.modalFonogramaTitle}</ModalHeader>
         <ModalBody>
         {
         this.state.fonogramas.map((fonograma,index) =>
            <div key={fonograma._id}>
            <h3>cód Ecad {fonograma.codEcad}</h3>
             <ul className="modalObras">
                 <li><b>Título: </b>{fonograma.titulo}</li>
                 <li><b>Interprete: </b>{fonograma.interprete}</li>
                 <li><b>Competencia: </b>{fonograma.competencia}</li>
                 <li><b>Faixa: </b>{fonograma.faixa}</li>
                 <li><b>Motivo: </b>{fonograma.motivo}</li>
                 <li><b>Execucao: </b>{fonograma.execucao}</li>
                 <li><b>Autores: </b>{fonograma.autores}</li>
             </ul>
             </div>
             )
         }
         </ModalBody>
         <ModalFooter>
           <Button color='primary' onClick={this.toggleFonograma}>Ok</Button>
         </ModalFooter>
       </Modal>
          <Row>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-globe text-warning" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Nº Processos</p>
                        <CardTitle tag="p">{this.state.processos_total}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fas fa-sync-alt" />{this.state.processos_rev} Processos Prontos
                  </div>
                </CardFooter>
              </Card>
            </Col>
            {/* <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-money-coins text-success" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Revenue</p>
                        <CardTitle tag="p">$ 1,345</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="far fa-calendar" /> Last day
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-vector text-danger" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Errors</p>
                        <CardTitle tag="p">23</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="far fa-clock" /> In the last hour
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-favourite-28 text-primary" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Followers</p>
                        <CardTitle tag="p">+45K</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fas fa-sync-alt" /> Update now
                  </div>
                </CardFooter>
              </Card>
            </Col> */}
          </Row>

          <Row>
              <Col md="12">
              <Card>
              <CardHeader>
                  <CardTitle tag="h4">Processos</CardTitle>
              </CardHeader>
              <CardBody className="processosTable">
              <Table>
                  <thead>
                      <tr>
                      <th>Pronto</th>
                      <th>Data</th>
                      {/*<th>Tipo</th>*/}
                      <th>Nome</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Status Fono</th>
                      <th style={{textAlign: "center"}}>Obras</th>
                      <th style={{textAlign: "center"}}>Fonogramas</th>
                      </tr>
                  </thead>
                  <tbody>
                      {
                      this.state.processos.map((processo,index) =>
                          <tr key={processo._id}>
                              <td>
                                <Input 
                                  type="checkbox" 
                                  style={{position:"inherit",marginLeft:"0px"}} 
                                  onChange={this.checkProcesso.bind(this, processo._id, processo.reviewed)}
                                  defaultChecked={processo.reviewed?true:false}
                                  />{' '}</td>
                              {/*<td>{processo.tipo}</td>*/}
                              <td>{processo.createdAt}</td>
                              <td>{processo.nome}</td>
                              <td>{processo.email}</td>
                              <td>{processo.status}</td>
                              <td>{processo.status_fonograma}</td>
                              <td className="detalhes" onClick={this.modalContent.bind(this,processo.obras)}><i className="nc-icon nc-simple-add"></i></td>
                              <td className="detalhes" onClick={this.modalContentFonogramas.bind(this,processo.fonogramas)}><i className="nc-icon nc-simple-add"></i></td>
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
      </>
    );
  }
}

export default Dashboard;
