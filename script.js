document.addEventListener('DOMContentLoaded', function () {
    const sheetUrl = 'https://docs.google.com/spreadsheets/d/18vHM9F7fh8QRLuCjZIp-_7b10mFUa0x_giK_asuAxWQ/export?format=csv&id=18vHM9F7fh8QRLuCjZIp-_7b10mFUa0x_giK_asuAxWQ';

    fetch(sheetUrl)
        .then(response => response.text())
        .then(data => {
            const parsedData = Papa.parse(data, {
                header: true,
                dynamicTyping: true
            });

            displayData(parsedData.data);
        })
        .catch(error => console.error('Error fetching data:', error));
});

function displayData(data) {
    const contentDiv = document.getElementById('content');
    const table = document.createElement('table');
    table.classList.add('table');

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    // Create table headers
    Object.keys(data[0]).forEach(key => {
        const th = document.createElement('th');
        th.textContent = key;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');

    // Create table rows
    data.forEach(row => {
        const tr = document.createElement('tr');
        Object.values(row).forEach(value => {
            const td = document.createElement('td');
            td.textContent = value;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    contentDiv.appendChild(table);
}
