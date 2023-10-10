document.getElementById('commandForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const command = document.getElementById('command').value;
    
    fetch('/cmdi', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ command: command })
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('result').innerText = data;
    })
    .catch(error => {
        console.error("Error : ", error);
    });
});

