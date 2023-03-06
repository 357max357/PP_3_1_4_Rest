const url = "http://localhost:8080/api/user"

async function thisUser() {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            $('#headerEmail').append(data.email);
            let roles = data.roles.map(role => " " + role.name.substring(5));
            $('#headerRoles').append(roles);

            let user = `$(
            <tr>
                <td>${data.id}</td>
                <td>${data.firstName}</td>           
                <td>${data.secondName}</td>           
                <td>${data.email}</td>
                <td>${roles}</td>)`;
            $('#userPanelBody').append(user);
        })
}

$(async function () {
    await thisUser();
});