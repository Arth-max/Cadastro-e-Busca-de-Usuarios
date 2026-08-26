package com.Arth.firstProjectCadastro.infrastructure.repository;

import com.Arth.firstProjectCadastro.infrastructure.entitys.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmailSenhaNome (
            String email,
            String senha,
            String nome
    );

    @Transactional
    void deleteByEmail(String emal);
}
