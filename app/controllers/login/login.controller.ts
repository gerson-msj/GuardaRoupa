import ControllerBase from "../../controllers/base/controller.base.ts";
import UsuarioRepository from "../../data-context/repositories/usuario.repository.ts";
import AuthService from "../../services/auth.service.ts";
import CryptService from "../../services/crypt.service.ts";
import LoginService from "../../services/login.service.ts";
import LoginData from "./login.data.ts";

export default class LoginController extends ControllerBase<LoginData> {

    usuarioRepository = new UsuarioRepository(this.dbContext);
    cryptService = new CryptService();

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
        
        if (data.ErrMsgs.length > 0) 
            return this.ctx.render(data);

        try {

            await this.dbContext.openDb();
            const usuarioEntity = await this.usuarioRepository.obterPorNome(data.Nome);
            
            if(usuarioEntity === null){
                data.ErrMsgs.push("Usuário inexistente.");
                return this.ctx.render(data);
            }

            const senhaValida = await this.cryptService.validarSenha(data.Senha, usuarioEntity.Senha);
            if(!senhaValida){
                data.ErrMsgs.push("Senha inválida.");
                return this.ctx.render(data);
            }
            
            const headers = await AuthService.obterHeaders(usuarioEntity.Id);
            return this.redirect(headers);

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

    async getData(): Promise<LoginData> {
        const formData = await this.req.formData();
        const baseData = LoginService.obterLoginCadastroBaseData(formData);
        return new LoginData(baseData.nome, baseData.senha, baseData.errMsgs);
    }
}