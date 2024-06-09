document.addEventListener("DOMContentLoaded", function(){ fetchData(); });

function fetchData() {
    fetch("hello-database.railway.internal")
        .then(res =>  res.json())
        .then(users => { populateTable(users); });
}

function populateTable(users) {
    for(let user of users) {
        delete user._id;
        delete user._v;

        let now = new Date();
        let birthday = new Date(user.birthday);
        let row = document.createElement('tr');
        let col;

        user.age = now.getFullYear() - new Date(user.birthday).getFullYear();
        user.birthday = birthday.toLocaleDateString('es-AR');

        for(let key in user) {
            col = document.createElement('td');
            col.innerHTML = user[key];
            row.append(col);
        }
        
        document.getElementById('tbody').append(row);
    }
};

function fetchUser() {
    let id = document.getElementById('userID').value;

    if(isNaN(id)) return;
    fetch(`hello-database.railway.internal/api/user/${id}`)
        .then(res => res.json())
        .then(user => {
            let users = [user];

            if(users[0] !== null) {
                let oldTBody = document.getElementById('tbody');
                let newTBody = document.createElement('tbody');

                newTBody.id = 'tbody';
                oldTBody.replaceWith(newTBody);

                populateTable(users);
                
                document.getElementById('table').hidden = false;
                document.getElementById('nores').innerHTML = '';
            } else {
                document.getElementById('table').hidden = true;
                document.getElementById('nores').innerHTML = 'No hay resultados';
            }
        })
}