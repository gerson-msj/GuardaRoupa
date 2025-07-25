import CadastroRepository from "../../data-context/repositories/cadastro.repository.ts";
import ControllerBase from "../controller.base.ts";
import CadastroData from "./cadastro.data.ts";

export default class FotoController extends ControllerBase<CadastroData> {

    private repository = new CadastroRepository(this.dbContext);

    protected override configState(): void {
        
        this.state.menu = {
            "/home": "Voltar"
        };

        this.state.titulo = "Cadastrar Foto";
    }

    public async get() {
        const data = new CadastroData();

        try {
            await this.dbContext.openDb();

            let idCadastro = await this.repository.idCadastroIniciado();
            if (idCadastro == null) {
                idCadastro = await this.repository.iniciarCadastro();
            }
            
            data.foto = await this.repository.obterFoto(idCadastro) ?? undefined;
        } catch (error) {
            this.addError(error);
        } finally {
            this.dbContext.closeDb();
        }

        return this.ctx.render(data);
    }

    public async post() {
        const data = new CadastroData();
        
        try {
            
            await this.dbContext.openDb();
            const idCadastro = await this.repository.idCadastroIniciado();
            if(!idCadastro)
                throw new Error("Cadastro não iniciado");
            
            const formData = await this.req.formData();
            const file = formData.get("foto");
            const hasFile = file instanceof File;
            
            if(!hasFile) {
                const foto = await this.repository.obterFoto(idCadastro);
                if(foto)
                    return this.redirect("/cadastro/detalhes");
                else
                    return this.ctx.render(data);
            }

            const arrayBuffer = await file.arrayBuffer();
            const foto = new Uint8Array(arrayBuffer);
            await this.repository.armazenarFoto(idCadastro, foto);
            return this.redirect("/cadastro/detalhes");

        } catch (error) {
            this.addError(error);
        } finally {
            this.dbContext.closeDb();
        }

        return this.ctx.render(data);
    }
}