let booksDiv = document.querySelector(".books")
let fetchAddress = "https://wjs-api.vercel.app/api/books";

async function getInfo(fetchAddress) {
    let response = await fetch(fetchAddress)
    return await response.json()
}

async function loadSite(fetchAddress) {

    let data = await getInfo(fetchAddress)

    data.forEach(item => {
        let singleBookDiv = document.createElement("div")
        singleBookDiv.classList.add("singleBook")

        let title = document.createElement("span")
        title.innerText = item.title

        let id = document.createElement("span")
        id.innerText = `ID ${item._id}`

        let detailsButton = document.createElement("button")
        detailsButton.innerText = "Click me for details!"

        detailsButton.addEventListener("click", () => {
            booksDiv.innerText = ""
            loadDetail(`https://wjs-api.vercel.app/api/books/${item._id}`)

        })

        singleBookDiv.append(title)
        singleBookDiv.append(id)
        singleBookDiv.append(detailsButton)
        booksDiv.append(singleBookDiv)

    })
}

async function loadDetail(fetchAddress) {

    let book = await getInfo(fetchAddress)

    let singleBookDiv = document.createElement("div")
    singleBookDiv.classList.add("singleBook")

    let title = document.createElement("span")
    title.innerText = book.title

    let id = document.createElement("span")
    id.innerText = `ID: ${book._id}`

    let pageCount = document.createElement("span")
    pageCount.innerText = `Page Count: ${book.pageCount}`

    let status = document.createElement("span")
    status.innerText = `Status: ${book.status}`

    let goBackButton = document.createElement("button")
    goBackButton.innerText = "Go Back"

    goBackButton.addEventListener("click", () => {
        booksDiv.innerText = ""
        loadSite("https://wjs-api.vercel.app/api/books")
    })


    singleBookDiv.append(title)
    singleBookDiv.append(id)
    singleBookDiv.append(pageCount)
    singleBookDiv.append(status)
    singleBookDiv.append(goBackButton)
    booksDiv.append(singleBookDiv)

}

let searchInput = document.querySelector(".search")

searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        booksDiv.innerText = ""
        loadSite(`https://wjs-api.vercel.app/api/books?search=${searchInput.value}`)
    }
})

loadSite(fetchAddress)

