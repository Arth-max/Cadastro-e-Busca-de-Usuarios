package com.Arth.firstProjectCadastro.infrastructure.entitys;


public record UsuarioResponseDTO(String nome, String email) {
    public UsuarioResponseDTO(User usuario) {
        this(usuario.getNome(), usuario.getEmail());
    }
}
