const address = 'api/user/'
fetch(address)
    .then(response => response.json())
    .catch(error => console.log(error))

let userPageInfo = ' '
const showUserInfo = (user) => {
    const container = document.getElementById("tbody-user")
    userPageInfo +=
        `<tr>
            <td>${user.id}</td>
            <td>${user.firstName}</td>
            <td>${user.secondName}</td>
            <td>${user.email}</td>
            
        </tr>`
    container.innerHTML = userPageInfo
}
fetch(address)
    .then(response => response.json())
    .then(data => showUserInfo(data))
    .catch(error => console.log(error))
