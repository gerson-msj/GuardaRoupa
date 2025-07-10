import { DbContext } from "../App.ts";
import CadastroData from "../Pages/Login/Cadastro/CadastroData.ts";
import UsuarioRepository, { UsuarioEntity } from "../Repositories/UsuarioRepository.ts";
import CryptService from "./CryptService.ts";
import ServiceBase from "./ServiceBase.ts";

export default class UsuarioService extends ServiceBase {
    private usuarioRepository: UsuarioRepository;
    private cryptService: CryptService;

    constructor(appContext: DbContext) {
        super(appContext);
        this.usuarioRepository = new UsuarioRepository(appContext);
        this.cryptService = new CryptService();
    }

    public async novoUsuario(data: CadastroData): Promise<number> {
        const usuario: UsuarioEntity = {
            Id: 0,
            NomeUsuario: data.Nome,
            Senha: await this.cryptService.criptografarSenha(data.Senha)
        };

        const usuarioExistente = this.usuarioRepository.obterPorNome(usuario.NomeUsuario);
        if(usuarioExistente)
            throw new Error("O nome de usuário informado já existe.");

        this.usuarioRepository.novo(usuario);
        return usuario.Id;
    }
}