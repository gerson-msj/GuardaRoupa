/// <reference lib="deno.unstable" />

const prefixes = [
  "usuarios"
] as const;

const seqs = [
  "usuarios:seq"
] as const;

const idxs = [
  "usuarios:idx"
] as const;



export type DbPrefix = typeof prefixes[number];
export type DbSeq = typeof seqs[number];
export type DbIdx = typeof idxs[number];

export default class DbContext {

  private _kv: Deno.Kv | undefined = undefined;
  public get kv() { return this._kv!; }

  public async openDb() {
    this._kv ??= await Deno.openKv(Deno.env.get("DBPATH")); // Temporário em dev.
  }

  public closeDb(): void {
    this._kv?.close();
  }

  public async nextSeq(seq: DbSeq): Promise<number> {
    const res = await this.kv.get<number>([seq]);
    const lastSeq = (res.value as number | null) ?? 0;
    return lastSeq + 1;
  }

}