import ControllerBase from "../controller.base.ts";
import HomeData from "./home.data.ts";

export default class HomeController extends ControllerBase<HomeData> {

    protected override configState(): void {
        this.state.menu = {
            "/cadastro": "Cadastrar",
            "/home?sair": "Sair"
        };
    }

    public get() {
        const data = new HomeData();
        data.Sair = this.url.searchParams.has("sair");
        
        if(this.url.searchParams.has("quit")) {
            const removeToken = "token=''; Path=/; HttpOnly; Max-Age=0";
            const headers = new Headers();
            headers.set("Set-Cookie", removeToken);
            return this.redirect("/", headers);
        }

        return this.ctx.render(data);
    }

}