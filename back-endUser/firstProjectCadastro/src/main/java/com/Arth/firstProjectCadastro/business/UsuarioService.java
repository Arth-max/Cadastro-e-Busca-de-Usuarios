package com.Arth.firstProjectCadastro.business;

import org.springframework.stereotype.Service;

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
        Random cod = new Random();
        this.Codigo = cod.nextInt(100000);
        EmailService.enviarEmail(email, "Recuperação de senha", "Seu código é: " + Codigo + "\nDigite este código no site para continuar operação");
    }

    public void deletarUsuarioPorEmail(String email) {
        repository.deleteByEmail(email);
    }

    public void atualizarSenha(String email, int cod, User usuario) {
        if (cod == Codigo) {
            User usuarioEntity = repository.findByEmail(email).orElseThrow(
                    () -> new RuntimeException("Usuario não encontrado")
            );
            if (usuario.getNome() != null) { usuarioEntity.setNome(usuario.getNome()); }
            if (usuario.getEmail() != null) { usuarioEntity.setEmail(usuario.getEmail()); }
            if (usuario.getSenha() != null) { usuarioEntity.setSenha(usuario.getSenha()); }
            usuario.setSenha(usuario.getSenha());
        }
    }

    public void atualizarUsuario(String email, User usuario) {
        User usuarioEntity = repository.findByEmail(email).orElseThrow(
                () -> new RuntimeException("Usuario não encontrado")
        );
        usuario.setNome(usuario.getNome());
        usuario.setEmail(usuario.getEmail());
        if (usuario.getNome() != null) { usuarioEntity.setNome(usuario.getNome()); }
        if (usuario.getEmail() != null) { usuarioEntity.setEmail(usuario.getEmail()); }
        if (usuario.getSenha() != null) { usuarioEntity.setSenha(usuario.getSenha()); }
        repository.saveAndFlush(usuarioEntity);
    }
}