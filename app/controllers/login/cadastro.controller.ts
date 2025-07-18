import { FreshContext } from "$fresh/server.ts";
import UsuarioRepository from "../../data-context/repositories/usuario.repository.ts";
import AuthService from "../../services/auth.service.ts";
import LoginService from "../../services/login.service.ts";
import ControllerBase from "../base/controller.base.ts";
import { StateData } from "../state.data.ts";
import CadastroData from "./cadastro.data.ts";

export default class CadastroController extends ControllerBase<CadastroData> {

    private usuarioRepository: UsuarioRepository;

    constructor(req: Request, ctx: FreshContext<StateData, CadastroData>) {
        super(req, ctx);
        this.usuarioRepository = new UsuarioRepository(this.dbContext);
    }

    protected override configState(): void {
        this.state.titulo = "Cadastro";
        this.state.menu = { "/": "Voltar" };
    }

    public NovoCadastro(): Response | Promise<Response> {
        const data = new CadastroData();
        return this.ctx.render(data);
    }

    public async NovoUsuario(): Promise<Response> {
                
        const data = await this.getData();

        if (data.ErrMsgs.length > 0) 
            return this.ctx.render(data);
        
        try {

            await this.dbContext.openDb();
            const idUsuario = await this.usuarioRepository.novo(data);
            const headers = await AuthService.comporHeaders(idUsuario);
            return this.redirect("/home", headers);

        } catch (error) {
            if (error instanceof Error)
                data.ErrMsgs.push(error.message);
            else
                data.ErrMsgs.push("Houve uma falha no servidor.");

            return this.ctx.render(data);
        } finally {
            this.dbContext.closeDb();
        }
    }

    async getData(): Promise<CadastroData> {

        const formData = await this.req.formData();
        const baseData = LoginService.obterLoginCadastroBaseData(formData);
        const exibirSenha = formData.has("exibirSenha");

        return new CadastroData(baseData.nome, baseData.senha, exibirSenha, baseData.errMsgs);
    }
}