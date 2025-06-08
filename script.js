// Cria uma instância de banco de dados local no navegador https://pouchdb.com/guides/setup-pouchdb.html
const db = new PouchDB('carbon_footprint');


// Uma função que recebe nos paremtros os dados do formulario e salva no Banco
function saveData(formData) {
    return db.put({ // Metodo do pouchDb utilizado para salvar os dados no banco : https://pouchdb.com/guides/
        _id: new Date().toISOString(),
        formData: formData
    });
}

// 

function displaySavedData() {
    db.allDocs({ include_docs: true, descending: true }) // Recupera todos os dados salvos no banco de dados em ordem decresente  https://pouchdb.com/guides/
        .then(function (result) {

            // Retorna a referência do elemento através do seu ID  https://developer.mozilla.org/pt-BR/docs/Web/API/Document/getElementById
            const savedDataDiv = document.getElementById('savedData');

            savedDataDiv.innerHTML = '<h2 class="text-xl font-semibold text-gray-800">Dados Salvos</h2>';
            const table = document.createElement('table');

            // Adiciona classes utilitárias do Tailwind CSS para estilizar a tabela  https://tailwindcss.com/docs
            table.classList.add('mt-4', 'w-full', 'border', 'border-gray-200', 'divide-y', 'divide-gray-200');

            // Cria o cabeçalho da tabela https://developer.mozilla.org/pt-BR/search?q=createElement
            const tableHeader = document.createElement('thead');


            const headerRow = document.createElement('tr');

            // Cria e define os títulos das colunas https://developer.mozilla.org/pt-BR/search?q=createElement
            const header1 = document.createElement('th');
            header1.textContent = 'Data';
            const header2 = document.createElement('th');
            header2.textContent = 'Combustível (litros)';
            const header3 = document.createElement('th');
            header3.textContent = 'Tipo de Combustível';
            const header4 = document.createElement('th');
            header4.textContent = 'Distância Percorrida (km)';


            // Adiciona os titulos ao cabeçalho https://developer.mozilla.org/pt-BR/docs/Web/API/Node/appendChild
            headerRow.appendChild(header1);
            headerRow.appendChild(header2);
            headerRow.appendChild(header3);
            headerRow.appendChild(header4);
            tableHeader.appendChild(headerRow);
            table.appendChild(tableHeader);

            // Cria o corpo da tabela, onde os dados serão inseridos
            const tableBody = document.createElement('tbody');

            // Itera sobre cada linha de resultados retornados pelo banco de dados
            result.rows.forEach(function (row) {

                // Acessa o documento da linha específica
                const doc = row.doc;

                // Cria uma nova linha de dados na tabela
                const dataRow = document.createElement('tr');

                // Cria células para cada item de dado
                const dateCell = document.createElement('td');

                // Converte a data (_id do documento) para uma string local formatada
                dateCell.textContent = new Date(doc._id).toLocaleString();

                // Acessa os dados do formulário armazenados no documento, O campo 'formData' contém os dados do formulário
                const formData = doc.formData;

                // Cria uma célula para o combustível (campo <td> na tabela)
                const fuelCell = document.createElement('td');

                // Define o conteúdo da célula com o valor de combustível, o formData.fuel contém o valor do combustível
                fuelCell.textContent = formData.fuel;

                // Cria uma célula para o tipo de combustível
                const fuelTypeCell = document.createElement('td');

                // Define o conteúdo da célula com o tipo de combustível, o valor é extraído do campo formData.fuelType, que contém o tipo de combustível.
                fuelTypeCell.textContent = formData.fuelType;

                // Cria uma célula para a distância percorrida
                const distanceCell = document.createElement('td');

                // Define o conteúdo da célula com a distância percorrida, a distância é extraída de formData.distance e será exibida
                distanceCell.textContent = formData.distance;


                //Adiciona os dados à linha da tabela
                dataRow.appendChild(dateCell);
                dataRow.appendChild(fuelCell);
                dataRow.appendChild(fuelTypeCell);
                dataRow.appendChild(distanceCell);
                tableBody.appendChild(dataRow);
            });

            // Adiciona o corpo da tabela à tabela criada // https://developer.mozilla.org/pt-BR/docs/Web/API/Node/appendChild
            table.appendChild(tableBody);

            // Adiciona a tabela finalizada ao savedDataDiv
            savedDataDiv.appendChild(table);

        }).catch(function (err) {
            console.log(err);
        });
}

// Escuta o evento de envio do formulário com o ID 'carbonForm'
document.getElementById('carbonForm').addEventListener('submit', function (event) {
    // Impede o envio padrão do formulário (não recarrega a página) https://developer.mozilla.org/pt-BR/docs/Web/API/Event/preventDefault
    event.preventDefault();

    // Cria um objeto formData com os valores dos campos do formulário
    // Os valores são convertidos para números (parseFloat) onde necessário
    const formData = {
        fuel: parseFloat(document.getElementById('fuel').value),  // Coleta e converte o valor de combustível
        fuelType: document.getElementById('fuelType').value,  // Coleta o tipo de combustível
        distance: parseFloat(document.getElementById('distance').value)  // Coleta e converte a distância
    };

    // Chama a função saveData com os dados coletados do formulário https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise
    saveData(formData)
        .then(function () {
            // Exibe os dados salvos na interface quando o salvamento for bem-sucedido
            displaySavedData();
        })
        .catch(function (err) {
            // Exibe o erro no console se algo der errado ao salvar os dados https://developer.mozilla.org/pt-BR/docs/Web/API/Console/log
            console.log(err);
        });
});

// Escuta o evento de clique no botão de salvar dados com o ID 'saveDataBtn'
document.getElementById('saveDataBtn').addEventListener('click', function () {
    // Coleta os dados do formulário de maneira semelhante ao bloco anterior
    const formData = {
        fuel: parseFloat(document.getElementById('fuel').value),
        fuelType: document.getElementById('fuelType').value,
        distance: parseFloat(document.getElementById('distance').value)
    };

    // Chama a função saveData com os dados coletados
    saveData(formData)
        .then(function () {
            // Exibe uma mensagem de sucesso para o usuário https://developer.mozilla.org/pt-BR/docs/Web/API/Window/alert
            alert('Dados salvos com sucesso!');
        })
        .catch(function (err) {
            // Exibe o erro no console se algo der errado ao salvar os dados https://developer.mozilla.org/pt-BR/docs/Web/API/Console/log
            console.log(err);
        });
});

// Escuta o evento de clique no botão de carregar dados com o ID 'loadTableBtn'
document.getElementById('loadTableBtn').addEventListener('click', function () {
    // Chama a função displaySavedData para exibir os dados salvos
    displaySavedData();
});

