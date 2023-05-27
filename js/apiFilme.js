const formPesquisa = document.querySelector("form");
const apiKey = 'ec504ee6';
const lista = document.querySelector(".lista");

const carregaLista = (json) =>{
    lista.innerHTML = '';
    if(json.Response == 'False'){
        alert(json.Error = "Filme não encontrado :(")
        return;
    }

    json.Search.forEach(async element => {
        const item = document.createElement("div");
        const quantPaginas = parseInt(json.totalResults);
        item.classList.add("item")

        const valor = await fetch(`https://www.omdbapi.com/?t=${element.Title}&apikey=${apiKey}`)
            .then(resposta => resposta.json());       

        item.innerHTML = `<img src="${element.Poster}"/>
        <h2>${element.Title}</h2>
        <p>${valor.Plot}</p>`
        lista.appendChild(item)
    })
}
//pesquisa titulo e poster...
formPesquisa.onsubmit = async (ev) => {
    ev.preventDefault();

    const pesquisa = ev.target.pesquisa.value;
    if(pesquisa == ''){
        alert('Preencha o campo de pesquisa!');
        return;
    }
    await fetch(`https://www.omdbapi.com/?s=${pesquisa}&apikey=${apiKey}`)
        .then(resposta => resposta.json())
        .then(json => carregaLista(json));
}
