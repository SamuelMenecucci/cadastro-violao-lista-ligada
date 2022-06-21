import { No } from "./No.js";
import { promises as fs } from "fs";
const { readFile, writeFile } = fs;

export class ListaLigada {
  head;
  size = 0;

  constructor() {}

  inserirNoInicio(info) {
    this.head = new No(info, this.head);
    this.size++;
  }

  inserirNoFim(info) {
    let novoNo = new No(info);
    let p;

    if (this.head == null) {
      this.head = novoNo;
    } else {
      p = this.head;

      while (p.prox != null) {
        p = p.prox;
      }
      p.prox = novoNo;
    }

    this.size++;
  }

  imprimir() {
    let p = this.head;
    let toShow = [];
    while (p !== null) {
      toShow.push(p.info);
      p = p.prox;
    }

    // console.log(this.head);

    console.table(toShow);

    return toShow;
  }

  async salvar() {
    let p = this.head;
    let data = JSON.parse(await readFile("data.json"));

    data.violao = [];

    while (p !== null) {
      data.violao.push(p.info);

      await writeFile("data.json", JSON.stringify(data, null, 2));
      p = p.prox;
    }
  }

  async importar() {
    this.head = null;

    let data = JSON.parse(await readFile("data.json"));

    for (let violao of data.violao) {
      this.inserirNoFim(violao);
    }

    return;
  }

  procurar(filtro, valor) {
    let p = this.head;

    let violoesEncontrados = [];

    while (p !== null) {
      if (p.info[filtro] == valor) violoesEncontrados.push(p.info);
      p = p.prox;
    }

    if (violoesEncontrados.length === 0)
      return console.log("Nenhum dado encontrado");

    console.table(violoesEncontrados);
  }

  // Remove o nó armazenado na posição "index" (idx) da lista.
  removerDaPosicao(idx) {
    let p = this.head;
    let prev; // "Ponteiro" para o nó anterior a "p" ("aponta" para o nó anterior ao nó apontado por "p")
    // Remove o nó do início da lista (idx == 0)
    if (idx === 0) {
      this.head = p.prox;
    } else {
      // Remove o no da posição "idx"
      for (let i = 0; i < idx; i++) {
        prev = p;
        p = p.prox;
      }
      prev.prox = p.prox; // O nó apontado por "prev" (anterior ao apontado por "p") aponta para o nó posterior ao nó apontado por "p", que será removido da lista
    }
    this.size--;
  }

  atualizar(idx, key, value) {
    let p = this.head;
    let cont = 0;

    while (p !== null) {
      if (cont === idx) {
        p.info[key] = value;
      }
      p = p.prox;
      cont++;
    }
  }
}
