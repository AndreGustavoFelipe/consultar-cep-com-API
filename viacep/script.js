function consultarCEP() {
    const cep = document.querySelector('#inputCep').value;
    const validaCEP = /^[0-9]{8}$/;

    if (!validaCEP.test(cep)) {
        document.querySelector('#inputCep').value = '';
        const alertElement = document.getElementById('alert');

        alertElement.removeAttribute("hidden");

        alertElement.innerHTML = `<p style = "font-size: 1.1em"><i class="fa-solid fa-triangle-exclamation"></i> Digite um CEP!</p>`;

        setTimeout(() => {
            alertElement.setAttribute("hidden", "hidden");
        }, 2000);

        return;
    }

    const url = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (!("erro" in data)) {
                const dados = document.getElementById('dados');
                const resultado = `
                    <h4 class="text-center">Dados do CEP ${cep}</h4>
                    <p>Logradouro: ${data.logradouro}</p>
                    <p>Bairro: ${data.bairro}</p>
                    <p>Estado: ${data.uf}</p>
                    <p>Cidade: ${data.localidade}</p>
                    <p>DDD: ${data.ddd}</p>
                    <p>IBGE: ${data.ibge}</p>
                `;

                document.getElementById('resultado').innerHTML = resultado;
                const modal = new bootstrap.Modal(document.getElementById('resultadoModal'));
                modal.show();
            } else {
                document.getElementById('inputCep').value = '';
                const alertElement = document.getElementById('alert');

                alertElement.removeAttribute("hidden");

                alertElement.innerHTML = `<p style = "font-size: 1.1em"><i class="fa-solid fa-triangle-exclamation"></i> CEP não encontrado! \nPor favor verifique o CEP e tente novamente</p>`;

                setTimeout(() => {
                    alertElement.setAttribute("hidden", "hidden");
                }, 2000);
            }
        })
        .catch(error => console.error("Ocorreu um erro", error));
}
