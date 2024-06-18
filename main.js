document.addEventListener("DOMContentLoaded", () => {
    const inputBookForm = document.getElementById("inputBook");
    const inputBookTitle = document.getElementById("inputBookTitle");
    const inputBookAuthor = document.getElementById("inputBookAuthor");
    const inputBookYear = document.getElementById("inputBookYear");
    const inputBookIsComplete = document.getElementById("inputBookIsComplete");

    const incompleteBookshelfList = document.getElementById("incompleteBookshelfList");
    const completeBookshelfList = document.getElementById("completeBookshelfList");

    const BOOKS_KEY = "BOOKSHELF_APPS";
    let books = JSON.parse(localStorage.getItem(BOOKS_KEY)) || [];

    const saveBooksToLocalStorage = () => {
        localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
    };

    const createBookElement = (book) => {
        const bookItem = document.createElement("article");
        bookItem.classList.add("book_item");

        const bookTitle = document.createElement("h3");
        bookTitle.innerText = book.title;

        const bookAuthor = document.createElement("p");
        bookAuthor.innerText = `Penulis: ${book.author}`;

        const bookYear = document.createElement("p");
        bookYear.innerText = `Tahun: ${book.year}`;

        const actionContainer = document.createElement("div");
        actionContainer.classList.add("action");

        const toggleButton = document.createElement("button");
        toggleButton.classList.add("green");
        toggleButton.innerText = book.isComplete ? "Belum selesai dibaca" : "Selesai dibaca";
        toggleButton.addEventListener("click", () => {
            book.isComplete = !book.isComplete;
            renderBooks();
            saveBooksToLocalStorage();
        });

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("red");
        deleteButton.innerText = "Hapus buku";
        deleteButton.addEventListener("click", () => {
            books = books.filter(b => b.id !== book.id);
            renderBooks();
            saveBooksToLocalStorage();
        });

        actionContainer.appendChild(toggleButton);
        actionContainer.appendChild(deleteButton);

        bookItem.appendChild(bookTitle);
        bookItem.appendChild(bookAuthor);
        bookItem.appendChild(bookYear);
        bookItem.appendChild(actionContainer);

        return bookItem;
    };

    const renderBooks = () => {
        incompleteBookshelfList.innerHTML = "";
        completeBookshelfList.innerHTML = "";

        books.forEach(book => {
            const bookElement = createBookElement(book);
            if (book.isComplete) {
                completeBookshelfList.appendChild(bookElement);
            } else {
                incompleteBookshelfList.appendChild(bookElement);
            }
        });
    };

    inputBookForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const newBook = {
            id: +new Date(),
            title: inputBookTitle.value.trim(),
            author: inputBookAuthor.value.trim(),
            year: parseInt(inputBookYear.value.trim()),
            isComplete: inputBookIsComplete.checked
        };

        if (newBook.title && newBook.author && !isNaN(newBook.year)) {
            books.push(newBook);
            renderBooks();
            saveBooksToLocalStorage();

            inputBookTitle.value = "";
            inputBookAuthor.value = "";
            inputBookYear.value = "";
            inputBookIsComplete.checked = false;
        } else {
            alert("Semua bidang harus diisi dengan benar.");
        }
    });

    renderBooks();
});
