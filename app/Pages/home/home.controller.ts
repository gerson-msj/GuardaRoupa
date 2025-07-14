import BaseController from "../base/BaseController.ts";
import HomeData from "./home.data.ts";

export default class HomeController extends BaseController<HomeData> {

    protected override configState(): void {
        this.state.menu = {
            "/cadastro": "Cadastrar",
            "/detalhes": "Detalhar",
            "/combinar": "Combinar",
            "/sair": "Sair"
        };
    }

    public entrar() {
        
        // Validar auth cookie
        
        const data = new HomeData();

        return this.ctx.render(data);
    }

}