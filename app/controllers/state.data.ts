export class StateData {
  public titulo: string = "Guarda-Roupas";

  /**
   * Record de href e texto.
   */
  public menu: Record<string, string> = {};

  public idUsuario?: number;
  public renovarToken: boolean = false;

  public errMsg: string[] = [];
}

