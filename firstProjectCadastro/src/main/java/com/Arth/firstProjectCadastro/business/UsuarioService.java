package com.Arth.firstProjectCadastro.business;

import com.Arth.firstProjectCadastro.infrastructure.entitys.User;
import com.Arth.firstProjectCadastro.infrastructure.repository.UsuarioRepository;
import org.springframework.stereotype.Service;


@Service
public class UsuarioService {
    private final UsuarioRepository repository;

    private final EmailService emailService;

    public UsuarioService(UsuarioRepository repository, EmailService emailService) {
        this.emailService = emailService;
        this.repository = repository;
    }

    public void salvarUsuario(User usuario) {
        repository.saveAndFlush(usuario);
        emailService.enviarEmail(usuario.getEmail(), "Você foi cadastrado no site", "Você está recebendo uma mensagem de confirmação de cadastro");
    }

    public User buscarUsuario(String email, String senha, String nome) {
        return repository.findByEmailAndSenhaAndNome(email, senha, nome).orElseThrow(
                () -> new RuntimeException("Usuario não encontrado")
        );
    }

    public void deletarUsuarioPorEmail(String email) {
        repository.deleteByEmail(email);
    }

    public void atualizarUsuarioPorID(Integer ID, User usuario) {
        User usuarioEntity = repository.findById(ID).orElseThrow(
                () -> new RuntimeException("Usuario não encontrado")
        );
        if (usuario.getNome() != null) {
            usuarioEntity.setNome(usuario.getNome());
        }
        if (usuario.getEmail() != null) {
            usuarioEntity.setEmail(usuario.getEmail());
        }
        if (usuario.getSenha() != null) {
            usuarioEntity.setSenha(usuario.getSenha());
        }

        repository.saveAndFlush(usuarioEntity);
    }
}