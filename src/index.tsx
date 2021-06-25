import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Apenas importando o arquivo de configuração
// do firebase, a conexão já é realizada
import './services/firebase'

import './styles/global.scss'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
