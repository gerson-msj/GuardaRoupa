import { EntityBase } from "../App.ts";
import RepositoryBase from "./RepositoryBase.ts";

export interface UsuarioEntity extends EntityBase {
    NomeUsuario: string;
    Senha: string;
}

export default class UsuarioRepository extends RepositoryBase {

    public obterPorNome(nomeUsuario: string): UsuarioEntity | undefined {
        const sql = "Select * From Usuarios Where NomeUsuario = :nomeUsuario";
        return this.appContext.get(sql, {nomeUsuario});
    }

    public novo(usuario: UsuarioEntity) {
        const sql = "Insert Into Usuarios (NomeUsuario, Senha) Values (:NomeUsuario, :Senha)";
        usuario.Id = this.appContext.insert(sql, { NomeUsuario: usuario.NomeUsuario, Senha: usuario.Senha });
    }
}