import { FreshContext } from "$fresh/server.ts";
import UsuarioRepository from "../../DataContext/Repositories/UsuarioRepository.ts";
import AuthService from "../../Services/AuthService.ts";
import CryptService from "../../Services/CryptService.ts";
import LoginService from "../../Services/LoginService.ts";
import BaseController from "../base/BaseController.ts";
import { StateData } from "../StateData.ts";
import CadastroData from "./CadastroData.ts";

export default class CadastroController extends BaseController<CadastroData> {

    private usuarioRepository: UsuarioRepository;
    private cryptService: CryptService;

    constructor(req: Request, ctx: FreshContext<StateData, CadastroData>) {
        super(req, ctx);
        this.usuarioRepository = new UsuarioRepository(this.dbContext);
        this.cryptService = new CryptService();
    }

    protected override configState(): void {
        this.state.titulo = "Cadastro";
        this.state.menu = { "/": "Voltar" };
    }

    public NovoCadastro(): Response | Promise<Response> {
        const data: CadastroData = {
            IdUsuario: 0,
            Nome: "",
            Senha: "",
            ExibirSenha: false,
            ErrMsgs: []
        };
        return this.ctx.render(data);
    }

    public async NovoUsuario(): Promise<Response> {
                
        const data = await this.getData();

        if (data.ErrMsgs.length > 0) 
            return this.ctx.render(data);
        
        try {

            await this.dbContext.openDb();
            const id = await this.usuarioRepository.novo(data);
            return await AuthService.redirecionarToken(id);

        } catch (error) {
            if (error instanceof Error)
                data.ErrMsgs.push(error.message);
            else
                data.ErrMsgs.push("Houve uma falha no servidor");

            return this.ctx.render(data);
        } finally {
            this.dbContext.closeDb();
        }
    }

    async getData(): Promise<CadastroData> {

        const formData = await this.req.formData();
        const commonData = LoginService.obterLoginCadastroData(formData);
        
        const data: CadastroData = {
            IdUsuario: 0,
            Nome: commonData.nome,
            Senha: commonData.senha,
            ExibirSenha: formData.has("exibirSenha"),
            ErrMsgs: commonData.errMsgs
        };

        return data;
    }
}