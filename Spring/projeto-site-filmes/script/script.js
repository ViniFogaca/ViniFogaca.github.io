function cadastrar() {

    const filme = {
        tituloFilme: document.getElementById("titulo").value,
        ano: document.getElementById("ano").value,
        diretor: document.getElementById("diretor").value,
        capaUrl: document.getElementById("capaUrl").value,
        genero: {
            id: document.getElementById("generoSelect").value
        }
    };

    fetch("http://localhost:8080/filmes", {
        method: "POST", //Define o método HTTP como POST
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filme)
    }).then(() => listar());

}

function listar() {
    fetch("http://localhost:8080/filmes")
        .then(res => res.json())
        .then(filmes => {
            let html = "";

            filmes.forEach(f => {
                html += `
				<div class="movie">
					<img src="${f.capaUrl}">
					<strong>${f.tituloFilme}</strong>
					${f.ano} - ${f.diretor} <br>
                    ${f.genero ?  f.genero.nomeGenero : ""}
				</div>
			`;
            });

            document.getElementById("listaFilmes").innerHTML = html;

        });
}

function abrirFormulario() {
    carregarGenero();
    document.getElementById("formModal").classList.remove("hidden");
}

function fecharFormulario() {
    document.getElementById("formModal").classList.add("hidden");

}

function salvarFilme(){
    cadastrar();
    fecharFormulario();
}