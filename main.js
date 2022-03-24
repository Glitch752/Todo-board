var lists = [];

function initLocalstorage() {
    if (localStorage.getItem('lists') == undefined) {
        localStorage.setItem('lists', JSON.stringify([]));
        lists = [];
    } else {
        lists = JSON.parse(localStorage.getItem('lists'));
    }
}

window.onload = function() {
    initLocalstorage();
    updateLists();
}

function updateLists() {
    var listsElem = document.getElementById('lists');
    listsElem.innerHTML = `<div class="new-list" onclick="createList()">+</div>`;
    for (var i = 0; i < lists.length; i++) {
        listsElem.innerHTML += `<div class="list">
            <div class="list-icons">
                <svg onclick="deleteList(${i})" class="list-icon delete" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z"/></svg>
            </div>
            <div class="list-name" onclick="openList(${i})">${lists[i].name}</div>
        </div>`;
    }
}

function createList() {
    var list = {
        name: 'New List',
        categories: [
            { name: "To Do", items: [] },
            { name: "In Progress", items: [] },
            { name: "Done", items: [] }
        ]
    };
    lists.push(list);
    saveData();
    updateLists();
}
function deleteList(index) {
    lists.splice(index, 1);
    saveData();
    updateLists();
}

function openList(index) {
    var list = lists[index];
    var listElem = document.getElementById('list');
    listElem.style.display = "inline-block";
    listElem.innerHTML = `
        <div class="close-list" onclick="closeList()">X</div>
        <div class="list-name">${list.name}</div>`;
    for (var i = 0; i < list.categories.length; i++) {
        listElem.innerHTML += `<div class="category">
            <div class="category-name">${list.categories[i].name}</div>
            <div class="category-items">
                <div class="new-item" onclick="createItem(${index}, ${i})">+</div>
            </div>
        </div>`;
        for (var j = 0; j < list.categories[i].items.length; j++) {
            listElem.innerHTML += `<div class="item">
                <div class="item-name">${list.categories[i].items[j]}</div>
                <div class="item-icons">
                    <svg onclick="deleteItem(${index}, ${i}, ${j})" class="item-icon delete" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"/></svg>
                </div>
            </div>`;
        }
    }
}

function closeList() {
    var listElem = document.getElementById('list');
    listElem.style.display = "none";
}

function saveData() {
    localStorage.setItem('lists', JSON.stringify(lists));
}