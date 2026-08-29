package com.Arth.firstProjectCadastro.infrastructure.entitys;

public record UsuarioResponseDTO(String email, String nome) {
    public UsuarioResponseDTO(User usuario) {
        this(usuario.getNome(), usuario.getEmail());
    }
}
