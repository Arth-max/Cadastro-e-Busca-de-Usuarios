import Trash from '../../assets/trash.png'
import ImgLogin from '../../assets/Imglogin.jpg'
import './style.css'
import { useState, useRef, useEffect } from 'react'
import API from '../../hooks/user.js'

function Home() {
  const [users, setUsuario] = useState([])
  const [block, setBlock] = useState(false)

  const inputName = useRef()
  const inputEmail = useRef()
  const inputSenha = useRef()
  const inputID = useRef()

  //função buscar usuários pela API
  async function findUsers() {
    try {
      const email = inputEmail.current.value
      const userFromAPI = await API.get('/usuario?email=' + email)
      setUsuario([userFromAPI.data])
    } catch (error) {
        console.log("Usuário nao encontrado" + error)
    }
  }

  //função criar usuários pela API
  async function createUsers() {
    try {
      await API.post('/usuario', {
        nome: inputName.current.value,
        email: inputEmail.current.value,
        senha: inputSenha.current.value
    })
      if (inputName.current.value === '' || inputEmail.current.value === '' || inputSenha.current.value === '') {
        console.log("Usuário nao cadastrado, Por favor digite todos os campos")
        return
      } else {
        console.log("Usuário cadastrado com sucesso!")
      }

      inputName.current.value = ''
      inputEmail.current.value = ''
      inputSenha.current.value = ''
    } catch (error) {
        console.log("Usuário nao cadastrado" + error)
    }
  }
  
  //função atualizar usuários pela API
  async function updateUsers() {
    const id = inputID.current.value
    const dados = {}

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

  function instrucoes() {
    setBlock(!block);
  }

  useEffect(() => {
    
  },[])

  return (
    <div className='App' style={{backgroundImage: `url(${ImgLogin})`}}>
      <nav>
        <button onClick={instrucoes}>Como Usar</button>
      </nav>
      
      <div className='instructions' style={{display: block ? 'block' : 'none'}}>
        <p> Para usar o sistema, basta digitar os dados do usuário 
          e clicar em cada botão correspondente ao que deseja fazer.</p>
        <br/>
        <p> Para <b>Cadastrar um usuário</b>, digite o nome, email e senha e clique no botão "Cadastrar Usuário".</p>
        <br/>
        <p> Para <b>buscar um usuário</b> já cadastrado, digite apenas o email dele e clique no botão "Buscar Usuário".
          O sistema fará a busca e um card com os dados do usuário será apresentado .</p>
        <br/>
        <p> Para <b>atualizar um usuário</b> digite o id correspondente a ele, e preencha os campos que deseja alterar 
          (email, nome ou senha) e clique no botão "Atualizar Usuário".</p>
        <br/>
        <p> Para <b>deletar um usuário</b>, busque-o primeiro e clique no botão com ícone de lixeria ao lado das informações.</p>
      </div>

      <form>
        <h1>Cadastro de Usuários</h1>
        <input name="name" type="text" placeholder='Nome' ref={inputName}/>
        <input name="Email" type="email" placeholder='Email' ref={inputEmail}/>
        <input name="senha" type="password" placeholder='Senha' ref={inputSenha}/>
        <input id="IDinput" className="idQuestion" type="number" placeholder='Id' ref={inputID}/>
        <button type="button" onClick={createUsers}>Cadastrar Usuário</button>
        <button type="button" onClick={findUsers}>Buscar Usuário</button>
        <button type="button" onClick={updateUsers}>Atualizar Usuário</button>
      </form>

      {users?.map(user => (
        <div key={user.id} className='cards'>
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