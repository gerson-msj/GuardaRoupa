import { BaseData } from "../../../App.ts";

export default interface CadastroData extends BaseData {
    Nome: string;
    Senha: string;
    ExibirSenha: boolean;
}