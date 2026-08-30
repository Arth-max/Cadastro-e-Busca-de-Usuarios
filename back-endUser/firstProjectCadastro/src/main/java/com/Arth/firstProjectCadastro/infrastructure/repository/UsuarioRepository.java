package com.Arth.firstProjectCadastro.infrastructure.repository;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.Arth.firstProjectCadastro.infrastructure.entitys.User;
import jakarta.transaction.Transactional;

public interface UsuarioRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmailAndNome (
            String nome,
            String email
    );
    Optional<User> findByEmail(String email);

    @Transactional
    void deleteByEmail(String emal);
}
