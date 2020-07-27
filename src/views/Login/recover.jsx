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
import { useDispatch, useSelector } from 'react-redux';
import { Link, Dcard, BtLogin, Label, TitleCard, InpText } from './styles'

const Recover = (props) => {
    const { Recover } = useSelector(r => r)
    const dispatch = useDispatch();
    const [ state, setState ] = useState({ email: '', senha: '', error: '' }) 

    async function handleRecover (e) {
        e.preventDefault();
        const { email, senha } = state;
        if (!email || !senha) {
          setState({...state, error: "Preencha e-mail e senha para continuar!" });
          return false
        } else {
          try {
              const response = await api.post("/autentificar", { email, senha });
              
            } catch (err) {
              setState({...state,
              error:
                  "Houve um problema com o login, verifique suas credenciais. T.T"
              });
          }
        }
    }
  return (

          <Dcard className="card-user px-0 px-md-3">
            <CardHeader>
              <TitleCard tag="h5">Esqueceu sua senha?</TitleCard>
            </CardHeader>
            <CardBody>
              <Form autoComplete="off" onSubmit={handleRecover}>
                {state.error && <p>{state.error}</p>}
                {Recover.inputs.map((e,index) => 
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
                <Row className="mb-3">
                  <Col className="d-flex justify-content-between">
                    <Link onClick={() => dispatch({ type: 'TYPE_FORM', payload: 'Register'})}>Não tenho uma conta</Link>
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

  );
}

export default Recover;