
import CadastroData from "../../controllers/login/cadastro.data.ts";
import CryptService from "../../services/crypt.service.ts";
import DbContext, { DbPrefix, DbIdx } from "../db.context.ts";
import { UsuarioEntity } from "../entities/usuario.entity.ts";
import RepositoryBase from "./repository.base.ts";

export default class UsuarioRepository extends RepositoryBase {

    private usuarioPrefix: DbPrefix = "usuarios";
    private usuarioIdx: DbIdx = "usuarios:idx";
    private cryptService: CryptService;

    /**
     *
     */
    constructor(dbContext: DbContext) {
        super(dbContext);
        this.cryptService = new CryptService();
    }

    public async obterPorNome(nomeUsuario: string): Promise<UsuarioEntity | null> {
        const resIdx = await this.dbContext.kv.get<number>([this.usuarioIdx, nomeUsuario]);
        const idx = resIdx.value;
        if (!idx)
            return null;

        const resUsuario = await this.dbContext.kv.get<UsuarioEntity>([this.usuarioPrefix, idx]);
        return resUsuario.value;
    }

    public async novo(data: CadastroData): Promise<number> {

        const usuario: UsuarioEntity = {
            Id: await this.dbContext.nextSeq("usuarios:seq"),
            NomeUsuario: data.Nome,
            Senha: await this.cryptService.criptografarSenha(data.Senha)
        };

        const keyIdx = [this.usuarioIdx, usuario.NomeUsuario];
        const keyUsuario = [this.usuarioPrefix, usuario.Id];

        const [checkIdx, checkUsuario] = await this.dbContext.kv.getMany([keyIdx, keyUsuario]);
        if (checkIdx.value !== null || checkUsuario.value !== null)
            throw new Error("O nome do usuário informado já existe.");

        const res = await this.dbContext.kv.atomic()
            .check(checkIdx)
            .set(keyIdx, usuario.Id)
            .set(keyUsuario, usuario)
            .commit();

        if (!res.ok) {
            throw new Error("O nome do usuário informado já existe.");
        }

        return usuario.Id;
    }
}