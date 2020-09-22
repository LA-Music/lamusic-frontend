import React from 'react';
import DynamicTable from 'components/Table';
import { TableContainer } from './styles';

const TableSolicitations = ({
  header:[
    { name: 'Nome',     key: 'name'     }, 
    { name: 'CPF',      key: 'cpf'      }, 
    { name: 'E-mail',   key: 'email'    },
    { name: 'Produto',  key: 'product'  },
    { name: 'Etapa',    key: 'step'     },
    { name: 'Status',   key: 'status'   },
  ],
  body:[
    { name: 'Dakota Rice',     cpf: '26.05.20', email: 'Registrada', product: 'Liberação de Créditos', step: 'Aguardando Retorno', status: 'Negado' }, 
    { name: 'Minerva Hooper',  cpf: '20.05.20', email: 'Em analise', product: 'Liberação de Créditos', step: 'Aguardando Retorno', status: 'Negado' },
    { name: 'Doris Greene',    cpf: '15.05.20', email: 'Em analise', product: 'Liberação de Créditos', step: 'Aguardando Retorno', status: 'Negado' },
    { name: 'Jon Porter',      cpf: '04.05.20', email: 'Em analise', product: 'Liberação de Créditos', step: 'Aguardando Retorno', status: 'Negado' },
    { name: 'Dakota Rice',     cpf: '26.05.20', email: 'Registrada', product: 'Liberação de Créditos', step: 'Aguardando Retorno', status: 'Negado' }, 
    { name: 'Minerva Hooper',  cpf: '20.05.20', email: 'Em analise', product: 'Liberação de Créditos', step: 'Aguardando Retorno', status: 'Negado' },
    { name: 'Doris Greene',    cpf: '15.05.20', email: 'Em analise', product: 'Liberação de Créditos', step: 'Aguardando Retorno', status: 'Negado' },
    { name: 'Jon Porter',      cpf: '04.05.20', email: 'Em analise', product: 'Liberação de Créditos', step: 'Aguardando Retorno', status: 'Negado' },
    { name: 'Dakota Rice',     cpf: '26.05.20', email: 'Registrada', product: 'Liberação de Créditos', step: 'Aguardando Retorno', status: 'Negado' }, 
    { name: 'Minerva Hooper',  cpf: '20.05.20', email: 'Em analise', product: 'Liberação de Créditos', step: 'Aguardando Retorno', status: 'Negado' },
    { name: 'Doris Greene',    cpf: '15.05.20', email: 'Em analise', product: 'Liberação de Créditos', step: 'Aguardando Retorno', status: 'Negado' },
    { name: 'Jon Porter',      cpf: '04.05.20', email: 'Em analise', product: 'Liberação de Créditos', step: 'Aguardando Retorno', status: 'Negado' },
    { name: 'Dakota Rice',     cpf: '26.05.20', email: 'Registrada', product: 'Liberação de Créditos', step: 'Aguardando Retorno', status: 'Negado' }, 
    { name: 'Minerva Hooper',  cpf: '20.05.20', email: 'Em analise', product: 'Liberação de Créditos', step: 'Aguardando Retorno', status: 'Negado' },
    { name: 'Doris Greene',    cpf: '15.05.20', email: 'Em analise', product: 'Liberação de Créditos', step: 'Aguardando Retorno', status: 'Negado' },
    { name: 'Jon Porter',      cpf: '04.05.20', email: 'Em analise', product: 'Liberação de Créditos', step: 'Aguardando Retorno', status: 'Negado' },
    { name: 'Dakota Rice',     cpf: '26.05.20', email: 'Registrada', product: 'Liberação de Créditos', step: 'Aguardando Retorno', status: 'Negado' }, 
    { name: 'Minerva Hooper',  cpf: '20.05.20', email: 'Em analise', product: 'Liberação de Créditos', step: 'Aguardando Retorno', status: 'Negado' },
    { name: 'Doris Greene',    cpf: '15.05.20', email: 'Em analise', product: 'Liberação de Créditos', step: 'Aguardando Retorno', status: 'Negado' },
    { name: 'Jon Porter',      cpf: '04.05.20', email: 'Em analise', product: 'Liberação de Créditos', step: 'Aguardando Retorno', status: 'Negado' },
  ]
}
)

function Solicitacoes() {
  return (
    <div className="content">
      <TableContainer>
        <div className="mb-3 d-flex align-items-center justify-content-between">
          <h2 className="m-0">Solicitações</h2> <span>Últimos 6 meses</span>
        </div>
        <DynamicTable moreItems={5} limitItems={10} {...TableSolicitations} />
      </TableContainer>
    </div>
    );
}

export default Solicitacoes;