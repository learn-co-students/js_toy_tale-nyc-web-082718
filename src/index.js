let theToys

document.addEventListener('DOMContentLoaded', function(){
  const toyArea = document.querySelector('#toy-collection')
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const formInputName =document.getElementById('input-name')
  const formInputImg =document.getElementById('input-img')

  fetch('http://localhost:3000/toys')
  .then((response) =>  {
    return response.json()
  })
  .then((theData) => {
    theToys = theData
    const allTheToys = theToys.map(toyObj =>
    `<div class="card">
      <h2>${toyObj.name}</h2>
      <img src=${toyObj.image} class="toy-avatar" />
      <p data-name="${toyObj.name}"> ${toyObj.likes} </p>
      <button data-id=${toyObj.id} class="like-btn">Like ❤️</button>
    </div>`).join('')
    toyArea.innerHTML = allTheToys
  })

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

  toyForm.addEventListener('submit', event => {
    event.preventDefault()
    const newToyName = formInputName.value
    const newToyImg = formInputImg.value
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: theToys[theToys.length -1].id + 1,
        name: newToyName,
        image: newToyImg,
        likes: 0
      })
    })
    .then(function(response) {
      return response.json()
    })
    .then((newToy) => {
      const addedToy =
      `<div class="card">
        <h2>${newToy.name}</h2>
        <img src=${newToy.image} class="toy-avatar" />
        <p data-name="${newToy.name}"> ${newToy.likes} </p>
        <button data-id = ${newToy.id} class="like-btn">Like ❤️</button>
      </div>`
      toyArea.innerHTML += addedToy
    })
  })

  document.addEventListener('click', event => {
    if(event.target.dataset.id) {
      let foundToy = theToys.find(toyObj => toyObj.id === parseInt(event.target.dataset.id))
      let domLikes =
      foundToy.likes += 1
      event.target.parentElement.querySelector('p').innerText = foundToy.likes

      fetch(`http://localhost:3000/toys/${foundToy.id}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          likes: foundToy.likes
        })
      })


    }

  })

})
