import ImgLogin from '../../assets/Imglogin.jpg'
import verSenha from '../../assets/verSenha.png'
import desverSenha from '../../assets/desverSenha.png'
import './style.css'
import { useState, useRef, useEffect } from 'react'
import API from '../../hooks/user.js'
import { useNavigate } from 'react-router-dom'
import { closeInputs } from '../../hooks/user'

function Home() {
  const [users, setUsuario] = useState([]) //estado do usuário
  const [tela, setTela] = useState('login') //estado da tela (login, cadastro, esqueciSenha)
  const [VerSenha, setMostrarSenha] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

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
    document.getElementById('msgEsqueciSenha').textContent = ""
    document.getElementById('msgCadastro').textContent = ""
  }
  //ativar tela cadastro
  function telaCadastro() {
    setTela('cadastro')
    document.getElementById('msgLogin').textContent = ""
  }
  //ativar tela esqueci senha
  function forgotPassword() {
    setTela('esqueciSenha')
    document.getElementById('msgLogin').textContent = ""
    document.getElementById('msgCadastro').textContent = ""
  }

  function mostrarSenha() {
    setMostrarSenha(!VerSenha)
  }

  function validarSenha(senha) {
    return (
      /[0-9]/.test(senha) && /[A-Z]/.test(senha) && /[a-z]/.test(senha)
      && /[!@#$%^&*()\-_=+[{\]}|;:'"<>.,/?~]/.test(senha)
    )
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

      await API.post('/usuario/login', {
        nome: nome,
        email: email,
        senha: senha
      })

      document.getElementById('msgLogin').style.color = 'seagreen'
      document.getElementById('msgLogin').textContent = "validado com sucesso"

      inputName.current.value = ''
      inputEmail.current.value = ''
      inputSenha.current.value = ''

      navigate('/tela')
    } catch (error) {
      document.getElementById('msgLogin').style.color = 'darkred'
      document.getElementById('msgLogin').textContent = "Por favor, revise se todos os campos estão corretos\n" + error
    }
  }

  //função criar usuários pela API
  async function createUsers() {
    setLoading(true)
    if (CinputName.current.value === "" || CinputEmail.current.value === "" || CinputSenha.current.value === "") {
      alert("Usuário nao cadastrado, Por favor digite todos os campos")
      return
    }
    if (CinputSenha.current.value.length < 8) {
      document.getElementById('msgCadastro').textContent = "Senha inválida, com ao menos 8 caracteres"
      return
    }
    if (!validarSenha(CinputSenha.current.value)) {
      document.getElementById('msgCadastro').textContent = "Senha inválida, por favor digite uma senha forte"
      setLoading(false)
      return
    }
    setLoading(true)
    try {
      await API.post('/usuario', {
        nome: CinputName.current.value,
        email: CinputEmail.current.value,
        senha: CinputSenha.current.value
      })
      document.getElementById('msgCadastro').textContent = "Usuário cadastrado com sucesso!"

      CinputName.current.value = ''
      CinputEmail.current.value = ''
      CinputSenha.current.value = ''
      setLoading(false)
    } catch (error) {
      alert("Usuário nao cadastrado" + error)
    } finally {
      setLoading(false)
    }
  }

  async function setEmail() {
    setLoading(true)
    const email = Email.current.value;
    if (email === '') {
        document.getElementById('msgEsqueciSenha').textContent = "Por favor digite um email"
        setLoading(false)
        return
    }
    setLoading(true)
    try {
        await API.post('/usuario/recuperar-senha?email=' + email)
        document.getElementById('codigo').style.display = 'block'
        document.getElementById('Nsenha').style.display = 'block'
        document.getElementById('UpPass').style.display = 'block'
        document.getElementById('pass').style.display = 'flex'

        document.getElementById('msgEsqueciSenha').style.color = 'seagreen'
        document.getElementById('msgEsqueciSenha').textContent = "Um codigo foi enviado para o seu email"
    } catch (error) {
        document.getElementById('msgEsqueciSenha').style.color = 'darkred'
        document.getElementById('msgEsqueciSenha').textContent = "email inválido"
    } finally {
        setLoading(false)
    }
  }

  //função atualizar senha dos usuários pela API
  async function updatePassUsers() {
    const email = Email.current.value
    const cod = codigo.current.value
    const Nsenha = NinputSenha.current.value
    setLoading(true)

    if (cod === '') {
      console.log("Usuário nao atualizado, Por favor digite o codigo")
      setLoading(false)
      return
    }
    if (Nsenha.length < 8) {
      document.getElementById('msgEsqueciSenha').textContent = "Digite uma senha com ao menos 8 caracteres"
      setLoading(false)
      return
    }
    if (!validarSenha(Nsenha)) {
      document.getElementById('msgCadastro').textContent = "Senha inválida, por favor digite uma senha forte"
      setLoading(false)
      return
    }
    setLoading(true)
    try {
      await API.put(`/usuario/atualizarSenha?email=${email}&cod=${cod}`, { senha: Nsenha })

      Email.current.value = ''
      codigo.current.value = ''
      NinputSenha.current.value = ''

      closeInputs()
      document.getElementById('msgEsqueciSenha').style.color = 'seagreen'
      document.getElementById('msgEsqueciSenha').textContent = "Usuário atualizado com sucesso!"
    } catch (error) {
      document.getElementById('msgEsqueciSenha').style.color = 'darkred'
      document.getElementById('msgEsqueciSenha').textContent = ("Não foi possível atualizar o usuário" + error)
    } finally {
      setLoading(false)
    }
  }

  //função deletar usuários pela API
  async function deleteUsers(email) {
    try {
      await API.delete(`/usuario?email=${email}`)
      console.log("Usuário deletado com sucesso!")

      setUsuario(PrevUsers => PrevUsers.filter(user => user.email !== email))

      inputEmail.current.value = ''
    } catch (error) {
      console.log("Não foi possível deletar o usuário" + error)
    }
  }

  useEffect(() => {

  }, [])

  return (
    <div className='App' style={{ backgroundImage: `url(${ImgLogin})` }}>
      {/* Botões de cadastro e Login */}
      <div className='botoes'>
        <button className='botoesPrincipais' onClick={telaLogin}>Fazer Login</button>
        <button className='botoesPrincipais' onClick={telaCadastro}>Criar Conta</button>
      </div>

      {/* Tela Login */}
      <form className='login' style={{ display: tela === 'login' ? 'flex' : 'none' }}>
        <h1>Login</h1>
        <input name="name" type="text" placeholder='Nome' ref={inputName} />
        <input name="Email" type="email" placeholder='Email' ref={inputEmail} />

        <div className='senhas'>
          <input name="senha" type={VerSenha ? 'text' : 'password'} placeholder='Senha' ref={inputSenha} />
          <button type="button" className='divSenhas' onClick={mostrarSenha}><img src={VerSenha ? desverSenha : verSenha} alt="" /></button>
        </div>

        <button type="button" onClick={findUsers}>Entrar</button>
        <button type="button" onClick={forgotPassword}>Esqueci minha senha</button>
        <p id="msgLogin"></p>
      </form>

      {/* Tela Cadastro */}
      <form className='cadastro' style={{ display: tela === 'cadastro' ? 'flex' : 'none' }}>
        <h1>Cadastro</h1>
        <input name="name" type="text" placeholder='Nome' ref={CinputName} />
        <input name="Email" type="email" placeholder='Email' ref={CinputEmail} />

        <div className='senhas'>
          <input name="senha" type={VerSenha ? 'text' : 'password'} placeholder='Senha' ref={CinputSenha} />
          <button type="button" className='divSenhas' onClick={mostrarSenha}><img src={VerSenha ? desverSenha : verSenha} alt="" /></button>
        </div>
        <button type="button" onClick={createUsers} disabled={loading}>{loading ? 'Cadastrando...' : 'Cadastrar'}</button>
        <p id="msgCadastro"></p>
      </form>

      {/* Tela Esqueci Senha */}
      <form className='forgotPass' style={{ display: tela === 'esqueciSenha' ? 'flex' : 'none' }}>
        <h1>Redefinir senha</h1>
        <input name="Email" type="email" placeholder='Digite seu Email' ref={Email} />
        <input id='codigo' className='beforeCodigo' type="number" placeholder='Digite o código enviado pelo email' ref={codigo} />

        {/* Div para criar nova senha */}
        <div id="pass" className='senhasBC'>
          <input id='Nsenha' type={VerSenha ? 'text' : 'password'} placeholder='Digite sua nova senha' ref={NinputSenha} />
          <button type="button" className='divSenhas' onClick={mostrarSenha}><img src={VerSenha ? desverSenha : verSenha} alt="" /></button>
        </div>

        <button type="button" onClick={setEmail} disabled={loading}>{loading ? 'Enviando...' : 'Enviar'}</button>
        <button id="UpPass" className='beforeCodigo' type="button" onClick={updatePassUsers} disabled={loading}>{loading ? 'Alterando...' : 'Alterar Senha'}</button>
        <button type="button" onClick={telaLogin}>Voltar</button>
        <p id="msgEsqueciSenha" style={{ color: 'seagreen' }}></p>
      </form>
    </div>
  )
}
export default Home