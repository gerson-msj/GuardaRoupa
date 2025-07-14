import UsuarioRepository from "../../DataContext/Repositories/UsuarioRepository.ts";
import AuthService from "../../Services/AuthService.ts";
import CryptService from "../../Services/CryptService.ts";
import LoginService from "../../Services/LoginService.ts";
import BaseController from "../base/BaseController.ts";
import LoginData from "./LoginData.ts";

export default class LoginController extends BaseController<LoginData> {

    usuarioRepository = new UsuarioRepository(this.dbContext);
    cryptService = new CryptService();

    protected override configState(): void {
        this.state.titulo = "Login";
        this.state.menu = { "/": "Voltar" };
    }

    public NovoLogin(): Response | Promise<Response> {
        const data: LoginData = {
            IdUsuario: 0,
            Nome: "",
            Senha: "",
            ErrMsgs: []
        };
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
            
            return await AuthService.redirecionarToken(usuarioEntity.Id);

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
        const commonData = LoginService.obterLoginCadastroData(formData);

        const data: LoginData = {
            IdUsuario: 0,
            Nome: commonData.nome,
            Senha: commonData.senha,
            ErrMsgs: commonData.errMsgs
        };

        return data;
    }
}