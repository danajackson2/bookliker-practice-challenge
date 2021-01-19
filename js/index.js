getBooks()

//Definitions
let selectedBook = {}

//Fetches
function getBooks(){
    fetch('http://localhost:3000/books')
    .then(resp => resp.json())
    .then(data => renderBookList(data))
}

function getBook(e){
    fetch(`http://localhost:3000/books/${e.target.id}`)
    .then(resp => resp.json())
    .then(data => renderBook(data))
}

function like(){
    fetch(`http://localhost:3000/books/${selectedBook.id}`, {
        method : 'PATCH',
        headers : {'content-type' : 'application/json'},
        body : JSON.stringify({
            title : selectedBook.title,
            subtitle : selectedBook.subtitle,
            description : selectedBook.description,
            author : selectedBook.author,
            img_url : selectedBook.img_url,
            users : selectedBook.users.concat({"id":1, "username":"pouros"})
        })
    })
    .then(resp => resp.json())
    .then(data => renderBook(data))
}

function unlike(){
    fetch(`http://localhost:3000/books/${selectedBook.id}`, {
        method : 'PATCH',
        headers : {'content-type' : 'application/json'},
        body : JSON.stringify({
            title : selectedBook.title,
            subtitle : selectedBook.subtitle,
            description : selectedBook.description,
            author : selectedBook.author,
            img_url : selectedBook.img_url,
            users : selectedBook.users.filter(item => item.id != 1)
        })
    })
    .then(resp => resp.json())
    .then(data => renderBook(data))
}

//DOM Changes
function renderBookList(books){
    let panel = document.getElementById('list-panel')
    panel.innerHTML = ""
    books.forEach(book => {
        let li = document.createElement('li')
        li.textContent = book.title
        li.id = book.id
        li.addEventListener('click', getBook)
        panel.appendChild(li)
    })
}

function renderBook(data){
    selectedBook = data
    let showDiv = document.getElementById('show-panel')
    showDiv.innerHTML = ""
    let img = document.createElement('img')
    img.src = data.img_url
    showDiv.appendChild(img)
    let title = document.createElement('h4')
    title.textContent = data.title
    showDiv.appendChild(title)
    let subtitle = document.createElement('h4')
    subtitle.textContent = data.subtitle
    showDiv.appendChild(subtitle)
    let author = document.createElement('h4')
    author.textContent = data.author
    showDiv.appendChild(author)
    let description = document.createElement('p')
    description.textContent = data.description
    showDiv.appendChild(description)
    let userList = document.createElement('ul')
    showDiv.appendChild(userList)
    if (data.users.length != 0) {
        data.users.forEach(user => {
            let li = document.createElement('li')
            li.textContent = user.username
            userList.appendChild(li)
        })
    }
    let btn = document.createElement('button')
    if (selectedBook.users.length === 0){
        btn.textContent = "like"
    } else {
        if (selectedBook.users.find(user => user.id === 1)){
            btn.textContent = "unlike"
        } else {
            btn.textContent = "like"
        }
    }
    btn.addEventListener('click', likeBtn)
    showDiv.appendChild(btn)
}

//Event Handlers
function likeBtn(e){
    if (e.target.textContent === "like") {
            e.target.textContent = "unlike"
            like()
        } else {
            e.target.textContent = "like"
            unlike()
        }
}


//Event Listeners