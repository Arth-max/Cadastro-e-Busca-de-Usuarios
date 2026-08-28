package com.Arth.firstProjectCadastro.business;

import com.Arth.firstProjectCadastro.infrastructure.entitys.User;
import com.Arth.firstProjectCadastro.infrastructure.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.Random;


@Service
public class UsuarioService {
    private final UsuarioRepository repository;
    private int Codigo;
    private final emailService EmailService;

    public UsuarioService(UsuarioRepository repository, emailService EmailService) {
        this.EmailService = EmailService;
        this.repository = repository;
    }

    public void salvarUsuario(User usuario) {
        repository.saveAndFlush(usuario);
    }

    public User buscarUsuario(String email, String senha, String nome) {
        return repository.findByEmailAndSenhaAndNome(email, senha, nome).orElseThrow(
                () -> new RuntimeException("Usuario não encontrado")
        );
    }

    public void recuperarSenhaEmail(String email) {
        User usuario = repository.findByEmail(email).orElseThrow(
                () -> new RuntimeException("email não encontrado")
        );
        int cod = new Random().nextInt(900000) + 100000;
        usuario.setCodigoRecuperacao(cod);
        repository.saveAndFlush(usuario);
        EmailService.enviarEmail(email, "Recuperação de senha", "Seu código é: " + Codigo + "\nDigite este código no site para continuar operação");
    }

    public void deletarUsuarioPorEmail(String email) {
        repository.deleteByEmail(email);
    }

    public void atualizarSenha(String email, int cod, User usuario) {
        User usuarioEntity = repository.findByEmail(email).orElseThrow(
                    () -> new RuntimeException("Usuario não encontrado")
        );
            if (usuarioEntity.getCodigoRecuperacao() != null && usuarioEntity.getCodigoRecuperacao() == cod) {
                if (usuario.getSenha() != null) { usuarioEntity.setSenha(usuario.getSenha()); }
                usuarioEntity.setCodigoRecuperacao(null);
                repository.saveAndFlush(usuarioEntity);
            } else {
                throw new RuntimeException("Código inválido");
            }
    }

    public void atualizarUsuario(String email, User usuario) {
        User usuarioEntity = repository.findByEmail(email).orElseThrow(
                () -> new RuntimeException("Usuario não encontrado")
        );
        if (usuario.getNome() != null) { usuarioEntity.setNome(usuario.getNome()); }
        if (usuario.getEmail() != null) { usuarioEntity.setEmail(usuario.getEmail()); }
        if (usuario.getSenha() != null) { usuarioEntity.setSenha(usuario.getSenha()); }
        repository.saveAndFlush(usuarioEntity);
    }
}