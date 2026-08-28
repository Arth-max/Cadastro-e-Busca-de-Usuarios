package com.Arth.firstProjectCadastro.infrastructure.entitys;


import jakarta.persistence.*;
import lombok.*;

@Table(name = "Usuario")
@Entity()
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "nome")
    private String nome;

    @Column(name = "senha")
    private String senha;

    private Integer codigoRecuperacao;
}
