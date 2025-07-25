import ControllerBase from "../controller.base.ts";
import UsuarioRepository from "../../data-context/repositories/usuario.repository.ts";
import AuthService from "../../services/auth.service.ts";
import CryptService from "../../services/crypt.service.ts";
import LoginService from "../../services/login.service.ts";
import LoginData from "./login.data.ts";

export default class LoginController extends ControllerBase<LoginData> {

    usuarioRepository = new UsuarioRepository(this.dbContext);

    protected override configState(): void {
        this.state.titulo = "Login";
        this.state.menu = { "/": "Voltar" };
    }

    public NovoLogin(): Response | Promise<Response> {
        const data = new LoginData();
        return this.ctx.render(data);
    }

    public async Entrar(): Promise<Response> {
        
        const data = await this.getData();
        
        if (this.hasError) 
            return this.ctx.render(data);

        try {

            await this.dbContext.openDb();
            const usuarioEntity = await this.usuarioRepository.obterPorNome(data.Nome);
            
            if(usuarioEntity === null){
                this.addError("Usuário inexistente.");
                return this.ctx.render(data);
            }

            const senhaValida = await CryptService.validarSenha(data.Senha, usuarioEntity.Senha);
            if(!senhaValida){
                this.addError("Senha inválida.");
                return this.ctx.render(data);
            }
            
            const headers = await AuthService.comporHeaders(usuarioEntity.Id);
            return this.redirect("/home", headers);

        } catch (error) {
            this.addError(error);
            return this.ctx.render(data);
        } finally {
            this.dbContext.closeDb();
        }
    }

    async getData(): Promise<LoginData> {
        const formData = await this.req.formData();
        const baseData = LoginService.obterLoginCadastroBaseData(formData);

        if(baseData.errMsgs.length > 0)
            this.addError(baseData.errMsgs);

        return new LoginData(baseData.nome, baseData.senha);
    }
}