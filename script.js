let produtos =
JSON.parse(localStorage.getItem("estoque")) || [];
 
let historico =
JSON.parse(localStorage.getItem("historico")) || [];
 
function salvarDados() {
localStorage.setItem(
"estoque",
JSON.stringify(produtos)
);
 
localStorage.setItem(
"historico",
JSON.stringify(historico)
);
}
 
function atualizarDashboard() {
 
document.getElementById("totalProdutos").innerText =
produtos.length;
 
let totalItens = 0;
let valorTotal = 0;
 
produtos.forEach(produto => {
 
totalItens += Number(produto.quantidade);
 
valorTotal +=
Number(produto.quantidade) *
Number(produto.preco);
 
});
 
document.getElementById("totalEstoque").innerText =
totalItens;
 
document.getElementById("valorTotal").innerText =
"R$ " + valorTotal.toFixed(2);
}
 
function renderizarHistorico() {
 
const lista =
document.getElementById("historico");
 
lista.innerHTML = "";
 
historico
.slice()
.reverse()
.forEach(item => {
 
lista.innerHTML += `
<li>${item}</li>
`;
 
});
 
}
 
function renderizar(filtro = "") {
 
const lista =
document.getElementById("lista");
 
lista.innerHTML = "";
 
produtos
.filter(produto =>
produto.nome
.toLowerCase()
.includes(
filtro.toLowerCase()
)
)
.forEach((produto, index) => {
 
lista.innerHTML += `
<tr>
 
<td>${produto.nome}</td>
<td>${produto.categoria}</td>
<td>${produto.marca}</td>
<td>${produto.quantidade}</td>
<td>R$ ${Number(produto.preco).toFixed(2)}</td>
 
<td>
 
<button
class="entrada"
onclick="entrada(${index})">
Entrada
</button>
 
<button
class="saida"
onclick="saida(${index})">
Saída
</button>
 
<button
class="excluir"
onclick="excluirProduto(${index})">
Excluir
</button>
 
</td>
 
</tr>
`;
 
});
 
atualizarDashboard();
renderizarHistorico();
}
 
function entrada(index) {
 
let qtd =
prompt("Quantidade de entrada:");
 
if (!qtd) return;
 
produtos[index].quantidade =
Number(produtos[index].quantidade) +
Number(qtd);
 
historico.push(
`Entrada ${qtd} - ${produtos[index].nome}`
);
 
salvarDados();
renderizar();
}
 
function saida(index) {
 
let qtd =
prompt("Quantidade de saída:");
 
if (!qtd) return;
 
if (
Number(qtd) >
Number(produtos[index].quantidade)
) {
alert("Estoque insuficiente");
return;
}
 
produtos[index].quantidade =
Number(produtos[index].quantidade) -
Number(qtd);
 
historico.push(
`Saída ${qtd} - ${produtos[index].nome}`
);
 
salvarDados();
renderizar();
}
 
function excluirProduto(index) {
 
if (confirm("Excluir produto?")) {
 
historico.push(
`Produto excluído: ${produtos[index].nome}`
);
 
produtos.splice(index, 1);
 
salvarDados();
renderizar();
}
}
