import UsuarioRepository from "../../data-context/repositories/usuario.repository.ts";
import AuthService from "../../services/auth.service.ts";
import LoginService from "../../services/login.service.ts";
import ControllerBase from "../controller.base.ts";
import CadastroData from "./cadastro.data.ts";

export default class CadastroController extends ControllerBase<CadastroData> {

    private usuarioRepository = new UsuarioRepository(this.dbContext);

    protected override configState(): void {
        this.state.titulo = "Cadastro";
        this.state.menu = { "/": "Voltar" };
    }

    public get(): Response | Promise<Response> {
        const data = new CadastroData();
        return this.ctx.render(data);
    }

    public async post(): Promise<Response> {
                
        const data = await this.getData();

        if (this.hasError) 
            return this.ctx.render(data);
        
        try {

            await this.dbContext.openDb();
            const idUsuario = await this.usuarioRepository.novo(data);
            const headers = await AuthService.comporHeaders(idUsuario);
            return this.redirect("/home", headers);

        } catch (error) {
            this.addError(error);

            return this.ctx.render(data);
        } finally {
            this.dbContext.closeDb();
        }
    }

    async getData(): Promise<CadastroData> {

        const formData = await this.req.formData();
        const baseData = LoginService.obterLoginCadastroBaseData(formData);
        const exibirSenha = formData.has("exibirSenha");

        if(baseData.errMsgs.length > 0)
            this.addError(baseData.errMsgs);

        return new CadastroData(baseData.nome, baseData.senha, exibirSenha);
    }
}