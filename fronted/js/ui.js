// ui.js — reusable DOM helpers and tiny toast
export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

export function toast(msg, ms = 1400){
  const el = $('#toast');
  if(!el) return;
  el.innerHTML = msg;
  el.classList.add('show');
  setTimeout(()=> el.classList.remove('show'), ms);
}