const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
const newToyForm = document.getElementById('add-toy-form');
const nameInput = document.getElementById('name-input');
const imageURLInput = document.getElementById('image-url-input');

const toyCollection = document.getElementById('toy-collection');

let addToy = false;

const makeToyDiv = function(toy) {
  return `<div class="card" data-id="${toy.id}">
            <h2>${toy.name}</h2>
            <img src=${toy.image} class="toy-avatar">
            <p>${toy.likes} Likes <p>
            <button class="like-btn" onClick="like(${toy.id})">Like <3</button>
          </div>`;
}

const isURL = function(str) {
  return /^http/.test(str);
}

const like = function(toyId) {
  debugger
  const origLikes = parseInt(document.querySelector(`[data-id="${toyId}"]`).querySelector('p').innerText)
  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      likes: origLikes + 1
    })
  })
    .then(resp => resp.json())
    .then(json => {
      document.querySelector(`[data-id="${json.id}"]`).querySelector('p').innerText = `${json.likes} Likes `
    })
}


// YOUR CODE HERE
document.addEventListener('DOMContentLoaded', () => {

  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(json => {
      toyCollection.innerHTML = json.map(toy => makeToyDiv(toy)).join('');
    })

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy;
    nameInput.value = '';
    imageURLInput.value = '';

    if (addToy) {
      toyForm.style.display = 'block';

      // submit listener here
      newToyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (nameInput.value && isURL(imageURLInput.value)) {
          fetch('http://localhost:3000/toys', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: nameInput.value,
              image: imageURLInput.value,
              likes: 0
            })
          })
            .then(resp => resp.json())
            .then(json => {
              toyCollection.innerHTML += makeToyDiv(json);
            })
        }
      })
    } else {
      toyForm.style.display = 'none';
    }
  })
})
