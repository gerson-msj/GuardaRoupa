import { assert } from "$std/assert/assert.ts";

Deno.test("Data", () => {
    
    const expDias = 2;

    const fatorDia = 24 * 60 * 60 * 1000;
    const fatorMinuto = 60 * 1000;

    const dataAtual = new Date();           // Data atual.
    const msAtual = dataAtual.valueOf();    // Milissegundos desde epoch (01/01/1970) até a data atual.
    const msDias = expDias * fatorDia;      // Milissegundos dos dias informados.
    // Milissegundos deste epoch até a data de expiração, arredondando nos minutos.
    const msExp = Math.floor((msAtual + msDias) / fatorMinuto) * fatorMinuto;
    const exp = Math.floor(msExp / 1000);  // Exp = segundos desde epoch até a data de expiração.
        
    const dataExp = new Date(exp * 1000); // Data de expiração.
    console.log(dataAtual);
    console.log(dataExp);

    assert("1", "1");
});