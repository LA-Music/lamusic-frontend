import React, { useState } from "react";
import api from '../../services/api'
import { login } from "../../services/auth";
import '../../assets/css/Login.css'
import {
    Container,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Row,
    Col
  } from "reactstrap";
  import { Link, Dcard, BtLogin, Label, TitleCard, InpText } from './styles'

const Login = (props) => {
    const [ state, setState ] = useState({ email: '', senha: '', error: '', typeForm: 'Login' }) 
    const [ typeForm ] = useState( { Login: {inputs:[ { label: 'Endereço de e-mail:', type: 'email', name: 'email', placeholder: 'luiz@lamusic.com.br' },
                                                      { label: 'Senha:', type: 'password', name: 'senha', placeholder: '*******' }]},
                                      Reset: {inputs:[{label: 'Seu e-mail:', type: 'email', name: 'email', placeholder: 'luiz@lamusic.com.br'}]},
                                      Register: {inputs:[{ label: 'Endereço de e-mail:', type: 'email', name: 'email', placeholder: 'luiz@lamusic.com.br'},
                                                         { label: 'Seu nome completo:', type: 'text', name: 'nome', placeholder: ''}, 
                                                         { label: 'CPF:', type: 'text', name: 'cpf', placeholder: ''},
                                                         { label: 'Número de telefone:', type: 'tel', name: 'telefone', placeholder: '(00) 0 0000-0000'}]}});

    async function handleSignIn (e) {
        e.preventDefault();
        const { email, senha } = state;
        if (!email || !senha) {
          setState({ error: "Preencha e-mail e senha para continuar!" });
        } else {
          try {
              const response = await api.post("/autentificar", { email, senha });
              login(response.data.token, response.data.nome);
              if (response.data.papel === 'admin') {
                props.history.push("/admin/dashboard");
              }else {
                props.history.push("/user/credito-retido");
              }
          } catch (err) {
              setState({
              error:
                  "Houve um problema com o login, verifique suas credenciais. T.T"
              });
          }
        }
    }
  return (
      <Container>
        <Row style={{marginTop: '10rem'}}>
          <Col md="8" style={{margin:"0 auto", display: 'flex', justifyContent: 'center'}}>
            {state.typeForm === 'Login' && (
              <Dcard className="card-user">
                <CardHeader>
                  <TitleCard tag="h5">Acessar minha conta</TitleCard>
                </CardHeader>
                <CardBody>
                  <Form autoComplete="off" onSubmit={handleSignIn}>
                    {state.error && <p>{state.error}</p>}
                    {typeForm[state.typeForm].inputs.map((e, index) => 
                      <Row key={index}>
                        <Col>
                          <FormGroup>
                            <Label>{e.label}</Label>
                            <InpText
                              autoComplete="email"
                              placeholder={e.placeholder}
                              type={e.type}
                              name={e.name}
                              onChange={e => setState({...state, [e.target.name]: e.target.value })} />
                          </FormGroup>
                        </Col>
                      </Row>
                    )}
                    <Row style={{marginBottom: '1rem'}}>
                      <Col style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Link onClick={() => setState({...state, typeForm: 'Register'})}>Não tenho uma conta</Link>
                        <Link onClick={() => setState({...state, typeForm: 'Reset'})}>Esqueci minha senha</Link>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <BtLogin type="submit">Login</BtLogin>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Dcard>
            )}
          {state.typeForm === 'Register' && (
            <Dcard className="card-user">
             <CardHeader>
               <TitleCard tag="h5">Criar uma conta</TitleCard>
             </CardHeader>
             <CardBody>
               <Form autoComplete="off" onSubmit={handleSignIn}>
                 {state.error && <p>{state.error}</p>}
                 {typeForm[state.typeForm].inputs.map((e, index) => 
                    <Row key={index}>
                      <Col>
                        <FormGroup>
                          <Label>{e.label}</Label>
                          <InpText
                            autoComplete="email"
                            placeholder={e.placeholder}
                            type={e.type}
                            name={e.name}
                            onChange={e => setState({[e.target.name]: e.target.value })} />
                        </FormGroup>
                      </Col>
                    </Row>
                  )}
                 <Row>
                   <Col>
                     <BtLogin type="submit">Criar conta</BtLogin>
                   </Col>
                 </Row>
               </Form>
             </CardBody>
            </Dcard>
          )}
          {state.typeForm === 'Reset' && (
            <Dcard className="card-user">
            <CardHeader>
              <TitleCard tag="h5">Esqueceu sua senha?</TitleCard>
            </CardHeader>
            <CardBody>
              <Form autoComplete="off" onSubmit={handleSignIn}>
                {state.error && <p>{state.error}</p>}
                {typeForm[state.typeForm].inputs.map((e,index) => 
                   <Row key={index}>
                     <Col>
                       <FormGroup>
                         <Label>{e.label}</Label>
                         <InpText
                           autoComplete="email"
                           placeholder={e.placeholder}
                           type={e.type}
                           name={e.name}
                           onChange={e => setState({[e.target.name]: e.target.value })} />
                       </FormGroup>
                     </Col>
                   </Row>
                 )}
                <Row style={{marginBottom: '1rem'}}>
                  <Col style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Link onClick={() => setState({...state, typeForm: 'Register'})}>Não tenho uma conta</Link>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <BtLogin type="submit">Enviar</BtLogin>
                  </Col>
                </Row>
              </Form>
            </CardBody>
           </Dcard>
          )}
            
          </Col>
        </Row>
      </Container>
  );
}

