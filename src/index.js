const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const formFormCreatingNewToy = document.getElementById('add-toy-form')
const collectionElement = document.getElementById('toy-collection')
const newNameElement = document.getElementById('newToyName')
const newToyImageElement = document.getElementById('newToyImage')
const createButtonElement = document.getElementById('createToy')
const likeButtons = document.getElementsByTagName('button')
let addToy = false

document.addEventListener("DOMContentLoaded", () => {

  getToys()

  addBtn.addEventListener('click', () => {
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

  createButtonElement.addEventListener('click', (event) => {
    event.preventDefault()
    const newNameElementValue = document.getElementById('newToyName').value
    const newToyImageElementValue = document.getElementById('newToyImage').value
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newNameElementValue,
        image: newToyImageElementValue,
        likes: 0,
      })
    }).then(response => response.json())
    .then(toy => createToy(toy))
    event.target.parentElement.reset()
    toyForm.style.display = 'none'
    addToy = !addToy
  })

  document.addEventListener('click', (event) => {
    if (event.target.className === 'like-btn') {
      let totalLikes = event.target.previousElementSibling.innerText
      let toyId = Number(event.target.id)
      let newLikes = Number(totalLikes) + 1
      event.target.previousElementSibling.innerText = newLikes
      fetch(`http://localhost:3000/toys/${toyId}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          likes: newLikes
        })
      }).then(response => response.json())
    }
  })

})

function getToys() {
  fetch('http://localhost:3000/toys')
  .then(fetchedPromise => fetchedPromise.json())
  .then(toys => {
    toys.forEach(toy => createToy(toy))
  })
}

function createToy(toy) {
  const newDivElement = document.createElement('div')
  newDivElement.className = "card"
  const newHeaderElement = document.createElement('h2')
  newHeaderElement.innerText = toy.name
  const newImage = document.createElement('img')
  newImage.className = "toy-avatar"
  newImage.src = toy.image
  const newP = document.createElement('p')
  newP.innerText = toy.likes
  const newButton = document.createElement('button')
  newButton.className = "like-btn"
  newButton.innerText = "Like <3"
  newButton.id = toy.id
  newDivElement.appendChild(newHeaderElement)
  newDivElement.appendChild(newImage)
  newDivElement.appendChild(newP)
  newDivElement.appendChild(newButton)
  const collectionElement = document.getElementById('toy-collection')
  collectionElement.appendChild(newDivElement)
}
