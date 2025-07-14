export interface IDataBase {
  IdUsuario: number;
  ErrMsgs: string[];
  PossuiErros(): boolean;
  AddErro(errMsg: string): void;
}

export abstract class DataBase implements IDataBase {

  public IdUsuario: number = 0;
  public ErrMsgs: string[] = [];

  public PossuiErros(): boolean {
    return this.ErrMsgs.length !== 0;
  };

  public AddErro(errMsg: string) {
    this.ErrMsgs.push(errMsg);
  }
  
}