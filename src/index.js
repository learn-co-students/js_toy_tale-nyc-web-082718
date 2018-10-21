const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
  const toyCollection = document.getElementById('toy-collection')

function getToys(){
  toyCollection.innerHTML = ""
  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(toys => {
      toys.forEach( toyObj => {
        displayToy(toyObj)
      })
    })
}
getToys()

function displayToy(toyObj){
  const toyCardDiv = document.createElement('div')
  toyCardDiv.setAttribute('class', 'card')
  toyCardDiv.innerHTML = `
    <h2>${toyObj.name}</h2>
    <img src=${toyObj.image} class="toy-avatar" />
    <p>${toyObj.likes} Likes </p>
    <button class="like-btn">Like <3</button>
  `

  toyCollection.appendChild(toyCardDiv)

  const likeButton = toyCardDiv.querySelector('.like-btn')
  likeButton.addEventListener('click', event => {
    const toyLikesPTag = toyCardDiv.querySelector('p')
    const newLikeNumber = ++toyObj.likes
    toyLikesPTag.innerText = `${newLikeNumber} Likes`
    // console.log(likes)
    likeToy(toyObj, newLikeNumber)
  })

}

document.addEventListener('submit', event => {
  event.preventDefault()
  const nameInput = document.getElementById('toy-name')
  const imageInput = document.getElementById('toy-image')
  addNewToy(nameInput.value, imageInput.value)
})


function addNewToy(name, image){
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      image: image,
      likes: 0
    })
  })
  .then(response => response.json())
  .then(displayToy)
}

function likeToy(toyObj, newLikeNumber){
  let likes = toyObj.likes
  // likes++
  fetch(`http://localhost:3000/toys/${toyObj.id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": newLikeNumber
    })
  })
  .then(response => response.json())
  // .then(getToys)
}


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
