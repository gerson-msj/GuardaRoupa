import CadastroRepository from "../../data-context/repositories/cadastro.repository.ts";
import ControllerBase from "../controller.base.ts";
import CadastroData from "./cadastro.data.ts";

export default class DetalhesController extends ControllerBase<CadastroData> {

    private repository = new CadastroRepository(this.dbContext);

    protected override configState(): void {
        this.state.menu = {
            "/cadastro/foto": "Voltar"
        };

        this.state.titulo = "Cadastrar Detalhes";
    }

    public async get() {
        const data = new CadastroData();
        try {
            await this.dbContext.openDb();
            const idCadastro = await this.repository.idCadastroIniciado();
            if(!idCadastro)
                return this.redirect("/cadastro/foto");
            data.foto = await this.repository.obterFoto(idCadastro) ?? undefined;
        } catch (error) {
            this.addError(error);
        } finally {
            this.dbContext.closeDb();
        }
        return this.ctx.render(data);
    }

    public post() {
        const data = new CadastroData();
        return this.ctx.render(data);
    }


}