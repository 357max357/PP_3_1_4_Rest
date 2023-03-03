const url = 'http://localhost:8080/api/admin/'
const dbRoles = [{id: 1, name: "ROLE_ADMIN"}, {id: 2, name: "ROLE_USER"}]
const address = 'api/user/'

fetch(address)
    .then(response => response.json())
    .catch(error => console.log(error))

let usersInfo = ''
let idForm = 0
let userInfo = ''
let option = ''

const showUsers = (users) => {
    const container = document.getElementById("tbody-admin")
    const arr = Array.from(users)

    arr.forEach(user => {
        usersInfo += `
        <tr>
            <td>${user.id}</td>
            <td>${user.firstName}</td>
            <td>${user.secondName}</td>
            <td>${user.email}</td>
            <td>${user.roles.map(role => role.name)}</td>
            <td class="text text-white">
                <a class="btnEdit btn btn-info">Edit</a>
            </td>
            <td class="text text-white">
                <a class="btnDelete btn btn-danger">Delete</a>
            </td>
        </tr>
        `
    })

    container.innerHTML = usersInfo
}
fetch(url)
    .then(response => response.json())
    .then(data => showUsers(data))
    .catch(error => console.log(error))

const reloadShowUsers = () => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            usersInfo = ''
            showUsers(data)
        })
}

const showUser = (user) => {
    const container = document.getElementById("tbody-user-info")

    userInfo += `
        <tr>
            <td>${user.id}</td>
            <td>${user.firstName}</td>
            <td>${user.secondName}</td>
            <td>${user.email}</td>
            <td>${user.roles.map(role => role.name)}</td>
        </tr>`

    container.innerHTML = userInfo
}
fetch(address)
    .then(response => response.json())
    .then(data => showUser(data))
    .catch(error => console.log(error))

const formNew = document.getElementById('formNewUser')
const firstName = document.getElementById('firstName')
const secondName = document.getElementById('secondName')
const email = document.getElementById('username')
const password = document.getElementById('password')
const roles = document.getElementById('userRole')
const btnNewUser = document.getElementById('btnNewUser')

btnNewUser.addEventListener('click', () => {
    console.log('btnNewUser click')
    firstName.value = ''
    secondName.value = ''
    email.value = ''
    password.value = ''
    roles.innerHTML = `
        <option>USER</option>
        <option>ADMIN</option>
        `
    option = 'userPage'
})

formNew.addEventListener('submit', (e) => {
    e.preventDefault()
    let listRoles = roleArray(document.getElementById('userRole'))
    console.log(
        firstName.value, secondName.value, email.value, password.value, listRoles
    )
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            firstName: firstName.value,
            secondName: secondName.value,
            email: email.value,
            password: password.value,
            roles: listRoles
        })
    })
        .then(formNew.reset())
        .then(res => res.json())
        .then(data => showUsers(data))
        .catch(error => console.log(error))
        .then(reloadShowUsers)
    $('.nav-tabs a[href="#nav-admin"]').tab('show')

})

const modalEdit = new bootstrap.Modal(document.getElementById('modalEdit'))
const editForm = document.getElementById('editForm')
const idEdit = document.getElementById('idEdit')
const nameEdit = document.getElementById('nameEdit')
const lastnameEdit = document.getElementById('lastNameEdit')
const emailEdit = document.getElementById('emailEdit')
const passwordEdit = document.getElementById('passwordEdit')
const rolesEdit = document.getElementById('userRoleEdit')

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            console.log("btnEditClick")
            handler(e)
        }
    })
}

on(document, 'click', '.btnEdit', e => {
    const row = e.target.parentNode.parentNode
    idForm = row.firstElementChild.innerHTML
    fetch(url + idForm, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => getUserById(data))
        .catch(error => console.log(error))
    const getUserById = (user) => {
        idEdit.value = user.id
        nameEdit.value = user.firstName
        lastnameEdit.value = user.secondName
        emailEdit.value = user.email
        passwordEdit.value = ''
        rolesEdit.innerHTML = `
            <option value="${dbRoles[0].id}">${dbRoles[0].name}</option>
            <option value="${dbRoles[1].id}">${dbRoles[1].name}</option>
            `
        Array.from(rolesEdit.options).forEach(opt => {
            user.roles.forEach(role => {
                if (role.name === opt.text) {
                    opt.selected = true
                }
            })
        })
        modalEdit.show()
    }
})

editForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let listRoles = roleArray(document.getElementById('userRoleEdit'))
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            id: idForm,
            firstName: nameEdit.value,
            secondName: lastnameEdit.value,
            email: emailEdit.value,
            password: passwordEdit.value,
            roles: listRoles
        })
    })
        .then(res => res.json())
        .then(data => showUsers(data))
        .catch(error => console.log(error))
        .then(reloadShowUsers)
    modalEdit.hide()
})

const modalDelete = new bootstrap.Modal(document.getElementById('modalDelete'))
const deleteForm = document.getElementById('modalDelete')
const idDelete = document.getElementById('idDel')
const nameDelete = document.getElementById('nameDel')
const lastnameDelete = document.getElementById('lastNameDel')
const emailDelete = document.getElementById('emailDel')
const rolesDelete = document.getElementById('userRoleDel')

on(document, 'click', '.btnDelete', e => {
    const row = e.target.parentNode.parentNode
    idForm = row.firstElementChild.innerHTML
    fetch(url + idForm, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => getUserById(data))
        .catch(error => console.log(error))
    const getUserById = (user) => {
        idDelete.value = user.id
        nameDelete.value = user.firstName
        lastnameDelete.value = user.secondName
        emailDelete.value = user.email
        rolesDelete.innerHTML = `
            <option value="${dbRoles[0].id}">${dbRoles[0].name}</option>
            <option value="${dbRoles[1].id}">${dbRoles[1].name}</option>
            `
        Array.from(rolesDelete.options).forEach(opt => {
            user.roles.forEach(role => {
                if (role.name === opt.text) {
                    opt.selected = true
                }
            })
        })
        modalDelete.show()
    }
})

deleteForm.addEventListener('submit', (e) => {
    e.preventDefault()
    fetch(url + idForm, {
        method: 'DELETE'
    })
        .then(data => showUsers(data))
        .catch(error => console.log(error))
        .then(reloadShowUsers)
    modalDelete.hide()
})

let roleArray = (options) => {
    let array = []

    for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
            let role = {id: options[i].value}
            array.push(role)
        }
    }

    return array
}