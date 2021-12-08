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
        if (buttonnSubmit.innerHTML != "Edit buku") {
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
            const bookData = getData().filter(a => a.id != buttonnSubmit.value);
            localStorage.setItem(localStorageKey, JSON.stringify(bookData))

            const newBook = {
                id: buttonnSubmit.value,
                title: title.value.trim(),
                author: author.value.trim(),
                year: year.value,
                isCompleted: readed.checked
            }
            insertData(newBook)
            buttonnSubmit.innerHTML = "Masukkan Buku ke rak"
            buttonnSubmit.value = ''
            title.value = ''
            author.value = ''
            year.value = ''
            readed.checked = false
            alert("Buku telah berhasil diedit")
        }
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
                    <button class="blue" onclick="updateBook('${book.id}')">Edit Buku</button>
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
                    <button class="blue" onclick="updateBook('${book.id}')">Edit Buku</button>
                    <button class="red" onclick="deleteBook('${book.id}')">Hapus buku</button>
                </div>
            </article>
            `
            completed.innerHTML += element
        }
    });
}

function readedBook(id) {
    let messageALert = confirm("Pindahkan buku ke bagian selesai dibaca?")

    if (messageALert == true) {
        const bookDetail = getData().filter(a => a.id == id);
        const newBook = {
            id: bookDetail[0].id,
            title: bookDetail[0].title,
            author: bookDetail[0].author,
            year: bookDetail[0].year,
            isCompleted: true
        }

        const bookData = getData().filter(a => a.id != id);
        localStorage.setItem(localStorageKey, JSON.stringify(bookData))

        insertData(newBook)
    } else {
        return 0
    }
}

function unreadedBook(id) {
    let messageALert = confirm("Pindahkan buku ke bagian belum selesai dibaca?")

    if (messageALert == true) {
        const bookDetail = getData().filter(a => a.id == id);
        const newBook = {
            id: bookDetail[0].id,
            title: bookDetail[0].title,
            author: bookDetail[0].author,
            year: bookDetail[0].year,
            isCompleted: false
        }

        const bookData = getData().filter(a => a.id != id);
        localStorage.setItem(localStorageKey, JSON.stringify(bookData))

        insertData(newBook)
    } else {
        return 0
    }
}

function updateBook(id) {
    const bookDetail = getData().filter(a => a.id == id);
    title.value = bookDetail[0].title
    author.value = bookDetail[0].author
    year.value = bookDetail[0].year
    bookDetail[0].isCompleted ? readed.checked = true : readed.checked = false

    buttonnSubmit.innerHTML = "Edit buku"
    buttonnSubmit.value = bookDetail[0].id
}

function deleteBook(id) {
    let messageALert = confirm("Yakin akan menghapusnya?")

    if (messageALert == true) {
        const bookDetail = getData().filter(a => a.id == id);
        const bookData = getData().filter(a => a.id != id);
        localStorage.setItem(localStorageKey, JSON.stringify(bookData))
        showData(getData())
        alert(`Buku dengan judul ${bookDetail[0].title} penulis ${bookDetail[0].author} telah terhapus`)
    } else {
        return 0
    }
}