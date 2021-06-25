import firebase from 'firebase/app'

// importando os serviços que iremos
// utilizar do firebase
import 'firebase/auth'
import 'firebase/database'

// configuração do firebase, disponibilizada
// após a criação do projeto no console
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

// iniciando o firebase com as configurações acima
firebase.initializeApp(firebaseConfig)

// exportação das constantes contendo
// as funções de authentication e database do firebase
// para evitar repetidas importações do firebase e
// escrita de "firebase.auth, firebase.etc..."
const auth = firebase.auth()
const database = firebase.database()

export { firebase, auth, database }