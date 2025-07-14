import { BaseData } from "../base/BaseData.ts";

export default interface LoginData extends BaseData {
    Nome: string;
    Senha: string;
}