import { BaseEntity } from "./BaseEntity.ts";

export interface UsuarioEntity extends BaseEntity {
    NomeUsuario: string;
    Senha: string;
}
