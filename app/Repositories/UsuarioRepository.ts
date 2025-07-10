import RepositoryBase from "./RepositoryBase.ts";

export interface UsuarioEntity {
    Id: number;
    NomeUsuario: string;
    Senha: string;
}

export default class UsuarioRepository extends RepositoryBase {

    public obterPorNome(nomeUsuario: string): UsuarioEntity | undefined {
        const sql = "Select * From Usuarios Where NomeUsuario = :nomeUsuario";
        return this.appContext.get(sql, undefined, nomeUsuario);
    }

    public novo(usuario: UsuarioEntity) {
        const sql = "Insert Into Usuarios (NomeUsuario, Senha) Values (:NomeUsuario, :Senha)";
        usuario.Id = this.appContext.insertNamed(sql, { NomeUsuario: usuario.NomeUsuario, Senha: usuario.Senha });
    }
}