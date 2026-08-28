package com.Arth.firstProjectCadastro.controller;

import com.Arth.firstProjectCadastro.business.UsuarioService;
import com.Arth.firstProjectCadastro.infrastructure.entitys.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/usuario")
@RequiredArgsConstructor
@CrossOrigin
public class UsuarioController {

    private final UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<Void> salvarUsuario(@RequestBody User usuario) {
        if (usuario == null) {
            return ResponseEntity.noContent().build();
        } else {
            usuarioService.salvarUsuario(usuario);
            return ResponseEntity.ok().build();
        }
    }

    @PostMapping("/recuperar-senha")
    public ResponseEntity<Void> recuperarSenhaEmail(@RequestParam String email) {
        usuarioService.recuperarSenhaEmail(email);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/atualizarSenha")
    public ResponseEntity<Void> atualizarSenha(@RequestParam String email, int cod, @RequestBody User usuario) {
        usuarioService.atualizarSenha(email, cod, usuario);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<User> buscarUsuario(@RequestParam String email, String senha, String nome) {
        User usuario = usuarioService.buscarUsuario(email, senha, nome);

        return ResponseEntity.ok(usuario);
    }

    @DeleteMapping
    public ResponseEntity<Void> deletarUsuarioPorEmail(@RequestParam String email) {
        usuarioService.deletarUsuarioPorEmail(email);
        return ResponseEntity.noContent().build();
    }

    @PutMapping
    public ResponseEntity<Void> atualizarUsuario(@RequestParam String email, @RequestBody User usuario) {
        usuarioService.atualizarUsuario(email, usuario);
        return ResponseEntity.ok().build();
    }
}
