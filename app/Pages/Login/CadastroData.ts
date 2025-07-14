import { BaseData } from "../base/BaseData.ts";

export default interface CadastroData extends BaseData {
    Nome: string;
    Senha: string;
    ExibirSenha: boolean;
}