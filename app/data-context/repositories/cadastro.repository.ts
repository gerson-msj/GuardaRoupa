import CadastroEntity from "../entities/cadastro.entity.ts";
import RepositoryBase from "./repository.base.ts";

export default class CadastroRepository extends RepositoryBase {
    
    public async idCadastroIniciado(): Promise<number | null> {
        const keyIdx = this.dbContext.key_Cadastros_IdxIniciados();
        const resIdx = await this.dbContext.kv.get<number>(keyIdx);
        return resIdx.value;
    }

    public async iniciarCadastro(): Promise<number> {
        const keySeq = this.dbContext.key_Cadastros_Seq();
        const keyIdxIniciado = this.dbContext.key_Cadastros_IdxIniciados();
        
        const idCadastro = await this.dbContext.nextSeq(keySeq);
        const keyCadastro = this.dbContext.key_Cadastros(idCadastro);
        
        const value: CadastroEntity = {
            Id: idCadastro,
            Fase: "foto"
        };

        const res = await this.dbContext.kv.atomic()
            .set(keyCadastro, value)
            .set(keyIdxIniciado, idCadastro)
            .commit();

        if (!res.ok)
            throw new Error("Falha ao iniciar o cadastro.");

        return idCadastro;
    }

    public async obterCadastro(idCadastro: number): Promise<CadastroEntity | null> {
        const key = this.dbContext.key_Cadastros(idCadastro);
        const res = await this.dbContext.kv.get<CadastroEntity>(key);
        return res.value;
    }

    public async armazenarFoto(idCadastro: number, foto: Uint8Array<ArrayBuffer>): Promise<void> {
        const key = this.dbContext.key_Fotos(idCadastro);
        await this.dbContext.kv.set(key, foto);
    }

    public async obterFoto(idCadastro: number): Promise<Uint8Array<ArrayBuffer> | null> {
        const key = this.dbContext.key_Fotos(idCadastro);
        const res = await this.dbContext.kv.get<Uint8Array<ArrayBuffer>>(key);
        return res.value;
    }

}