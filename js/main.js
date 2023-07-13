const list = document.getElementById('list')
const filter = document.getElementById('filter')
let USERS = []

filter.addEventListener('input', (event) => {
  const value = event.target.value.toLowerCase()
  const filteredUsers = USERS.filter((user) => user.name.toLowerCase().includes(value))
  render(filteredUsers)
})

async function start() {
  list.innerHTML = 'Загрузка данных...'
  try {
    const resp = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await resp.json()
    setTimeout(() => {
      USERS = data
      render(data)
    }, 1000)
  } catch (err) {
    list.style.color = 'red'
    list.innerHTML = err.message
  }
}

function render(users = []) {
  if (users.length === 0) {
    list.innerHTML = 'Не найдено пользователей с таким именем'
  } else {
    const html = users.map(toHTML).join('')
    list.innerHTML = html
  }
}

function toHTML(user) {
  return `<li class = "list-group-item">${user.name}</li>`
}

start()

