import './style.css'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Config from '../../assets/Config.png'
import API from '../../hooks/user.js'
import { useState, useRef } from 'react'

function Tela() {
    const Location = useLocation()
    const usuario = Location.state?.usuario
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [nome, setNome] = useState(usuario?.nome || '')
    const [email, setEmail] = useState(usuario?.email || '')
    const [user, setUsuario] = useState(location.state?.usuario)

    const NinputName = useRef()
    const NinputEmail = useRef()

    function voltar() {
        navigate('/')
    }

    function infoPerfil() {
        document.getElementById('msg').style.display = 'none'
        document.getElementById('informaçõesPerfil').style.display = 'flex'
        document.getElementById('perfil').style.display = 'none'
    }

    function fecharInfo() {
        document.getElementById('informaçõesPerfil').style.display = 'none'
        document.getElementById('perfil').style.display = 'flex'
    }
    async function editarPerfil() {
        setLoading(true)
        try {
            const novoNome = nome
            const novoEmail = email

            if (novoNome === usuario.nome && novoEmail === usuario.email) {
                document.getElementById('msg').style.display = 'block'
                document.getElementById('msg').style.color = 'darkred'
                document.getElementById('msg').textContent = "Você não mudou seu perfil"
                setLoading(false)
                return
            }
            if (novoNome === '' || novoEmail === '') {
                document.getElementById('msg').style.display = 'block'
                document.getElementById('msg').style.color = 'darkred'
                document.getElementById('msg').textContent = "Por favor preencha todos os campos"
                setLoading(false)
                return
            }

            setLoading(true)
            await API.put('/usuario?email=' + usuario.email, { 
                email: novoEmail, 
                nome: novoNome 
            })
            document.getElementById('msg').style.display = 'block'
            document.getElementById('msg').style.color = 'seagreen'
            document.getElementById('msg').textContent = "Perfil atualizado com sucesso"
            setUsuario({
                ...user,
                nome: novoNome,
                email: novoEmail
            })
        } catch (error) {
            document.getElementById('msg').style.display = 'block'
            document.getElementById('msg').style.color = 'darkred'
            document.getElementById('msg').textContent = "Erro ao atualizar perfil"
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="App"> 
            {/* Cabeçelho */}
            <header className="cabecalho">
                <h1>Site de testes</h1> 
                <button className="configButton"><img src={Config} alt="Configurações"/></button>
            </header>

            {/* Site */}
            <main className="principal">
                <h1>Bem-Vindo {usuario?.nome || 'Usuário'}</h1>
                <p> É bom revê-lo </p>
                
                <section className="cards">
                    <div id="perfil" className="card">
                        <h2>🙋‍♂️ Seu Perfil</h2>
                        <p> Visualize e edite suas informações de usuário </p>
                        <button onClick={infoPerfil}> Visualizar </button>
                    </div>

                    <div id="informaçõesPerfil" className="informacoes">
                        <h1>Suas informações</h1>
                        <label htmlFor="nome">Nome</label>
                        <input id="nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)}/>
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <button onClick={editarPerfil} disabled={loading}> {loading ? "Editando..." : "Editar"}</button>
                        <button onClick={fecharInfo}> Fechar </button>
                        <p id="msg" className="beforeCodigo"></p>
                    </div>
                </section>
                <button className="logout" onClick={voltar}> Sair </button>
            </main>
        </div>
        )
    }

export default Tela