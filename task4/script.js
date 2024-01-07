let globalCards = localStorage.getItem('cards') ? JSON.parse(localStorage.getItem('cards')) : [];
console.log(globalCards);

function saveCards(){
    localStorage.removeItem('cards');
    localStorage.setItem('cards', JSON.stringify(globalCards));
}

function fillCards() {
    const showcase = document.querySelector('.showcase__inner');

    showcase.innerHTML = '';
    globalCards.forEach(elem => {
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
}
fillCards();
function setUpStartCards(){
    cards = [
        {
            artist: 'Metallica',
            name: 'Fade To Black',
            info: '1984',
            url: 'https://sun9-21.userapi.com/impf/IPJ50Z9sE4vsmzN1tpYRbq3MC4nEiRA7HHwkrg/O1dC61SCWhg.jpg?size=673x662&quality=96&sign=6b22371ca3930900b51d6d631ead6363&type=album',
            id: 0,
            album: 'Ride The Ligthning'
        },
        {
            artist: 'Aerosmith',
            name: 'Dream On',
            info: '1973',
            url: 'https://sun9-50.userapi.com/impf/swL6d6bH_9cfZhItXSz9UycgvlcpmcGiRxhUfg/KJb0MdspMXY.jpg?size=714x760&quality=96&sign=8f225fcbe7fefbba00a5b39a5afe543d&type=album',
            id: 1,
            album: 'Aerosmith'
        },
        {
            artist: 'Led Zeppelin',
            name: 'Immigrant Song',
            info: '1970',
            url: 'https://sun9-67.userapi.com/impf/RGpMmI35x4m9lhXWoyMo_hU0rCyl2LQY3jZKbA/x5N95rgDfk4.jpg?size=647x647&quality=96&sign=8002f50634b96954c8d60af0c48c9640&type=album',
            id: 2,
            album: 'Led Zeppelin III'
        },
        {
            artist: 'The Rolling Stones',
            name: 'Paint It Black',
            info: '1966',
            url: 'https://sun9-54.userapi.com/impf/Ih6s5Y7US0kKDdIB0WP8SghuV7Z_jkU3FnJqkQ/aD27OMNT3LE.jpg?size=701x693&quality=96&sign=219c64cf075be6f095c9a3dffbda0e5f&type=album',
            id: 3,
            album: 'Aftermath'
        },
        {
            artist: 'The Animals',
            name: 'The House Of The Rising Sun',
            info: '1964',
            url: 'https://sun9-67.userapi.com/impf/G6lPxdtDaKMxxpqVpXLpTGCtM-6Dz4ITwbxoPQ/4J1HGMRGELw.jpg?size=693x735&quality=96&sign=32f1d62d49563729f3a8588921ec745f&type=album',
            id: 4,
            album: 'The Animals'
        }
        
    ];
    globalCards = cards;
    saveCards();   
    fillCards();   
}

function addCard(){
    const artist = document.getElementById('artist').value;
    const name = document.getElementById('name').value;
    const info = document.getElementById('info').value;
    let url = document.getElementById('url').value;
    const id = Number(document.getElementById('id').value);
    const album = document.getElementById('album').value;
    if (artist == ''){
        alert('Поле "Исполнитель" должно быть заполнено');
        return;
    }
    if (name == ''){
        alert('Поле "Название" должно быть заполнено');
        return;
    }
    if (id  == ''){
        alert('Поле "Код трека" должно быть заполнено');
        return;
    }
    if (album == ''){
        alert('Поле "Альбом" должно быть заполнено');
        return;
    }
    const card = {
        artist: artist,
        name: name,
        info: info,
        url: url,
        id: id,
        album: album
    };
    globalCards.push(card);   
    saveCards();
    fillCards();
    document.getElementById('productForm').reset();
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

function changeCard(){
    const card = document.querySelector('.card_active');
    const showcase = document.querySelector('.showcase__inner');
    const cards = showcase.querySelectorAll('.card');
    const artist = document.getElementById('artist');
    const name = document.getElementById('name');
    const info = document.getElementById('info');
    const url = document.getElementById('url');
    const id = document.getElementById('id');
    const album = document.getElementById('album');
    console.log(globalCards);
    let pos = 0;
    cards.forEach(elem => {      
        if (Object.values(elem.classList).indexOf('card_active') != -1){
            const cardObj = {
                artist: artist.value,
                name: name.value,
                info: info.value,
                url: url.value,
                id: Number(id.value),
                album: album.value
            };         
            globalCards[pos].artist = cardObj.artist;
            globalCards[pos].name = cardObj.name;
            globalCards[pos].info = cardObj.info;
            globalCards[pos].url = cardObj.url;
            globalCards[pos].id = cardObj.id;
            globalCards[pos].album = cardObj.album;
            console.log(globalCards);
            saveCards();
        }
        pos++;
    });  
    card.querySelector('#card-artist').innerHTML = artist.value;
    card.querySelector('#card-name').innerHTML = name.value;
    card.querySelector('#card-info').innerHTML = info.value;
    card.querySelector('#card-url').src = url.value;
    card.querySelector('#card-id').innerHTML = `ID: ${id.value}`;
    card.querySelector('#card-album').innerHTML = album.value;
    const Btns = document.querySelectorAll('.new-track__add-btn');
    Btns[0].classList.remove('btn_hidden');
    Btns[1].classList.add('btn_hidden');
    document.getElementById('productForm').reset();

}

function deleteCardScript() {
    const chosenCards = document.querySelectorAll('.card_chosen');

    chosenCards.forEach(card => {
        const cardId = card.querySelector('#card-id').innerHTML.replace('ID: ', '');
        globalCards = globalCards.filter(elem => elem.id !== Number(cardId));
    });

    chosenCards.forEach(card => {
        card.classList.remove('card_chosen');
    });

    saveCards();
    fillCards();
}