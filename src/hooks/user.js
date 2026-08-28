import axios from 'axios'

const API = axios.create({
    baseURL: 'http://localhost:8081'
})

export async function setEmail() {
    let email = document.getElementById('mail').value;
    if (email !== '') {
        document.getElementById('codigo').style.display = 'block'
        document.getElementById('Nsenha').style.display = 'block'
    }
    await API.post('/usuario/recuperar-senha?email=' + email)
    alert("Um código foi enviado para o seu email, por favor verifique sua caixa de entrada")
}

export default API
