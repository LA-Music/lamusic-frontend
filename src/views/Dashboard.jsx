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
  Col,Modal, ModalHeader, ModalBody, ModalFooter
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
        obras:[],
        modal: false,
        modalTitle:"Obras Recuperadas"
      };
      this.toggle = this.toggle.bind(this);
    }

  componentDidMount(){
      api.get('/processo-list/1').then(res=>{
          this.setState({processos:res.data.docs})
      })
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  modalContent(obras){
    this.setState({
      obras: obras
    });

    this.toggle()
  }
  render() {
    return (
      <>
        <div className="content">
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
         <ModalHeader toggle={this.toggle}>{this.state.modalTitle}</ModalHeader>
         <ModalBody>
         {
         this.state.obras.map((obra,index)=>
            <div key={obra._id}>
            <h3>cód Ecad {obra.codEcad}</h3>
             <ul className="modalObras">
                 <li><b>Título: </b>{obra.titulo}</li>
                 <li><b>Interprete: </b>{obra.interprete}</li>
                 <li><b>Competencia: </b>{obra.competencia}</li>
                 <li><b>Faixa: </b>{obra.faixa}</li>
                 <li><b>Motivo: </b>{obra.motivo}</li>
                 <li><b>Execucao: </b>{obra.execucao}</li>
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
                        <p className="card-category">Capacity</p>
                        <CardTitle tag="p">150GB</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fas fa-sync-alt" /> Update Now
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
            </Col>
          </Row>

          <Row>
              <Col md="12">
              <Card>
              <CardHeader>
                  <CardTitle tag="h4">Processos</CardTitle>
              </CardHeader>
              <CardBody>
              <Table responsive>
                  <thead>
                      <tr>
                      {/* <th>#</th> */}
                      <th>Tipo</th>
                      <th>Nome</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th style={{textAlign: "center"}}>Detalhes</th>
                      </tr>
                  </thead>
                  <tbody>
                      {
                      this.state.processos.map((processo,index)=>
                          <tr key={processo._id}>
                              <td>{processo.tipo}</td>
                              <td>{processo.nome}</td>
                              <td>{processo.email}</td>
                              <td>{processo.status}</td>
                              <td className="detalhes" onClick={this.modalContent.bind(this,processo.obras)}><i className="nc-icon nc-simple-add"></i></td>
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
