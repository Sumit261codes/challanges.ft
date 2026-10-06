// ==========================================
// CHALLENGE 5
// PERSONALIZED RECOMMENDATIONS
// ==========================================


// ==========================================
// GET ALL PRODUCTS
// ==========================================

let allProducts = [];


for (
    let i = 0;
    i < storeData.categories.length;
    i++
) {

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

            allProducts.push(
                subcategory.products[k]
            );

        }
    }
}


console.log(
    "Total products:",
    allProducts.length
);


// ==========================================
// SIMULATED USER ACTIVITY
// ==========================================
//
// Each array contains product IDs that
// the user has viewed.
//
// ==========================================

let userActivity = [

    {
        user: "User A",

        products: [
            1,
            3,
            4,
            6
        ]
    },

    {
        user: "User B",

        products: [
            1,
            3,
            5,
            4
        ]
    },

    {
        user: "User C",

        products: [
            1,
            3,
            6,
            8
        ]
    },

    {
        user: "User D",

        products: [
            2,
            3,
            4,
            6
        ]
    },

    {
        user: "User E",

        products: [
            1,
            4,
            6,
            7
        ]
    }

];


// ==========================================
// CURRENT USER
// ==========================================

let currentUserViewed = [];


// ==========================================
// FIND PRODUCT BY ID
// ==========================================

function findProductById(id) {

    for (
        let i = 0;
        i < allProducts.length;
        i++
    ) {

        if (
            allProducts[i].id === id
        ) {

            return allProducts[i];

        }
    }


    return null;
}


// ==========================================
// SHOW PRODUCTS FOR CURRENT USER
// ==========================================

function displayCurrentUserProducts() {

    let container =
        document.getElementById(
            "currentUserProducts"
        );


    container.innerHTML = "";


    // Show first 10 products

    let limit =
        Math.min(
            10,
            allProducts.length
        );


    for (
        let i = 0;
        i < limit;
        i++
    ) {

        let product =
            allProducts[i];


        let button =
            document.createElement("button");


        button.className =
            "current-product";


        button.textContent =
            product.name;


        button.addEventListener(
            "click",
            function() {

                viewProduct(product);

            }
        );


        container.appendChild(button);

    }
}


// ==========================================
// CURRENT USER VIEWS PRODUCT
// ==========================================

function viewProduct(product) {

    // Avoid duplicate viewed products

    if (
        !currentUserViewed.includes(
            product.id
        )
    ) {

        currentUserViewed.push(
            product.id
        );

    }


    console.log(
        "Current user viewed:",
        product.name
    );


    displayViewedProducts();


    generateRecommendations(
        product.id
    );
}


// ==========================================
// GENERATE RECOMMENDATIONS
// ==========================================

function generateRecommendations(
    productId
) {

    // --------------------------------------
    // Product frequency
    // --------------------------------------

    let recommendationCount = {};


    // --------------------------------------
    // Find users who viewed current product
    // --------------------------------------

    for (
        let i = 0;
        i < userActivity.length;
        i++
    ) {

        let user =
            userActivity[i];


        if (
            user.products.includes(
                productId
            )
        ) {

            // This user viewed the product

            for (
                let j = 0;
                j < user.products.length;
                j++
            ) {

                let otherProductId =
                    user.products[j];


                // Don't recommend the
                // current product itself

                if (
                    otherProductId ===
                    productId
                ) {

                    continue;

                }


                // Don't recommend products
                // already viewed by current user

                if (
                    currentUserViewed.includes(
                        otherProductId
                    )
                ) {

                    continue;

                }


                // Count frequency

                if (
                    recommendationCount[
                        otherProductId
                    ] === undefined
                ) {

                    recommendationCount[
                        otherProductId
                    ] = 1;

                } else {

                    recommendationCount[
                        otherProductId
                    ]++;

                }

            }
        }
    }


    // ======================================
    // Convert object to array
    // ======================================

    let recommendations = [];


    for (
        let id in recommendationCount
    ) {

        let product =
            findProductById(
                Number(id)
            );


        if (product !== null) {

            recommendations.push({

                product: product,

                count:
                    recommendationCount[id]

            });

        }
    }


    // ======================================
    // Sort by frequency
    // ======================================

    recommendations.sort(
        function(a, b) {

            return b.count - a.count;

        }
    );


    // ======================================
    // TOP 3
    // ======================================

    recommendations =
        recommendations.slice(0, 3);


    displayRecommendations(
        recommendations,
        productId
    );
}


// ==========================================
// DISPLAY RECOMMENDATIONS
// ==========================================

function displayRecommendations(
    recommendations,
    productId
) {

    let container =
        document.getElementById(
            "recommendations"
        );


    container.innerHTML = "";


    let currentProduct =
        findProductById(
            productId
        );


    if (
        recommendations.length === 0
    ) {

        container.innerHTML = `

            <div class="empty-message">

                No new recommendations
                available.

            </div>

        `;


        document.getElementById(
            "recommendationReason"
        ).textContent =
            "No products found to recommend.";


        return;
    }


    document.getElementById(
        "recommendationReason"
    ).textContent =
        "Because you viewed " +
        currentProduct.name;


    for (
        let i = 0;
        i < recommendations.length;
        i++
    ) {

        let recommendation =
            recommendations[i];


        let product =
            recommendation.product;


        let count =
            recommendation.count;


        let card =
            document.createElement("div");


        card.className =
            "recommendation-card";


        card.innerHTML = `

            <h3>
                #${i + 1}
                ${product.name}
            </h3>

            <div class="recommendation-price">

                ₹${product.price.toLocaleString("en-IN")}

            </div>

            <div class="recommendation-rating">

                ⭐ ${product.rating}

            </div>

            <span class="why">

                Often viewed with
                ${currentProduct.name}

            </span>

            <br>

            <button class="view-button">

                View Product

            </button>

        `;


        card
            .querySelector(".view-button")
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
// DISPLAY CURRENT USER VIEW HISTORY
// ==========================================

function displayViewedProducts() {

    let container =
        document.getElementById(
            "viewedProducts"
        );


    container.innerHTML = "";


    if (
        currentUserViewed.length === 0
    ) {

        container.innerHTML = `

            <div class="empty-message">

                You have not viewed
                any products yet.

            </div>

        `;

        return;
    }


    for (
        let i = 0;
        i < currentUserViewed.length;
        i++
    ) {

        let product =
            findProductById(
                currentUserViewed[i]
            );


        if (product === null) {

            continue;

        }


        let item =
            document.createElement("div");


        item.className =
            "viewed-item";


        item.textContent =
            product.name;


        container.appendChild(item);

    }
}


// ==========================================
// REFRESH RECOMMENDATIONS
// ==========================================

document
    .getElementById("refreshButton")
    .addEventListener(
        "click",
        function() {

            if (
                currentUserViewed.length === 0
            ) {

                alert(
                    "View a product first."
                );

                return;
            }


            let lastViewed =
                currentUserViewed[
                    currentUserViewed.length - 1
                ];


            generateRecommendations(
                lastViewed
            );

        }
    );


// ==========================================
// INITIAL DISPLAY
// ==========================================

displayCurrentUserProducts();

displayViewedProducts();