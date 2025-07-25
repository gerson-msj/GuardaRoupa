import CadastroRepository from "../../data-context/repositories/cadastro.repository.ts";
import ControllerBase from "../controller.base.ts";
import CadastroData from "./cadastro.data.ts";

export default class CadastroController extends ControllerBase<CadastroData> {

    private repository = new CadastroRepository(this.dbContext);

    protected override configState(): void {

        this.state.menu = {
            "/home": "Voltar"
        };

        this.state.titulo = "Cadastrar nova peça";
    }

    public get() {
        const data = new CadastroData();
        return this.ctx.render(data);
    }

    public post() {
        const data = new CadastroData();
        return this.ctx.render(data);
    }
}