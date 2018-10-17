const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toys = document.querySelector('#toy-collection')
let addToy = false

// display all toys

fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(parsed => {
    parsed.forEach((toy) => {
      makeToyDiv(toy)
    })
  })

// show/hide new toy form

addBtn.addEventListener('click', () => {
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

function makeToyDiv(toyObject) {
  const toyDiv = document.createElement('div')
  toyDiv.className = 'card'
  toyDiv.innerHTML = `
    <h2>${toyObject.name}</h2>
    <img src=${toyObject.image} class="toy-avatar">
    <p>${toyObject.likes}<p>
    <button class="like-btn" id="${toyObject.id}">Like <3</button>
  `
  const toyDivBtn = toyDiv.querySelector('button')
  toyDivBtn.addEventListener('click', () => {
    const likesP = toyDiv.querySelector('p')
    let likes = parseInt(likesP.innerText)
    likesP.innerText = ++likes

    const toyId = event.target.id
    fetch(`http://localhost:3000/toys/${toyId}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": likes
      })
    })
  })
  toys.appendChild(toyDiv)
}

// new toy form
const addToyForm = document.querySelector('.add-toy-form')
const toyNameInput = document.getElementsByTagName('input')[0]
const toyImageInput = document.getElementsByTagName('input')[1]

addToyForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const name = toyNameInput.value
  const image = toyImageInput.value
  console.log(name, image);

  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": name,
      "image": image,
      "likes": 0
    })
  })
  .then(response => response.json())
  .then(jsonToy => {
    makeToyDiv(jsonToy)
  })

  addToyForm.reset()
})
