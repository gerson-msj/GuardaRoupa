import { BaseEntity } from "./base.entity.ts";

export interface UsuarioEntity extends BaseEntity {
    NomeUsuario: string;
    Senha: string;
}
