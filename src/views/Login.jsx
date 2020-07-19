import React from "react";
import api from '../services/api'
import { login } from "../services/auth";
import '../assets/css/Login.css'
import {
    Container,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    FormGroup,
    Form,
    Input,
    Row,
    Col
  } from "reactstrap";

class Login extends React.Component {

    state = {
        email: "",
        senha: "",
        error: ""
      };

      handleSignIn = async e => {
          e.preventDefault();
          const { email, senha } = this.state;
          if (!email || !senha) {
          this.setState({ error: "Preencha e-mail e senha para continuar!" });
          } else {
          try {
              const response = await api.post("/autentificar", { email, senha });
              login(response.data.token, response.data.nome);
              if (response.data.papel === 'admin') {
                this.props.history.push("/admin/dashboard");
              }else {
                this.props.history.push("/user/credito-retido");
              }
          } catch (err) {
              this.setState({
              error:
                  "Houve um problema com o login, verifique suas credenciais. T.T"
              });
          }
          }
      }
    render(){
        return (
            <>
            <Container>
              <Row style={{paddingTop:"10em"}}>
                <Col md="8" style={{margin:"0 auto"}} >
                  <Card className="card-user update ml-auto mr-auto">
                    <div className="image">
                      <img
                        alt="..."
                        src={require("assets/img/concert.png")}
                      />
                    </div>
                  </Card>
                </Col>
                </Row>
                <Row >
                <Col md="8" style={{margin:"0 auto"}}>
                  <Card className="card-user">
                    <CardHeader>
                      <CardTitle tag="h5">Acessar minha conta</CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Form onSubmit={this.handleSignIn}>
                        {this.state.error && <p>{this.state.error}</p>}
                        <Row>
                          <Col>
                            <FormGroup>
                              <label>Endereço de e-mail: </label>
                              <Input
                                placeholder="Nome de Usuário"
                                type="email"
                                onChange={e => this.setState({email: e.target.value })}
                              />
                            </FormGroup>
                          </Col>
                          </Row>
                          <Row>
                          <Col>
                            <FormGroup>
                              <label htmlFor="exampleInputEmail1">
                                Senha:
                              </label>
                              <Input
                                type="password"
                                onChange={e => this.setState({senha: e.target.value})}
                                />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <div className="update ml-auto mr-auto">
                            <Button
                              className="btn-round"
                              color="primary"
                              type="submit"
                            >
                              Login
                            </Button>
                          </div>
                        </Row>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </>
        );
    }
}
export default Login;
