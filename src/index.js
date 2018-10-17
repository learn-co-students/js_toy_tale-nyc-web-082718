const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
let idCounter = 0

document.addEventListener('DOMContentLoaded', () => {
  console.log('CONTENT LOADED')


  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(json => {
      setIdCount(json)
      makeToysFromJSON(json)
    })
  addEventListenerToForm()
 })

 function setIdCount(json) {
   idCounter = json.length
 }

//grabs each toy obj from json array
function makeToysFromJSON(json) {
  for (const toyObj of json) {
    // console.log(toyObj);
    // hands toy off to get html
    const cardHTML = makeToyCard(toyObj)
  }
}

//takes toy and creats html for it
function makeToyCard(toyObj) {
  const toyCollection = document.getElementById('toy-collection')

  const cardDiv = document.createElement('div')
  cardDiv.setAttribute("class", "card")
  toyCollection.appendChild(cardDiv)

  const nameHeader = document.createElement('h2')
  nameHeader.innerText = `${toyObj.name}`
  cardDiv.appendChild(nameHeader)

  const image = document.createElement('img')
  image.setAttribute("src", toyObj.image)
  image.setAttribute("class", "toy-avatar")
  cardDiv.appendChild(image)

  const likes = document.createElement('p')
  cardDiv.appendChild(likes)

  const likeBtn = document.createElement('button')
  likeBtn.setAttribute("class", "like-btn")
  likeBtn.innerText = 'Like <3'
  cardDiv.appendChild(likeBtn)
}

function addEventListenerToForm() {
  const newToyForm = document.querySelector('.add-toy-form')

  newToyForm.addEventListener('submit', event => {
    event.preventDefault()

    const toyObj = {
      'id': ++idCounter,
      'name': newToyForm.querySelectorAll('input')[0].value,
      'image': newToyForm.querySelectorAll('input')[1].value,
      'likes': 0,
    }

    makeToyCard(toyObj)
    addNewMessageToJSON(toyObj)
  })
}

function addNewMessageToJSON(toyObj) {
  fetch('http://localhost:3000/toys', {
    'method': 'POST',
    'header': {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    'body': JSON.stringify(toyObj)
  })
}
// debugger

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
