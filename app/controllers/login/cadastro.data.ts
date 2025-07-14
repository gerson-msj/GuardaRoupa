import { DataBase, IDataBase } from "../base/data.base.ts";

export default class CadastroData extends DataBase implements IDataBase {
    public Nome: string;
    public Senha: string;
    public ExibirSenha: boolean;

    constructor();
    constructor(nome: string, senha: string, exibirSenha: boolean);
    constructor(nome: string, senha: string, exibirSenha: boolean, errMsgs: string[]);
    constructor(nome: string = "", senha: string = "", exibirSenha: boolean = false, errMsgs: string[] = []) {
        super();
        this.Nome = nome;
        this.Senha = senha;
        this.ExibirSenha = exibirSenha;
        this.ErrMsgs = errMsgs;
    }
}