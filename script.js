const addBookmarkBtn = document.getElementById("add-bookmark");
const bookmarkList = document.getElementById("bookmark-list");
const bookmarkNameInput = document.getElementById("bookmark-name");
const bookmarkUrlInput = document.getElementById("bookmark-url");

document.addEventListener("DOMContentLoaded", loadBookmarks);

addBookmarkBtn.addEventListener("click", function () {
  const name = bookmarkNameInput.value.trim();
  const url = bookmarkUrlInput.value.trim();

  if (!name || !url) {
    alert("please enter both name and URL.");
    return;
  } else {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      alert("please enter a valid URL starting with http:// or https://");
      return;
    }

    const dateAdded = new Date().toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
    });

    addBookmark(name, url, dateAdded);
    saveBookmark(name, url, dateAdded);
    bookmarkNameInput.value = "";
    bookmarkUrlInput.value = "";
  }
});

function addBookmark(name, url, dateAdded) {
  const li = document.createElement("li");

  const content = document.createElement("div");
  content.classList.add("bookmark-content");

  const link = document.createElement("a");
  link.href = url;
  link.textContent = name;
  link.target = "_blank";

  const date = document.createElement("small");
  date.textContent = `added on: ${dateAdded}`;
  date.classList.add("bookmark-date");

  content.appendChild(link);
  content.appendChild(date);

  const removeButton = document.createElement("button");
  removeButton.textContent = "remove";
  removeButton.addEventListener("click", function () {
    bookmarkList.removeChild(li);
    removeBookmarkFromStorage(name, url);
  });

  li.appendChild(content);
  li.appendChild(removeButton);

  bookmarkList.appendChild(li);
}

function getBookmarksFromStorage() {
  const bookmarks = localStorage.getItem("bookmarks");
  return bookmarks ? JSON.parse(bookmarks) : [];
}

function saveBookmark(name, url, dateAdded) {
  const bookmarks = getBookmarksFromStorage();
  bookmarks.push({ name, url, dateAdded });
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function loadBookmarks() {
  const bookmarks = getBookmarksFromStorage();
  bookmarks.forEach((bookmark) => {
    const date = bookmark.dateAdded || "unknown";
    addBookmark(bookmark.name, bookmark.url, date);
  });
}

function removeBookmarkFromStorage(name, url) {
  let bookmarks = getBookmarksFromStorage();
  bookmarks = bookmarks.filter((bookmark) => bookmark.name !== name || bookmark.url !== url);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}
