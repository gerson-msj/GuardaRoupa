
/**
 * 
 * @param key Id, Name ou ClassName.
 * @returns Primeiro elemento localizado, retorna erro se não houver nenhum.
 */
export function getElement<T extends HTMLElement>(key: string): T {
  return document.querySelector<T>(`#${key}`)
    ?? document.querySelector<T>(`[name='${key}']`)
    ?? document.querySelector<T>(`.${key}`)!;
}