import Trash from '../../assets/trash.png'
import ImgLogin from '../../assets/Imglogin.jpg'
import './style.css'
import { useState, useRef, useEffect } from 'react'
import API from '../../hooks/user.js'
import { setEmail } from '../../hooks/user'

function Home() {
  const [users, setUsuario] = useState([]) //estado do usuário
  const [tela, setTela] = useState('login')

  //login
  const inputName = useRef()
  const inputEmail = useRef()
  const inputSenha = useRef()

  //cadastro
  const CinputName = useRef()
  const CinputEmail = useRef()
  const CinputSenha = useRef()

  //esqueci senha
  const codigo = useRef()
  const NinputSenha = useRef()
  const Email = useRef()
  const NinputName = useRef()

  //ativar tela login
  function telaLogin() {
    setTela('login')
  }
  //ativar tela cadastro
  function telaCadastro() {
    setTela('cadastro')
  }
  //ativar tela esqueci senha
  function forgotPassword() {
    setTela('esqueciSenha')
  }

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

      await API.get('/usuario?email=' + email + "&senha=" + senha + "&nome=" + nome)
      alert("validado com sucesso") 

      inputName.current.value = ''
      inputEmail.current.value = ''
      inputSenha.current.value = ''
    } catch (error) {
        alert("Por favor, revise se todos os campos estão corretos\n" + error)
    }
  }

  //função criar usuários pela API
  async function createUsers() {
    try {
      if (CinputName.current.value === "" || CinputEmail.current.value === "" || CinputSenha.current.value === "") {
        alert("Usuário nao cadastrado, Por favor digite todos os campos")
        return
      } else {
        await API.post('/usuario', {
          nome: CinputName.current.value,
          email: CinputEmail.current.value,
          senha: CinputSenha.current.value
        })
        alert("Usuário cadastrado com sucesso! Foi enviado um email para o senhor")

        CinputName.current.value = ''
        CinputEmail.current.value = ''
        CinputSenha.current.value = ''
      }
    } catch (error) {
        alert("Usuário nao cadastrado" + error)
    }
  }
  
  //função atualizar usuários pela API
  async function updateUsers() {
    const email = inputEmail.current.value
    const cod = codigo.current.value
    
    const dados = {}

    if (cod === '') {
      console.log("Usuário nao atualizado, Por favor digite o ID do mesmo")
      return
    }
    try {
      if (NinputName.current.value != "") { //verifica se o inputName não está vazio
        dados.nome = inputName.current.value
      }
      if (NinputSenha.current.value != "") { // verifica se o inputSenha não está vazio
        dados.senha = inputSenha.current.value
      } 

      await API.put(`/usuario?email=${email}&cod=${cod}`, dados)
      
      inputName.current.value = ''
      Email.current.value = ''
      inputSenha.current.value = ''

      alert("Usuário atualizado com sucesso!")

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
        <a href="../src/tela.html">Esqueci minha senha</a>
      </form>

      <form className='form2' style={{display: tela === 'cadastro' ? 'flex' : 'none'}}> 
        <h1>Cadastro</h1>
        <input name="name" type="text" placeholder='Nome' ref={CinputName}/>
        <input name="Email" type="email" placeholder='Email' ref={CinputEmail}/>
        <input name="senha" type="password" placeholder='Senha' ref={CinputSenha}/>
        <button type="button" onClick={createUsers}>Cadastrar</button>
      </form>

      <form className='form1' style={{display: tela === 'esqueciSenha' ? 'flex' : 'none'}}> 
        <h1>Redefinir senha</h1>
        <input id='mail' name="Email" type="email" placeholder='Digite seu Email' ref={Email}/>
        <input id='codigo' className='beforeCodigo' type="number" placeholder='Digite o código enviado pelo email' ref={codigo}/>
        <input id='Nsenha' className='afterCodigo' type="password" placeholder='Digite sua nova senha' ref={NinputSenha}/>
        <button type="button" onClick={setEmail}>Enviar</button>
        <button type="button" onClick={updateUsers}>Atualizar Senha</button>
        <button type="button" onClick={telaLogin}>Voltar</button>
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