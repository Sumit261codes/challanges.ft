// ==========================================
// CHALLENGE 3
// RECENTLY VIEWED PRODUCTS
// ==========================================


// ==========================================
// GET ALL PRODUCTS FROM DATA
// ==========================================

let allProducts = [];


for (let i = 0; i < storeData.categories.length; i++) {

    let category =
        storeData.categories[i];


    for (
        let j = 0;
        j < category.subcategories.length;
        j++
    ) {

        let subcategory =
            category.subcategories[j];


        for (
            let k = 0;
            k < subcategory.products.length;
            k++
        ) {

            let product =
                subcategory.products[k];


            allProducts.push(product);
        }
    }
}


console.log(
    "Total products:",
    allProducts.length
);


// ==========================================
// RECENT HISTORY
// ==========================================

// Array maintains the order

let recentHistory = [];


// Set provides fast lookup

let recentSet = new Set();


// Maximum history

const MAX_HISTORY = 5;


// ==========================================
// DISPLAY ALL PRODUCTS
// ==========================================

function displayProducts() {

    let productList =
        document.getElementById("productList");


    productList.innerHTML = "";


    for (
        let i = 0;
        i < allProducts.length;
        i++
    ) {

        let product =
            allProducts[i];


        let card =
            document.createElement("div");


        card.className = "card";


        card.innerHTML = `

            <h3>
                ${product.name}
            </h3>

            <div class="price">
                ₹${product.price.toLocaleString("en-IN")}
            </div>

            <div class="brand">
                Brand: ${product.brand}
            </div>

            <div class="rating">
                ⭐ ${product.rating}
            </div>

            <button class="view-button">
                View Product
            </button>

        `;


        let button =
            card.querySelector(".view-button");


        button.addEventListener(
            "click",
            function() {

                viewProduct(product);

            }
        );


        productList.appendChild(card);
    }
}


// ==========================================
// VIEW PRODUCT
// ==========================================

function viewProduct(product) {

    console.log(
        "Viewing:",
        product.name
    );


    // Add product to history

    addToHistory(product);


    // Show product modal

    showProductModal(product);
}


// ==========================================
// ADD PRODUCT TO HISTORY
// ==========================================

function addToHistory(product) {

    let productId = product.id;


    // --------------------------------------
    // If product already exists
    // --------------------------------------

    if (recentSet.has(productId)) {

        // Remove old position

        recentHistory =
            recentHistory.filter(
                function(item) {

                    return item.id !== productId;

                }
            );

    }


    // --------------------------------------
    // Put product at the beginning
    // --------------------------------------

    recentHistory.unshift(product);


    // Add to Set

    recentSet.add(productId);


    // --------------------------------------
    // Limit history to 5
    // --------------------------------------

    if (
        recentHistory.length >
        MAX_HISTORY
    ) {

        let removedProduct =
            recentHistory.pop();


        recentSet.delete(
            removedProduct.id
        );

    }


    console.log(
        "Recent History:",
        recentHistory
    );


    displayRecentProducts();
}


// ==========================================
// DISPLAY RECENTLY VIEWED
// ==========================================

function displayRecentProducts() {

    let container =
        document.getElementById(
            "recentProducts"
        );


    container.innerHTML = "";


    // Empty state

    if (
        recentHistory.length === 0
    ) {

        container.innerHTML = `
            <div class="empty-message">
                No recently viewed products.
            </div>
        `;

        return;
    }


    // Display newest first

    for (
        let i = 0;
        i < recentHistory.length;
        i++
    ) {

        let product =
            recentHistory[i];


        let card =
            document.createElement("div");


        card.className =
            "recent-card";


        card.innerHTML = `

            <h3>
                ${product.name}
            </h3>

            <p>
                ₹${product.price.toLocaleString("en-IN")}
            </p>

            <p>
                ⭐ ${product.rating}
            </p>

            <button>
                View Again
            </button>

        `;


        card
            .querySelector("button")
            .addEventListener(
                "click",
                function() {

                    viewProduct(product);

                }
            );


        container.appendChild(card);
    }
}


// ==========================================
// PRODUCT MODAL
// ==========================================

function showProductModal(product) {

    document.getElementById(
        "modalName"
    ).textContent =
        product.name;


    document.getElementById(
        "modalBrand"
    ).textContent =
        "Brand: " + product.brand;


    document.getElementById(
        "modalPrice"
    ).textContent =
        "Price: ₹" +
        product.price.toLocaleString("en-IN");


    document.getElementById(
        "modalRating"
    ).textContent =
        "Rating: ⭐ " +
        product.rating;


    document.getElementById(
        "productModal"
    ).style.display =
        "flex";
}


// ==========================================
// CLOSE MODAL
// ==========================================

document
    .getElementById("closeModal")
    .addEventListener(
        "click",
        function() {

            document.getElementById(
                "productModal"
            ).style.display =
                "none";

        }
    );


// ==========================================
// CLICK OUTSIDE MODAL
// ==========================================

document
    .getElementById("productModal")
    .addEventListener(
        "click",
        function(event) {

            if (
                event.target ===
                document.getElementById(
                    "productModal"
                )
            ) {

                document.getElementById(
                    "productModal"
                ).style.display =
                    "none";
            }

        }
    );


// ==========================================
// REMOVE HISTORY
// ==========================================

document
    .getElementById(
        "removeHistoryButton"
    )
    .addEventListener(
        "click",
        function() {

            recentHistory = [];

            recentSet.clear();


            displayRecentProducts();

        }
    );


// ==========================================
// INITIAL DISPLAY
// ==========================================

displayProducts();

displayRecentProducts();