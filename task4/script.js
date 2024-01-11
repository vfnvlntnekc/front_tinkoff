let globalCards = localStorage.getItem('cards') ? JSON.parse(localStorage.getItem('cards')) : [];
console.log(globalCards);
const API_URL = 'http://localhost:3002';

function saveCards(){
    localStorage.removeItem('cards');
    localStorage.setItem('cards', JSON.stringify(globalCards));
}

async function saveCard(card) {
    try {
      const response = await fetch(`${API_URL}/items/${card.id || ''}`, {
        method: card.id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(card),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error saving card:', error);
      throw error;
    }
}

async function deleteCard(id) {
    try {
      await fetch(`${API_URL}/items/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Error deleting card:', error);
      throw error;
    }
}

async function getCreatorInfo() {
    try {
      const response = await fetch(`${API_URL}/creatorInfo`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching creator info:', error);
      throw error;
    }
}

async function updateCreatorName() {
    try {
      const creatorInfo = await getCreatorInfo();
      
      const creatorNameElement = document.getElementById('creatorName');
      creatorNameElement.textContent = creatorInfo.name + ' ' + creatorInfo.group;
  
    } catch (error) {
      console.error('Error updating creator name:', error);
    }
  }updateCreatorName();


async function getCards() {
    try {
      const response = await fetch(`${API_URL}/items`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching cards:', error);
      throw error;
    }
}


async function fillCards() {
try {
    const cards = await getCards();

    const showcase = document.querySelector('.showcase__inner');
    showcase.innerHTML = '';

    cards.forEach(elem => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<div class="card__header">
            <div class="card__id">
                <p id="card-id">ID: ${elem.id}</p>
            </div>
            <button class="card-edit-btn" onclick="editCard(this)">Изменить</button>
        </div>
        <div class="card__main">
            <div class="card__image-box">
                <img id="card-url" src="${elem.url}" alt="Обложка">
            </div>
            <div class="card__title">
                <p id="card-artist">${elem.artist}</p>
                <h1 id="card-name">${elem.name}</h1>
            </div>
        </div>
        <div class="card__album">
            <p id="card-album">${elem.album}</p>
        </div>
        <div class="card__info">
            <p id="card-info">${elem.info}</p>
        </div>
    </div>`;

    card.addEventListener('click', function(event) {
        if (!event.target.classList.contains('card-edit-btn')) {
        card.classList.toggle('card_chosen');
        }
    });

    showcase.appendChild(card);
    });
} catch (error) {
    console.error('Error filling cards from server:', error);
}
}
      
fillCards();

async function addCard() {
    document.querySelector(".loader").style.display = "flex";
    const artist = document.getElementById('artist').value;
    const name = document.getElementById('name').value;
    const info = document.getElementById('info').value;
    let url = document.getElementById('url').value;
    const id = Number(document.getElementById('id').value);
    const album = document.getElementById('album').value;

    if (artist === '' || name === '' || id === '' || album === '') {
        alert('Все обязательные поля должны быть заполнены');
        return;
    }

    const card = {
        artist,
        name,
        info,
        url,
        id,
        album
    };

    try {
        const response = await fetch(`${API_URL}/items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(card)
        });

        if (response.ok) {
            globalCards.push(card);
            saveCards();
            fillCards();
            document.getElementById('productForm').reset();
        } else {
            alert('Ошибка при добавлении карточки');
        }
    } catch (error) {
        console.error('Error adding card:', error);
        alert('Произошла ошибка. Проверьте консоль для дополнительной информации');
    }
}

let toggle = true;
function editCard(event){
    const card = event.parentNode.parentNode;
    const artist = document.getElementById('artist');
    const name = document.getElementById('name');
    const info = document.getElementById('info');
    const url = document.getElementById('url');
    const id = document.getElementById('id');
    const album = document.getElementById('album');

    if (document.querySelectorAll('.card_active').length == 0){
        card.classList.add('card_active');  
        artist.value = card.querySelector('#card-artist').innerHTML;   
        name.value = card.querySelector('#card-name').innerHTML;
        info.value = card.querySelector('#card-info').innerHTML;
        url.value = card.querySelector('#card-url').src;
        id.value = card.querySelector('#card-id').innerHTML.replace('ID: ', '');
        album.value = card.querySelector('#card-album').innerHTML;              
        const Btns = document.querySelectorAll('.new-track__add-btn');
        Btns[0].classList.add('btn_hidden');
        Btns[1].classList.remove('btn_hidden');
    }
    else{
        if (Object.values(card.classList).indexOf('card_active') != -1){
            card.classList.remove('card_active');
        artist.value = '',
        name.value = '';
        url.value = '';
        info.value = '';
        id.value = '';
        album.value = '';          
        const Btns = document.querySelectorAll('.new-track__add-btn');
        Btns[0].classList.remove('btn_hidden');
        Btns[1].classList.add('btn_hidden');
        }
    }
}

async function changeCard() {
    document.querySelector(".loader").style.display = "flex";
    const card = document.querySelector('.card_active');
    const artist = document.getElementById('artist');
    const name = document.getElementById('name');
    const info = document.getElementById('info');
    const url = document.getElementById('url');
    const id = document.getElementById('id');
    const album = document.getElementById('album');
  
    try {
        const cardObj = {
            artist: artist.value,
            name: name.value,
            info: info.value,
            url: url.value,
            id: String(id.value),
            album: album.value,
        };

        await saveCard(cardObj);

        const index = globalCards.findIndex(elem => elem.id === cardObj.id);
        globalCards[index] = cardObj;
        fillCards();
        document.getElementById('productForm').reset();
        card.classList.remove('card_active'); 
        
    } catch (error) {
        console.error('Error changing card:', error);
    }
}

async function saveCard(cardObj) {
    try {
        const response = await fetch(`${API_URL}/items/${cardObj.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cardObj)
        });

        if (!response.ok) {
            console.error('Error saving card to server');
        }
    } catch (error) {
        console.error('Error saving card:', error);
    }
}


async function deleteCardScript() {
    const cards = document.querySelectorAll('.card');
  
    try {
      await Promise.all(
        Array.from(cards).map(async (elem, pos) => {
          if (elem.classList.contains('card_chosen')) {
            const id = elem.querySelector('#card-id').innerText.replace('ID: ', '');
            await deleteCard(id);
            globalCards.splice(pos, 1);
            pos--;
          }
        })
      );
  
      saveCards();
      fillCards();
    } catch (error) {
      console.error('Error deleting card:', error);
    }
}