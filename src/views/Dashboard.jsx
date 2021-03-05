import React from "react";
import api from '../services/api'
import { CSVLink, CSVDownload } from "react-csv";
import classnames from 'classnames';
import InfiniteScroll from "react-infinite-scroll-component";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";

import '../assets/css/Dashboard.css'
import Checkbox from '../components/Checkbox'
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Table,
  Button,
  Col, 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Input, 
  TabContent, 
  TabPane, 
  Nav, 
  NavItem,
  NavLink,
  CardText,
  FormGroup,
  Label,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
} from "reactstrap";
// core components
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart
} from "variables/charts.jsx";
import { id } from "chartjs-plugin-annotation";



class Dashboard extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        processos:[],
        processos_rev:0,
        obras:[],
        fonogramas:[],
        modal: false,
        modalTitle:"",
        activeTab: '1',
        hasMore: true,
        page:1,
        timeline_data:{},
        selected:"Realizar",
        intems:[],
        checkedItems: new Map(),
      };
      this.toggle = this.toggle.bind(this);
      this.toggleTab = this.toggleTab.bind(this);
    }

  componentDidMount(){
    api.get('/processo-list/'+this.page).then(res=>{
      console.log(this.state.page)
        this.setState({
          page: this.state.page+1,
          processos:res.data.docs, 
          processos_total:res.data.totalDocs, 
          processos_rev: res.data.docs.filter((obj) => obj.reviewed === true).length
        })
    })

    api.get('/credito-retido-list/').then(res=>{ 
      console.log(Object.values(res.data))            
        const data = (canvas) => {
          return {
            labels: Object.keys(res.data).reverse(),
            type: "line",
            datasets: [
              {
                borderColor: "#6bd098",
                backgroundColor: "#6bd098",
                pointRadius: 3,
                pointHoverRadius: 3,
                borderWidth: 1,
                data: Object.values(res.data).reverse(),
                label: "Crédito Retido",
                fill:false,                
              }
            ]
          };
        }        

        this.setState({
          timeline_data:data          
        })
    })
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  
  modalContentResultados(processo){
    this.setState({
      modalTitle: "Resultados de "+processo.nome,
      obras: processo.obras,
      fonogramas: processo.fonogramas
    })
    this.toggle()
  }

  fetchMoreData = () => {
    if (this.state.processos.length >= this.state.processos_total) {
      this.setState({ hasMore: false });
      return;
    }
    setTimeout(() => {
    api.get('/processo-list/'+this.state.page).then(res=>{
      this.setState({
        page: this.state.page+1,
        processos: this.state.processos.concat(res.data.docs)
      })
    }) 
  }, 1500); 
  };


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

  handleAction = async e => {
    e.preventDefault();
    if(this.state.selected === "Realizar"){
      const ids = this.state.checkedItems.keys()
        for (const item of ids) {
          alert(`Ativando Bot para: ${item}`)
          try { 
            await api.post("/updatePuppet/", {
              "processo_id":item
            });
          } catch (error) {
            alert(error)
          }
         alert(`${item} Atualizado com Sucesso`)
        }
    }else if(this.state.selected === "Pronto"){
      const ids = this.state.checkedItems.keys()
      for (const item of ids) {
        await api.post("/checkProcesso", {
          "processo_id":item,
          "check_value":true
        });
      }
    }
    window.location.reload()
  }
  
  handleSelect = async e => {
    this.setState({
      selected:e.target.value
    })
  }

  handleChange = e => {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
  }

  render() {
    return (
      <>    
      <div className="content">
      
      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
         <ModalHeader toggle={this.toggle}>{this.state.modalTitle}</ModalHeader>
         <ModalBody>
         <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: this.state.activeTab === '1' })}
            onClick={() => { this.toggleTab('1'); }}
          >
            Obras
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: this.state.activeTab === '2' })}
            onClick={() => { this.toggleTab('2'); }}
          >
            Fonogramas
          </NavLink>
        </NavItem>
      </Nav>
      
      <TabContent activeTab={this.state.activeTab}>
        <TabPane tabId="1">
        {
         this.state.obras.map((obra,index) =>
            <Row key={obra._id}>
              <CardBody>
              <CardTitle>cód Ecad {obra.codEcad}</CardTitle>
              <ul className="modalObras">
                  <li><b>Título: </b>{obra.titulo}</li>
                  <li><b>Interprete: </b>{obra.interprete}</li>
                  <li><b>Competencia: </b>{obra.competencia}</li>
                  <li><b>Faixa: </b>{obra.faixa}</li>
                  <li><b>Motivo: </b>{obra.motivo}</li>
                  <li><b>Execucao: </b>{obra.execucao}</li>
                  <li><b>Autores: </b>{obra.autores}</li>
              </ul>
              </CardBody>
             </Row>
             )
         }
        </TabPane>
        <TabPane tabId="2">
        {
         this.state.fonogramas.map((fonograma,index) =>
            <Row key={fonograma._id}>
            <CardBody>
            <CardTitle>cód Ecad {fonograma.codEcad}</CardTitle>
              <ul className="modalObras">
                  <li><b>Título: </b>{fonograma.titulo}</li>
                  <li><b>Interprete: </b>{fonograma.interprete}</li>
                  <li><b>Competencia: </b>{fonograma.competencia}</li>
                  <li><b>Faixa: </b>{fonograma.faixa}</li>
                  <li><b>Motivo: </b>{fonograma.motivo}</li>
                  <li><b>Execucao: </b>{fonograma.execucao}</li>
                  <li><b>Autores: </b>{fonograma.autores}</li>
              </ul>
            </CardBody>
             </Row>
             )
         }
        </TabPane>
      </TabContent>
         </ModalBody>
         <ModalFooter>
           <Button color='primary' onClick={this.toggle}>Ok</Button>
         </ModalFooter>
       </Modal>

       <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h5">Requisições</CardTitle>
                  <p className="card-category">Solicitações de Crédito Retido</p>
                </CardHeader>
                <CardBody>
                  <Line
                    data={this.state.timeline_data}
                    options={dashboard24HoursPerformanceChart.options}
                    width={400}
                    height={100}
                  />
                </CardBody>
                {/*   */}
              </Card>
            </Col>
          </Row>
          <hr />

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
                  <br/>
                  <CSVLink 
                      data={this.state.processos} 
                      filename={"Processos.csv"}
                      className="btn btn-primary"
                      separator={";"}
                      > Exportar Processos </CSVLink>
                </CardFooter>
              </Card>
            </Col>
            <Col>
            <Card className="card-stats">
            <CardBody>
                  <InputGroup className="no-border">
                  <Input placeholder="Procurar..." />
                  <InputGroupAddon addonType="append">
                    <InputGroupText>
                      <i className="nc-icon nc-zoom-split" />
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </CardBody>
            </Card>            
            <Card>
              <CardBody>
                <FormGroup>
                  <Label for="SelectAcao">Ação</Label>
                  {/* <Input type="select" name="select" id="SelectAcao" onChange={this.handleSelect} defaultValue="Realizar">
                    <option value="Realizar">Realizar Consulta</option>
                    <option value="Pronto">Marcar Como Pronto</option>
                  </Input> */}
                  <Input type="select" name="select" id="SelectAcao" onChange={this.handleSelect} defaultValue="Pesquisa">
                    <option value="Pesquisa">Em pesquisa</option>
                    <option value="Realizar">Relatório enviado - lead</option>
                    <option value="Realizar">Em negociação</option>
                    <option value="Realizar">Contrato enviado</option>
                    <option value="Realizar">Contrato assinado</option>
                    <option value="Realizar">Retido em liberação</option>
                    <option value="Realizar">Retido resgatado</option>
                    
                  </Input>
                  <Button
                    className="btn-round"
                    color="warning"
                    type="submit"
                    onClick={this.handleAction}
                    >
                    Enviar
                    </Button>
                </FormGroup>
              </CardBody>
            </Card>
            </Col>
          </Row>        
        <hr />
        <Row>
         
              
              <Col md="12">
                <Card>
                <CardHeader>
                    <CardTitle tag="h4">Processos</CardTitle>
                </CardHeader>
                <CardBody className="processosTable">
                <InfiniteScroll
                    dataLength={this.state.processos.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.hasMore}
                    loader={
                      <div style={{ textAlign: "center" }}>

                    <Loader
                      type="ThreeDots"
                      color="#f8c558"
                      height={80}
                      width={80}
                      timeout={1500} //3 secs
                   />
                   </div>
                  }
                    height={500}
                    endMessage={
                      <p style={{ textAlign: "center" }}>
                        <b>Todos os processos já foram listados</b>
                      </p>
                    }
                    >

              <Table>
                  <thead>
                      <tr>
                      <th>#</th>
                      <th>Status</th>
                      <th>Data</th>
                      <th>Nome</th>
                      <th>Email</th>
                      <th>Associado</th>
                      <th>Status Obras</th>
                      <th>Status Fono</th>
                      <th style={{textAlign: "center"}}>Resultados</th>
                      </tr>
                  </thead>
                  <tbody>
                   {
                      this.state.processos.map((processo,index) =>
                          <tr key={processo._id}>
                            <td>
                            <Checkbox name={processo._id} checked={this.state.checkedItems.get(processo._id)} onChange={this.handleChange} />
                            </td>
                              <td style={{textAlign:"center"}}>
                                {
                                  processo.reviewed?<i className="fa fa-check" aria-hidden="true"></i>:<i className="fa fa-times" aria-hidden="true"></i>
                                }
                              </td>
                              <td>{processo.createdAt}</td>
                              <td>{processo.nome}</td>
                              <td>{processo.email}</td>
                              <td>{processo.cadastro_Abrammus?"Sim":"Não"}</td>
                              <td>{processo.status}</td>
                              <td>{processo.status_fonograma}</td>
                              <td className="detalhes" onClick={this.modalContentResultados.bind(this, processo)}><i className="nc-icon nc-simple-add"></i></td>
                          </tr>
                          )
                      }
                  </tbody>
                  </Table>
                  </InfiniteScroll>
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
