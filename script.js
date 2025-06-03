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

            // Cria o corpo da tabela 
            const tableBody = document.createElement('tbody');


            result.rows.forEach(function (row) {
                const doc = row.doc;
                const dataRow = document.createElement('tr');
                const dateCell = document.createElement('td');
                dateCell.textContent = new Date(doc._id).toLocaleString();
                const formData = doc.formData;
                const fuelCell = document.createElement('td');
                fuelCell.textContent = formData.fuel;
                const fuelTypeCell = document.createElement('td');
                fuelTypeCell.textContent = formData.fuelType;
                const distanceCell = document.createElement('td');
                distanceCell.textContent = formData.distance;


                
                dataRow.appendChild(dateCell);
                dataRow.appendChild(fuelCell);
                dataRow.appendChild(fuelTypeCell);
                dataRow.appendChild(distanceCell);
                tableBody.appendChild(dataRow);
            });
            table.appendChild(tableBody);
            savedDataDiv.appendChild(table);
        }).catch(function (err) {
            console.log(err);
        });
}

document.getElementById('carbonForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = {
        fuel: parseFloat(document.getElementById('fuel').value),
        fuelType: document.getElementById('fuelType').value,
        distance: parseFloat(document.getElementById('distance').value)
    };
    saveData(formData).then(function () {
        displaySavedData();
    }).catch(function (err) {
        console.log(err);
    });
});

document.getElementById('saveDataBtn').addEventListener('click', function () {
    const formData = {
        fuel: parseFloat(document.getElementById('fuel').value),
        fuelType: document.getElementById('fuelType').value,
        distance: parseFloat(document.getElementById('distance').value)
    };
    saveData(formData).then(function () {
        alert('Dados salvos com sucesso!');
    }).catch(function (err) {
        console.log(err);
    });
});

document.getElementById('loadTableBtn').addEventListener('click', function () {
    displaySavedData();
});

