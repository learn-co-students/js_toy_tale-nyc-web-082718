const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyContainer = document.getElementById('toy-collection')
// const likeButton = document.querySelector('.like-btm')

let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', (e) => {
  // e.preventDefault()
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    toyForm.addEventListener('submit', e => {
      e.preventDefault()
      addToyData(event)
      event.target.reset()
    })
  } else {
    toyForm.style.display = 'none'
  }
})




// OR HERE!
addToyData = (event) => {
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: event.target.name.value,
      image: event.target.image.value,
      likes: 0
    })
  })
    .then(response => response.json())
    .then(jsonToy => {
      let newToy = [jsonToy]
      alert("You Created a New Toy")
      displayToys(newToy)
    })
}

displayToys = (collection) => {
  collection.map(el => {
    let newDiv = document.createElement('div')
    newDiv.className = "card"

    // create h2 with name
    let newH2 = document.createElement('h2')
    newH2.innerText = el.name
    newDiv.appendChild(newH2)

    // create Img with image
    let newImg = document.createElement('img')
    newImg.className = "toy-avatar"
    newImg.src = el.image
    newDiv.appendChild(newImg)

    // create p of likes
    let newP = document.createElement('p')
    newP.innerText = `${el.likes} Likes`
    newDiv.appendChild(newP)

    // create Button
    let newBtn = document.createElement('BUTTON')
    newBtn.className = "like-btn"
    newBtn.innerText = 'Like'
    newBtn.id = el.id
    newBtn.addEventListener('click', (e) => {
      addLikes(e)
    })
    newDiv.appendChild(newBtn)

    //Append all to container
    toyContainer.appendChild(newDiv)
  })
}


addLikes = (e) => {
  let likes = parseInt(e.target.parentElement.childNodes[2].innerText)
    likes += 1
    e.target.parentElement.childNodes[2].innerText = `${likes} Likes`

  fetch(`http://localhost:3000/toys/${parseInt(e.target.id)}`,{
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      likes: likes
    })
  })
    .then(response => response.json())
    .then(toy => console.log(toy))
}


fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(jsonResponce => displayToys(jsonResponce))
