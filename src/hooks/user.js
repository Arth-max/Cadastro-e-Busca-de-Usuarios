import axios from 'axios'

const API = axios.create({
    baseURL: 'http://localhost:8081'
})

export async function setEmail() {
    const email = document.getElementById('mail').value;
    if (email === '') {
        document.getElementById('msgEsqueciSenha').textContent = "Por favor digite um email"
        return
    }
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
    }
}

export function closeInputs() {
    document.getElementById('codigo').style.display = 'none'
    document.getElementById('Nsenha').style.display = 'none'
    document.getElementById('UpPass').style.display = 'none'
    document.getElementById('pass').style.display = 'none'
    document.getElementById('msgEsqueciSenha').textContent = ""
}

export function anotherWindow() {
    window.location.href = '../src/tela.html'
}

export default API