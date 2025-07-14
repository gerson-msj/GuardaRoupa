import { DataBase, IDataBase } from "../base/data.base.ts";

export default class LoginData extends DataBase implements IDataBase {
    public Nome: string;
    public Senha: string;

    constructor();
    constructor(nome: string, senha: string);
    constructor(nome: string, senha: string, errMsgs: string[]);
    constructor(nome: string = "", senha: string = "", errMsgs: string[] = []) {
        super();
        this.Nome = nome;
        this.Senha = senha;
        this.ErrMsgs = errMsgs;
    }

}