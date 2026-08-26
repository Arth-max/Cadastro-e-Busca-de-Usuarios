import Trash from '../../assets/trash.png'
import ImgLogin from '../../assets/Imglogin.jpg'
import './style.css'
import { useState, useRef, useEffect } from 'react'
import API from '../../hooks/user.js'

function Home() {
  const [users, setUsuario] = useState([]) //estado do usuário
  const [tela, setTela] = useState('login')

  const inputName = useRef()
  const inputEmail = useRef()
  const inputSenha = useRef()

  const CinputName = useRef()
  const CinputEmail = useRef()
  const CinputSenha = useRef()

  //função buscar usuários pela API
  async function findUsers() {
    try {
      const email = inputEmail.current.value
      const nome = inputName.current.value
      const senha = inputSenha.current.value

      if (email == '' || nome == '' || senha == '') {
        alert("Usuário nao encontrado, Por favor digite todos os campos")
        return
      }

      const userFromAPI = await API.get('/usuario?email=' + email + "&senha=" + senha + "&nome=" + nome) 
      setUsuario([userFromAPI.data])
    } catch (error) {
        console.log("Por favor, revise se todos os campos estão corretos" + error)
    }
      alert("validado com sucesso")
  }

  //função criar usuários pela API
  async function createUsers() {
    try {
       if (CinputName.current.value === '' || CinputEmail.current.value === '' || CinputSenha.current.value === '') {
        alert("Usuário nao cadastrado, Por favor digite todos os campos")
        return
      }

      await API.post('/usuario', {
        nome: CinputName.current.value,
        email: CinputEmail.current.value,
        senha: CinputSenha.current.value
      })
      alert("Usuário cadastrado com sucesso!")

      CinputName.current.value = ''
      CinputEmail.current.value = ''
      CinputSenha.current.value = ''
    } catch (error) {
        alert("Usuário nao cadastrado" + error)
    }
  }
  
  //função atualizar usuários pela API
  async function updateUsers() {
    const id = inputID.current.value
    const dados = {}

    if (id === '') {
      console.log("Usuário nao atualizado, Por favor digite o ID do mesmo")
      return
    }
    try {
      if (inputName.current.value != "") { //verifica se o inputName não está vazio
        dados.nome = inputName.current.value
      }
      if (inputEmail.current.value != "") { //verifica se o inputEmail não está vazio
        dados.email = inputEmail.current.value
      }
      if (inputSenha.current.value != "") { // verifica se o inputSenha não está vazio
        dados.senha = inputSenha.current.value
      } 

      await API.put(`/usuario?Id=${id}`, dados)
      
      inputName.current.value = ''
      inputEmail.current.value = ''
      inputSenha.current.value = ''
      inputID.current.value = ''

      console.log("Usuário atualizado com sucesso!")

    } catch (error) {
        console.log("Não foi possível atualziar o usuário" + error)
    }
  }

  //função deletar usuários pela API
  async function deleteUsers(email) {
    try {
      await API.delete(`/usuario?email=${email}`)
        console.log("Usuário deletado com sucesso!")

        setUsuario(PrevUsers => PrevUsers.filter(user => user.email !== email))

        inputEmail.current.value = ''
    } catch(error) {
        console.log("Não foi possível deletar o usuário" + error)
    }
  }

  async function forgotPassword() {
    
  } 

  function telaLogin() {
    setTela('login')
  }

  function telaCadastro() {
    setTela('cadastro')
  }

  useEffect(() => {
    
  },[])

  return (
    <div className='App' style={{backgroundImage: `url(${ImgLogin})`}}>
      
      <div className='botoes'>
          <button className='botoesPrincipais' onClick={telaLogin}>Fazer Login</button>
          <br/>
          <button className='botoesPrincipais' onClick={telaCadastro}>Criar Conta</button>
        </div>

      <form className='form1' style={{display: tela === 'login' ? 'flex' : 'none'}}>
        <h1>Login</h1>
        <input name="name" type="text" placeholder='Nome' ref={inputName}/>
        <input name="Email" type="email" placeholder='Email' ref={inputEmail}/>
        <input name="senha" type="password" placeholder='Senha' ref={inputSenha}/>
        <button type="button" onClick={findUsers}>Entrar</button>
        <button type="button" onClick={forgotPassword}>Esqueci minha senha</button>
      </form>

       <form className='form2' style={{display: tela === 'cadastro' ? 'flex' : 'none'}}> 
        <h1>Cadastro</h1>
        <input name="name" type="text" placeholder='Nome' ref={CinputName}/>
        <input name="Email" type="email" placeholder='Email' ref={CinputEmail}/>
        <input name="senha" type="password" placeholder='Senha' ref={CinputSenha}/>
        <button type="button" onClick={createUsers}>Cadastrar</button>
      </form>

      {users?.map(user => (
        <div onClick={RmvCardUser} key={user.id} className='cards'>
          <div>
            <p>Nome: <span>{user.nome}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button onClick={() => deleteUsers(user.email)}>
            <img src={Trash} width={30} height={30}/>
          </button>
        </div>
      ))};
    </div>
  )
}

export default Home