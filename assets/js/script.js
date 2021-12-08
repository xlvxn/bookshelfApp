const localStorageKey = "KEY_BOOKSHELF"

const title = document.getElementById("inputBookTitle")
const author = document.getElementById("inputBookAuthor")
const year = document.getElementById("inputBookYear")
const readed = document.getElementById("inputBookIsComplete")
const buttonnSubmit = document.getElementById("bookSubmit")

window.addEventListener("load", function () {
    if (localStorage.getItem(localStorageKey) !== null) {
        const booksData = getData()
        showData(booksData)
    }
})

buttonnSubmit.addEventListener("click", function (e) {
    e.preventDefault()
    if (title.value != "" && author.value != "" && year.value != "") {
        const newBook = {
            id: +new Date(),
            title: title.value.trim(),
            author: author.value.trim(),
            year: year.value,
            isCompleted: readed.checked
        }
        insertData(newBook)

        title.value = ''
        author.value = ''
        year.value = ''
        readed.checked = false
    } else {
        alert("Semua kolom wajib diisi!")
    }
})

function getData() {
    return JSON.parse(localStorage.getItem(localStorageKey)) || []
}

function insertData(book) {
    let bookData = []

    if (localStorage.getItem(localStorageKey) === null) {
        localStorage.setItem(localStorageKey, 0);
    } else {
        bookData = JSON.parse(localStorage.getItem(localStorageKey))
    }

    bookData.unshift(book)
    localStorage.setItem(localStorageKey, JSON.stringify(bookData))

    showData(getData())
}

function showData(books = []) {
    const inCompleted = document.querySelector("#incompleteBookshelfList")
    const completed = document.querySelector("#completeBookshelfList")

    inCompleted.innerHTML = ''
    completed.innerHTML = ''

    books.forEach(book => {
        if (book.isCompleted == false) {
            let element = `
            <article class="book_item">
                <h3>${book.title}</h3>
                <p>Penulis: ${book.author}</p>
                <p>Tahun: ${book.year}</p>

                <div class="action">
                    <button class="green" onclick="readedBook('${book.id}')">Selesai dibaca</button>
                    <button class="blue" onclick="editBook('${book.id}')">Edit Buku</button>
                    <button class="red" onclick="deleteBook('${book.id}')">Hapus buku</button>
                </div>
            </article>
            `

            inCompleted.innerHTML += element
        } else {
            let element = `
            <article class="book_item">
                <h3>${book.title}</h3>
                <p>Penulis: ${book.author}</p>
                <p>Tahun: ${book.year}</p>

                <div class="action">
                    <button class="green" onclick="unreadedBook('${book.id}')">Belum selesai di Baca</button>
                    <button class="blue" onclick="editBook('${book.id}')">Edit Buku</button>
                    <button class="red" onclick="deleteBook('${book.id}')">Hapus buku</button>
                </div>
            </article>
            `
            completed.innerHTML += element
        }
    });
}