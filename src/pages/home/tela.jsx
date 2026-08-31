import './style.css'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Config from '../../assets/Config.png'

function Tela() {
    const Location = useLocation()
    const usuario = Location.state?.usuario
    const navigate = useNavigate()

    function voltar() {
        navigate('/')
    }
    return (
        <div className="App"> 
            {/* Cabeçelho */}
            <header className="cabecalho">
                <h1>Site de testes</h1> 
                <button><img src={Config} className="configButton" alt="Configurações"/></button>
            </header>

            {/* Site */}
            <main className="principal">
                <section>
                    <h1>Bem-Vindo {usuario?.nome || 'Usuário'}</h1>
                    <p> É bom revê-lo </p>
                </section>

                <section className="cards">
                    <div clasName="card">
                        <h2>Perfil</h2>
                        <p> Visualize e edite suas informações de usuário </p>
                        <button> Visualizar </button>
                    </div>
                </section>
                <button className="logout" onClick={voltar}> Sair </button>
            </main>
        </div>
    )
}

export default Tela