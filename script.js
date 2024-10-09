document.addEventListener("DOMContentLoaded", () => {
    const bookmarkNameInput = document.getElementById("bookmarkName");
    const bookmarkURLInput = document.getElementById("bookmarkURL");
    const addBookmarkButton = document.getElementById("addBookmarkButton");
    const bookmarkList = document.getElementById("bookmarkList");

    let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

    const renderBookmarks = () => {
        bookmarkList.innerHTML = "";
        bookmarks.forEach((bookmark, index) => {
            const li = document.createElement("li");
            const link = document.createElement("a");
            link.href = bookmark.url;
            link.textContent = bookmark.name;
            link.target = "_blank";

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Видалити";
            deleteButton.addEventListener("click", () => {
                bookmarks.splice(index, 1);
                localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
                renderBookmarks();
            });

            const editButton = document.createElement("button");
            editButton.textContent = "Редагувати";
            editButton.classList.add("edit");
            editButton.addEventListener("click", () => {
                const newName = prompt("Введіть нову назву:", bookmark.name);
                const newURL = prompt("Введіть новий URL:", bookmark.url);
                if (newName && newURL) {
                    bookmarks[index] = { name: newName, url: newURL };
                    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
                    renderBookmarks();
                }
            });

            li.appendChild(link);
            li.appendChild(editButton);
            li.appendChild(deleteButton);
            bookmarkList.appendChild(li);
        });
    };

    addBookmarkButton.addEventListener("click", () => {
        const name = bookmarkNameInput.value.trim();
        const url = bookmarkURLInput.value.trim();

        if (name === "" || url === "") {
            alert("Будь ласка, заповніть обидва поля.");
            return;
        }

        bookmarks.push({ name, url });
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

        bookmarkNameInput.value = "";
        bookmarkURLInput.value = "";

        renderBookmarks();
    });

    renderBookmarks();
});
