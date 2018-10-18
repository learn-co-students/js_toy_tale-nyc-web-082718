document.addEventListener("DOMContentLoaded", function(event) {

  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const toyCollection = document.getElementById('toy-collection')

  let addToy = false

  fetch('http://localhost:3000/toys')
  .then((response) => {
    return response.json()
  })
  .then((parsedJSONData) => {
    parsedJSONData.forEach((toy) => {
      toyCollection.innerHTML += `<div class="card" id=${toy.id}>
                                    <div class="id" style="visibility: hidden">${toy.id}</div>
                                    <h2>${toy.name}</h2>
                                    <img src='${toy.image}' class="toy-avatar">
                                    <p><span class="likes" id=${toy.id}-likes>${toy.likes || 0}</span> Likes <p>
                                    <button class="like-btn" id=${toy.id}>Like <3</button>
                                  </div>`
                                })
  })

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

  const addToyForm = document.querySelector('.add-toy-form')

  addToyForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const newToyName = event.target.querySelector('#name').value
    const newToyImage = event.target.querySelector('#image').value

    toyCollection.innerHTML += `<div class="card">
                                  <div class="toy." style="visibility: hidden">${toy.id}</div>
                                  <h2>${newToyName}</h2>
                                  <img src='${newToyImage}' class="toy-avatar">
                                  <p><span id=${toy.id}-likes>${0}</span> Likes <p>
                                  <button class="like-btn" id=${toy.id}>Like <3</button>
                                </div>`

  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers:
    {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        name: newToyName,
        image: newToyImage
      })
    })
  })

  document.addEventListener('click', (event) => {
    // get id of element trying to modify
    const id = event.target.id

    // change likes in the browser
    if (event.target.className === 'like-btn') {
      let name = event.target.parentNode.parentNode.children[1].innerText
      let img = event.target.parentNode.parentNode.children[2].src
      // let likes = (parseInt(event.target.parentNode.parentNode.children[3].children[0].innerText)) + 1
      // event.target.parentNode.parentNode.children[3].children[0].innerText = likes
      let likesSpan = document.getElementById(`${id}-likes`)
      likesSpan.innerText = parseInt(likesSpan.innerText) + 1

      // debugger

      // fetch(`http://localhost:3000/toys/${id}`, {
      //   method: 'PATCH',
      //   headers:
      //   {
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(
      //     {
      //       "name": name,
      //       "image": img,
      //       "likes": likes
      //     })
      // })
      // .then( res => res.json() )
      // .then( json  => console.log(json) )
    }
  })


}); //end of content loader
