let searchBar = document.querySelector("#searchBar");
let searchclick = document.querySelector(".searchclick");
let recipemain = document.querySelector(".recipemain");
let searching = document.querySelector(".searching");
let recipeContentBox = document.querySelector(".recipeContentBox");
let recipebookmark = document.querySelector(".recipebookmark"); 
let bookmarkData = JSON.parse(localStorage.getItem("meal")) || [];

const showBookmark = () => {
    bookmarkData.forEach(e => {
        let bookbox = document.createElement("div")

        bookbox.classList.add("box");
        bookbox.innerHTML += `
            <img src="${e.image}" alt="">
            <h4>${e.name}</h4>
            <p>${e.category}</p>
        `;

        recipebookmark.appendChild(bookbox);
    })
}

showBookmark()

const bookmarkFun = (bookpara) => {
    const bookobj = {
        id: bookpara.idMeal,
        image: bookpara.strMealThumb,
        name: bookpara.strMeal,
        category: bookpara.strCategory,
    }

    bookmarkData.push(bookobj);
    console.log(bookmarkData);

    localStorage.setItem("meal",JSON.stringify(bookmarkData))
}

const ingredientsfun = (detail) => {
    let ingrdientlist = "";
    for(let i=1;i<=20;i++){
        const ingredient = detail[`strIngredient${i}`];
        if(ingredient){
            const measure = detail[`strMeasure${i}`];
            ingrdientlist += `<p>${measure}: ${ingredient}</p>`;
        }
        else{
            break;
        }
    }
    return ingrdientlist;
}

const showDetail = (detail) => {
    recipeContentBox.style.display = "block";
    recipeContentBox.innerHTML = `
    <div class="recipeContent">
        <div class="box">
            <i class="fa-solid fa-times"></i>
            <h3>${detail.strMeal}</h3>
            <p>Instructions:</br> 
                ${detail.strInstructions}
            </p>
            <p></br>
            Ingredients:
                ${ingredientsfun(detail)}
            </p>
            <button class="book">Bookmark</button>
        </div>
    </div>
    `;
    let book = recipeContentBox.querySelector(".book");

    book.addEventListener("click", () => bookmarkFun(detail));

    let closeBox = recipeContentBox.querySelector(".fa-times");
    closeBox.addEventListener("click", () => recipeContentBox.style.display = "none")
}

const recipeApi = async (search) => {
    searching.innerHTML = 'searching...'
    const recipeUrl = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
    const recipeJson = await recipeUrl.json();
    searchBar.value = '';
    let showmeals = recipeJson.meals;
    searching.innerHTML = '';

    showmeals.forEach(element => {
        let box = document.createElement("div");
        box.classList.add("box");

        box.innerHTML += `
            <img src="${element.strMealThumb}" alt="">
            <h4>${element.strMeal}</h4>
            <p>${element.strCategory}</p>
        `;

        box.addEventListener("click", () => showDetail(element));
        recipemain.appendChild(box)
    });
}

searchclick.addEventListener("click", (e) => {
    e.preventDefault();
    let searchValue = searchBar.value.trim();
    recipeApi(searchValue);
})