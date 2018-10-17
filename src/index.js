
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const toyDiv = document.getElementById('toy-collection')

  function newToy(obj) {
      const cardDiv = document.createElement('div')
      cardDiv.setAttribute('class', 'card')
      cardDiv.innerHTML += `<h2>${obj.name}</h2>
      <img src="${obj.image}" class="toy-avatar">
      <p>${obj.likes} Likes</p>
      <button class="like-btn">Like <3</button>`
      let numLikes = cardDiv.querySelector('p')
      cardDiv.lastChild.addEventListener('click', event => {
        fetch(`http://localhost:3000/toys/${obj.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify(
            {
              "likes": ++obj.likes
            }
          )
        })
        .then(response => response.json())
        numLikes.innerText = `${obj.likes} Likes`
      })
      toyDiv.appendChild(cardDiv)
  }

  function fetchToys() {
    fetch('http://localhost:3000/toys')
    //parse response to JSON
    .then(response => response.json())
    //add each object in parsed response to new card div
    .then(allToys => {
      allToys.forEach(toyObj => newToy(toyObj))
    })
  }
  //fetch the toys from server
  fetchToys()

  let addToy = false

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


  const inputFields = document.querySelectorAll('.input-text')
  const nameField = inputFields[0]
  const imageField = inputFields[1]
  let num = 0
  toyForm.addEventListener('submit', event => {
    event.preventDefault()
    const newName = nameField.value
    const newImage = imageField.value
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(
        {
          "name": newName,
          "image": newImage,
          "likes": 0
        })
      })
      .then(response => response.json()) // parse response to JSON
      .then(newToyObj => newToy(newToyObj))
    event.target.reset()
  })
})
