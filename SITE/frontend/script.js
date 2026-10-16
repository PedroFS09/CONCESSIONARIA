const botao = document.getElementById("btnBuscar");
const listaLivros = document.getElementById("ListaLivros");
const mensagem = document.getElementById("mensagem");

const formulario = document.getElementById("formLivro");
const campoModelo = document.getElementById("modelo");
const campoMarca = document.getElementById("marca");
const campoAno = document.getElementById("ano");
const campoValor = document.getElementById("valor");
const campoStatus = document.getElementById("status");

botao.addEventListener("click", buscarLivros);
formulario.addEventListener("submit", SalvarLivro);

let idEdicao = null;
const botaoSalvar = document.getElementById("btnSalvar");

async function buscarLivros() {
    try {
        mensagem.textContent = "Buscando veículos...";
        const resposta = await fetch("http://localhost:3000/livros");

        if (!resposta.ok) {
            throw new Error("Erro HTTP: " + resposta.status);
        }

        const veiculos = await resposta.json();
        listaLivros.innerHTML = "";

        if (veiculos.length === 0) {
            mensagem.textContent = "Nenhum veículo cadastrado.";
            return;
        }

        for (let i = 0; i < veiculos.length; i++) {
            listaLivros.innerHTML += `
                <tr>
                    <td>${veiculos[i].id}</td>
                    <td>${veiculos[i].modelo}</td>
                    <td>${veiculos[i].marca}</td>
                    <td>${veiculos[i].ano}</td>
                    <td>R$ ${Number(veiculos[i].valor).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
                    <td><span class="status ${veiculos[i].status.toLowerCase().replace(/\s+/g, "-")}">${veiculos[i].status}</span></td>
                    <td>
                        <button class="edit-btn" onclick="editarLivro(${veiculos[i].id})">Editar</button>
                        <button class="delete-btn" onclick="Excluirlivros(${veiculos[i].id})">Deletar</button>
                    </td>
                </tr>
            `;
        }

        mensagem.textContent = "Veículos encontrados.";
    } catch (erro) {
        mensagem.textContent = "Não foi possível carregar os veículos.";
        console.log("Erro:", erro);
    }
}

async function SalvarLivro(evento) {
    evento.preventDefault();
    if (idEdicao == null) {
        await CadastrarLivros();
    } else {
        await AtualizarLivro();
    }
}

async function CadastrarLivros() {
    try {
        const veiculo = {
            modelo: campoModelo.value,
            marca: campoMarca.value,
            ano: campoAno.value,
            valor: campoValor.value,
            status: campoStatus.value
        };

        const resposta = await fetch("http://localhost:3000/livros", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(veiculo)
        });

        if (!resposta.ok) {
            throw new Error("Erro HTTP: " + resposta.status);
        }

        const dados = await resposta.json();
        formulario.reset();
        await buscarLivros();
        mensagem.textContent = dados.mensagem;
    } catch (erro) {
        mensagem.textContent = "Não foi possível cadastrar o veículo.";
        console.log("Erro ao cadastrar veículo:", erro);
    }
}

async function editarLivro(id) {
    try {
        const resposta = await fetch("http://localhost:3000/livros/" + id);

        if (!resposta.ok) {
            throw new Error("Erro HTTP: " + resposta.status);
        }

        const veiculo = await resposta.json();
        campoModelo.value = veiculo.modelo;
        campoMarca.value = veiculo.marca;
        campoAno.value = veiculo.ano;
        campoValor.value = veiculo.valor;
        campoStatus.value = veiculo.status;
        idEdicao = veiculo.id;
        botaoSalvar.textContent = "Atualizar";
        mensagem.textContent = "Editando veículo de id: " + veiculo.id;
    } catch (erro) {
        mensagem.textContent = "Não foi possível carregar o veículo para edição.";
        console.log("Erro ao carregar veículo para edição:", erro);
    }
}

async function AtualizarLivro() {
    try {
        const veiculo = {
            modelo: campoModelo.value,
            marca: campoMarca.value,
            ano: campoAno.value,
            valor: campoValor.value,
            status: campoStatus.value
        };

        const resposta = await fetch("http://localhost:3000/livros/" + idEdicao, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(veiculo)
        });

        if (!resposta.ok) {
            throw new Error("Erro HTTP: " + resposta.status);
        }

        const dados = await resposta.json();
        formulario.reset();
        idEdicao = null;
        botaoSalvar.textContent = "Cadastrar";
        await buscarLivros();
        mensagem.textContent = dados.mensagem;
    } catch (erro) {
        mensagem.textContent = "Não foi possível atualizar o veículo.";
        console.log("Erro ao atualizar veículo:", erro);
    }
}

async function Excluirlivros(id) {
    const confirmar = confirm("Deseja realmente excluir este veículo?");
    if (!confirmar) {
        return;
    }

    try {
        const resposta = await fetch("http://localhost:3000/livros/" + id, {
            method: "DELETE"
        });

        if (!resposta.ok) {
            throw new Error("Erro HTTP: " + resposta.status);
        }

        const dados = await resposta.json();
        await buscarLivros();
        mensagem.textContent = dados.mensagem;
    } catch (erro) {
        mensagem.textContent = "Não foi possível excluir o veículo.";
        console.log("Erro ao excluir veículo:", erro);
    }
}





