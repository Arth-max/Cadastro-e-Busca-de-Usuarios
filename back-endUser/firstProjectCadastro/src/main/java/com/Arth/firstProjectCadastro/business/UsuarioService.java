package com.Arth.firstProjectCadastro.business;

import com.Arth.firstProjectCadastro.infrastructure.entitys.User;
import com.Arth.firstProjectCadastro.infrastructure.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.io.FileNotFoundException;

@Service
public class UsuarioService {
    private final UsuarioRepository repository;

    public UsuarioService(UsuarioRepository repository) {
        this.repository = repository;
    }

    public void salvarUsuario(User usuario) {
        repository.saveAndFlush(usuario);
    }

    public User buscarUsuario(String email, String senha, String nome) {
        return repository.findByEmailSenhaNome(email, senha, nome).orElseThrow(
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
            usuarioEntity.setNome(usuario.getEmail());
        }
        if (usuario.getSenha() != null) {
            usuarioEntity.setNome(usuario.getSenha());
        }

        repository.saveAndFlush(usuarioEntity);
    }
}