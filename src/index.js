const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector('#toy-collection')
let addToy = false
let TOYS = []

document.addEventListener("DOMContentLoaded", () =>{
  fetch('http://localhost:3000/toys').then(res => res.json()).then((toys) => {
    for(toy of toys){
      toyCollection.innerHTML += renderToy(toy)
    }
    TOYS = toys
  }).then(() => {
    for(let child of toyCollection.children){
      child.lastElementChild.addEventListener("click", addLike)
    }
  })
})

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener("submit",(event)=>{
      event.preventDefault()
      let namefield = toyForm.firstElementChild.children[1]
      let urlfield = toyForm.firstElementChild.children[3]
      let newtoy = {}
      newtoy.name = namefield.value
      newtoy.image = urlfield.value
      newtoy.likes = 0
      newtoy.id = Number(TOYS[TOYS.length-1]["id"]) + 1
      TOYS.push(newtoy)
      toyCollection.innerHTML = ""
      for(toy of TOYS){
        toyCollection.innerHTML += renderToy(toy)
        toyCollection.lastElementChild.lastElementChild.addEventListener("click", addLike)
      }
      fetch('http://localhost:3000/toys',{
        method: "POST",
        body: JSON.stringify(newtoy),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }).then(fetch('http://localhost:3000/toys').then(res => res.json()).then((toys) => {TOYS = toys}))
    })
  } else {
    toyForm.style.display = 'none'
  }
})

let renderToy = function(toy){
  return `<div class="card"><h2>${toy["name"]}</h2><img class ="toy-avatar" src="${toy["image"]}"><p>${toy["likes"]} likes</p><button data-id="${toy.id}" class="like-btn">Like 💛</button></div>`
}

let addLike = function(event){
  let workingID = event.target.attributes["data-id"].value
  console.log(workingID)
  let workingtoy = TOYS.find(toy => toy.id == workingID)
  workingtoy.likes += 1
  TOYS.find(toy => toy.id == workingID).likes = workingtoy.likes
  console.log(workingtoy)
  event.target.previousElementSibling.innerText = `${workingtoy.likes} likes`
  fetch(`http://localhost:3000/toys/${workingID}`,{
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": workingtoy.likes
    })
  })
}

// OR HERE!
