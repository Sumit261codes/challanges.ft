console.log("Challenge 1 script loaded");


// ======================================
// GET HTML ELEMENTS
// ======================================

const searchButton =
    document.getElementById("searchButton");

const rangeButton =
    document.getElementById("rangeButton");

const results =
    document.getElementById("results");


// ======================================
// CHECK DATA
// ======================================

console.log("Checking storeData...");

if (typeof storeData === "undefined") {

    console.error("storeData was not found.");

    results.innerHTML = `
        <div class="message">
            Product data could not be loaded.
        </div>
    `;

} else {

    console.log("storeData loaded successfully.");

}


// ======================================
// GET ALL PRODUCTS
// ======================================

let allProducts = [];


if (typeof storeData !== "undefined") {

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

                let product =
                    subcategory.products[k];


                allProducts.push(product);
            }
        }
    }
}


console.log(
    "Total products:",
    allProducts.length
);


// ======================================
// SORT BY PRICE
// ======================================

allProducts.sort(function(a, b) {

    return a.price - b.price;

});


// ======================================
// BINARY SEARCH
// ======================================

function binarySearch(target) {

    let left = 0;

    let right =
        allProducts.length - 1;

    let closestIndex = 0;


    while (left <= right) {

        let middle =
            Math.floor(
                (left + right) / 2
            );


        let middlePrice =
            allProducts[middle].price;


        let closestPrice =
            allProducts[closestIndex].price;


        if (
            Math.abs(middlePrice - target)
            <
            Math.abs(closestPrice - target)
        ) {

            closestIndex = middle;
        }


        if (middlePrice === target) {

            return middle;

        }


        if (middlePrice < target) {

            left = middle + 1;

        } else {

            right = middle - 1;

        }
    }


    return closestIndex;
}


// ======================================
// FIND CLOSEST PRODUCTS
// ======================================

function findClosestProducts(target) {

    if (allProducts.length === 0) {

        return [];

    }


    let closestIndex =
        binarySearch(target);


    let start =
        Math.max(
            0,
            closestIndex - 2
        );


    let end =
        Math.min(
            allProducts.length - 1,
            closestIndex + 2
        );


    let result = [];


    for (
        let i = start;
        i <= end;
        i++
    ) {

        result.push(
            allProducts[i]
        );

    }


    result.sort(function(a, b) {

        return (
            Math.abs(a.price - target)
            -
            Math.abs(b.price - target)
        );

    });


    return result;
}


// ======================================
// DISPLAY PRODUCTS
// ======================================

function displayProducts(productList) {

    results.innerHTML = "";


    if (productList.length === 0) {

        results.innerHTML = `
            <div class="message">
                No products found.
            </div>
        `;

        return;
    }


    for (
        let i = 0;
        i < productList.length;
        i++
    ) {

        let product =
            productList[i];


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


        card
            .querySelector(".view-button")
            .addEventListener(
                "click",
                function() {

                    alert(
                        product.name
                        +
                        "\n₹"
                        +
                        product.price.toLocaleString("en-IN")
                    );

                }
            );


        results.appendChild(card);
    }
}


// ======================================
// SEARCH BUTTON
// ======================================

searchButton.addEventListener(
    "click",
    function() {

        console.log("Search button clicked");


        let input =
            document.getElementById(
                "targetPrice"
            );


        let target =
            Number(input.value);


        console.log(
            "Target price:",
            target
        );


        if (
            input.value === ""
            ||
            target <= 0
        ) {

            alert(
                "Please enter a valid price."
            );

            return;
        }


        let products =
            findClosestProducts(target);


        console.log(
            "Products found:",
            products
        );


        displayProducts(products);

    }
);


// ======================================
// RANGE BUTTON
// ======================================

rangeButton.addEventListener(
    "click",
    function() {

        console.log(
            "Range button clicked"
        );


        let min =
            Number(
                document.getElementById(
                    "minPrice"
                ).value
            );


        let max =
            Number(
                document.getElementById(
                    "maxPrice"
                ).value
            );


        console.log(
            "Range:",
            min,
            max
        );


        if (
            min <= 0
            ||
            max <= 0
        ) {

            alert(
                "Please enter valid prices."
            );

            return;
        }


        if (min > max) {

            alert(
                "Minimum price cannot be greater than maximum price."
            );

            return;
        }


        let products = [];


        for (
            let i = 0;
            i < allProducts.length;
            i++
        ) {

            if (
                allProducts[i].price >= min
                &&
                allProducts[i].price <= max
            ) {

                products.push(
                    allProducts[i]
                );

            }
        }


        console.log(
            "Range products:",
            products
        );


        displayProducts(products);

    }
);