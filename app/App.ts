import sqlite, { SQLInputValue, SQLOutputValue } from "node:sqlite";
import { StatementResultingChanges } from "node:sqlite";

export interface StateData {
  titulo: string;
  menu: Record<string, string>;
}

export interface BaseData {
  Error?: Error;
}

export type ViewModelEffect = {
  Use: <TData extends BaseData>(data?: TData) => void;
}

export function getElement<T extends HTMLElement>(name: string): T {
  return document.querySelector(`#${name}`) as T;
}

export abstract class ViewModelBase {
  protected getElement<T extends HTMLElement>(name: string): T {
    return document.querySelector(`#${name}`) as T;
  }
}

export interface EntityBase {
  Id: number
}

export class DbContext  {
  

  private _db: sqlite.DatabaseSync | undefined = undefined;
  
  public openDb() {
    this._db ??= new sqlite.DatabaseSync(Deno.env.get("DBPATH")!, { readOnly: false, open: true });
  }

  public closeDb(): void {
    this._db?.close();
  }

  public insertNamed<T extends object>(sql: string, entity: T | Record<string, SQLInputValue>) : number {
    const parameters = {...entity} as Record<string, SQLInputValue>;
    const result = this.runNamed(sql, parameters);
    return result.lastInsertRowid as number;
  }
  
  public get<T>(sql: string, namedParameters: Record<string, SQLInputValue> | undefined = undefined, ...anonymousParameters: SQLInputValue[]): T | undefined
  {
    const query = this._db!.prepare(sql);
    const rawData = namedParameters ? query.get(namedParameters) : query.get(...anonymousParameters);
    return rawData ? Object.assign({}, rawData) as T : undefined;
  }

  public runNamed(sql: string, parameters: Record<string, SQLInputValue>): StatementResultingChanges {
    const query = this._db!.prepare(sql);
    return query.run(parameters);
  }

  public allNamed<T>(sql: string, parameters: Record<string, SQLInputValue>): T[] {
    const query = this._db!.prepare(sql);
    const rawData = query.all(parameters);
    return rawData.map(r => Object.assign({}, r) as T);
  }



}