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
/// **ENd of Given code

const allToys = document.querySelector("#toy-collection")
function makeToyDiv(toy) {
  return `<div class="card" id="${toy.id}">
                <h2>${toy.name}</h2>
                <img class="toy-avatar" src="${toy.image}">
                <p>Likes: <span>${toy.likes}</span></p>
                <button class="like-btn">Like <3</button>
              </div>`
}

function editToyDiv(toy){
  return ` <h2>${toy.name}</h2>
                  <img class="toy-avatar" src="${toy.image}">
                  <p>Likes: <span>${toy.likes}</span></p>
                  <button class="like-btn">Like <3</button>`
}

function fetchToys() {
  fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then(parsed => {
      for (let i = 0; i < parsed.length; i++) {
        allToys.innerHTML += makeToyDiv(parsed[i])
      }
    })
}

function postToy(){
  let newForm = document.getElementsByClassName("add-toy-form")[0]
  let nameValue = newForm.children[1].value
  let ImageValue = newForm.children[3].value
  fetch("http://localhost:3000/toys", {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({
      "name": nameValue,
      "image": ImageValue,
      "likes": 0
    })
  })
  .then(res => res.json())
  .then(parsed=>allToys.innerHTML += makeToyDiv(parsed))
}

function patchLike(card){
  // debugger
  let currentLikes = parseInt(card.querySelector("span").innerText)
  let id = card.id
  fetch("http://localhost:3000/toys" + "/" + id, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "PATCH",
    body: JSON.stringify({
      "likes":  currentLikes += 1
    })
  }).then(res => res.json())
  .then(parsed=> card.innerHTML = editToyDiv(parsed))
}


document.addEventListener("DOMContentLoaded", e => {
  fetchToys()
})

document.addEventListener("submit", e => {
  e.preventDefault()
  postToy()
  e.target.reset()
  e.target.parentElement.style.display="none"
  addToy = !addToy
})

document.addEventListener("click", e => {
if (e.target.innerText === "Like <3") {
    patchLike(e.target.parentElement)
    }
})


//When you post you get it back so json it