export default Login;

// class Login extends React.Component {

//     state = {
//         email: "",
//         senha: "",
//         error: ""
//       };

//       handleSignIn = async e => {
//           e.preventDefault();
//           const { email, senha } = this.state;
//           if (!email || !senha) {
//           this.setState({ error: "Preencha e-mail e senha para continuar!" });
//           } else {
//           try {
//               const response = await api.post("/autentificar", { email, senha });
//               login(response.data.token, response.data.nome);
//               if (response.data.papel === 'admin') {
//                 this.props.history.push("/admin/dashboard");
//               }else {
//                 this.props.history.push("/user/credito-retido");
//               }
//           } catch (err) {
//               this.setState({
//               error:
//                   "Houve um problema com o login, verifique suas credenciais. T.T"
//               });
//           }
//           }
//       }
//     render(){
//         return (
//             <>
//             <Container>
//                 <Row style={{marginTop: '10rem'}}>
//                 <Col md="8" style={{margin:"0 auto", display: 'flex', justifyContent: 'center'}}>
//                   <Dcard className="card-user">
//                     <CardHeader>
//                       <TitleCard tag="h5">Acessar minha conta</TitleCard>
//                     </CardHeader>
//                     <CardBody>
//                       <Form autoComplete="off" onSubmit={this.handleSignIn}>
//                         {this.state.error && <p>{this.state.error}</p>}
//                         <Row>
//                           <Col>
//                             <FormGroup>
//                               <Label>Endereço de e-mail: </Label>
//                               <InpText
//                                 autoComplete="email"
//                                 placeholder="Nome de Usuário"
//                                 type="email"
//                                 name="email"
//                                 onChange={e => this.setState({email: e.target.value })}
//                               />
//                             </FormGroup>
//                           </Col>
//                           </Row>
//                           <Row>
//                           <Col>
//                             <FormGroup>
//                               <Label htmlFor="exampleInputEmail1">
//                                 Senha:
//                               </Label>
//                               <InpText
//                               autoComplete="new-password"
//                                 type="password"
//                                 name="senha"
//                                 onChange={e => this.setState({senha: e.target.value})}
//                                 />
//                             </FormGroup>
//                           </Col>
//                         </Row>
//                         <Row style={{marginBottom: '1rem'}}>
//                           <Col style={{display: 'flex', justifyContent: 'space-between'}}>
//                             <Link href="#">Não tenho uma conta</Link>
//                             <Link href="#">Esqueci minha senha</Link>
//                           </Col>
//                         </Row>
//                         <Row>
//                           <Col>
//                             <BtLogin type="submit">
//                               Login
//                             </BtLogin>
//                           </Col>
//                         </Row>
//                       </Form>
//                     </CardBody>
//                   </Dcard>
//                 </Col>
//               </Row>
//             </Container>
//           </>
//         );
//     }
// }
// export default Login;
