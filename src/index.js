const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

// OR HERE!
const toyContainerToAppend = document.getElementById('toy-collection')

const renderToy = function(toyObject) {
  const card = document.createElement('p')
  card.className = 'card'
  toyContainerToAppend.appendChild(card)
  const h1 = document.createElement('h1')
  h1.innerText = toyObject.name
  card.appendChild(h1)
  const img = document.createElement('img')
  img.className = 'toy-avatar'
  img.src = toyObject.image
  card.appendChild(img)
  // card.id = `card${toyObject.id}`
  const likesP = document.createElement('p')
  likesP.innerText = toyObject.likes
  card.appendChild(likesP)
  const button = document.createElement('button')
  button.className = 'like-btn'
  button.innerText = 'Like <3'
  // button.id = `button${toyObject.id}`
  card.appendChild(button)

  button.addEventListener('click', function(){
    fetch(`http://localhost:3000/toys/${toyObject.id}`, {
      method: 'PATCH',
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(
        {
          "likes": ++ toyObject.likes
        })
      })
    .then(response => response.json())
    // .then(toyObject => renderToy(toyObject));
    likesP.innerText = toyObject.likes
  })
}

document.addEventListener("DOMContentLoaded", () => {
  // fetch('http://localhost:3000/toys')
  // .then(res => console.log(res))

  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(toyData => toyData.forEach((toyObject) => {
    renderToy(toyObject)

  }))
})

const makeToyForm = document.querySelector('.add-toy-form')

makeToyForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const toyName = document.getElementById('inputName')
  const toyPic = document.getElementById('inputPic')

  fetch(`http://localhost:3000/toys`, {
    method: 'POST',
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(
      {
        "name": toyName.value,
        "image": toyPic.value,
        "likes": 0
      })
    })
  .then(response => response.json())
  .then(newToyObj => renderToy(newToyObj));
})
