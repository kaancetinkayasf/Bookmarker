const addBookmarkButton = document.getElementById('title');
const modalContainer = document.getElementById('modal-container');
const modal = document.getElementById('modal');
const modalForm = document.getElementById('modal-form');
const modalCloseButton = document.getElementById('modal-close-button');
const websiteNameInput = document.getElementById('website-name');
const websiteUrlInput = document.getElementById('website-url');
const submitButton = document.getElementById('submit');
const boookmarkContainer = document.getElementById('bookmark-container');


let bookmarks = [];



function deleteBookmarks(url) {
    bookmarks.forEach((bookmark, i) => {
        if (bookmark.url === url) {
            bookmarks.splice(i, 1);
        }
    });
    // Uptade bookmarks array in localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();

}

function fetchBookmarks() {
    if (localStorage.getItem('bookmarks')) {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    } else {
        bookmark = [
            {
                name: 'Github',
                url: 'www.github.com'
            },
        ];
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    console.log(bookmarks);
    buildBookmarks();
}

function buildBookmarks() {
    boookmarkContainer.textContent = '';
    bookmarks.forEach((bookmark) => {

        const { name, url } = bookmark;
        let itemE = document.createElement('div');
        itemE.setAttribute('class', 'item');

        let nameE = document.createElement('div');
        nameE.setAttribute('class', 'name');

        let a = document.createElement('a');
        a.setAttribute('href', `${url}`);
        a.setAttribute('target', '_blank');
        a.textContent = name;

        let icon = document.createElement('i');
        icon.setAttribute('class', 'fas fa-times');
        icon.setAttribute('onclick', `deleteBookmarks('${url}')`);

        nameE.append(a, icon);
        itemE.append(nameE);
        boookmarkContainer.appendChild(itemE);
    });




}



// SUBMIT USER INPUT
function validateInputs(e) {
    e.preventDefault();
    let websiteName = websiteNameInput.value;
    let websiteUrl = websiteUrlInput.value;



    if (!websiteName || !websiteUrl) {
        alert('One of more inputs are empty');
        return false;
    }

    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    let regex = new RegExp(expression);

    if (!websiteUrl.includes('https://', 'http://')) {
        websiteUrl = `https://${websiteUrl}`;
    }

    if (!websiteUrl.match(regex)) {
        alert('invalid url');
        return false;
    }

    const bookmark = {
        name: websiteName,
        url: websiteUrl
    }

    bookmarks.push(bookmark);

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    modalForm.reset();
    fetchBookmarks();
}

// HIDE MODAL WHEN USER CLICKS CLOSE ICON
modalCloseButton.addEventListener('click', () => {
    modalContainer.classList.remove('show-modal');
})


// SHOW MODAL WHEN ADD BOOKMARK BUTTON CLICKED
addBookmarkButton.addEventListener('click', () => {
    modalContainer.classList.add('show-modal');
})

modalForm.addEventListener('submit', validateInputs);

// On load 
fetchBookmarks();