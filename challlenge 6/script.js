// ==========================================
// CHALLENGE 6
// INVENTORY RANGE DASHBOARD
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
// SORT PRODUCTS BY PRICE
// ==========================================

allProducts.sort(function(a, b) {

    return a.price - b.price;

});


// ==========================================
// CREATE PREFIX SUM
// ==========================================
//
// prefix[i] stores the total inventory
// value of products before index i.
//
// inventory value = price × stock
//
// ==========================================

let prefix = [];

prefix[0] = 0;


for (
    let i = 0;
    i < allProducts.length;
    i++
) {

    let value =
        allProducts[i].price *
        allProducts[i].stock;


    prefix[i + 1] =
        prefix[i] + value;

}


console.log(
    "Prefix sum created."
);


// ==========================================
// LOWER BOUND
// ==========================================
//
// Finds first product whose price
// is >= target.
//
// ==========================================

function lowerBound(target) {

    let left = 0;

    let right =
        allProducts.length;


    while (left < right) {

        let middle =
            Math.floor(
                (left + right) / 2
            );


        if (
            allProducts[middle].price <
            target
        ) {

            left =
                middle + 1;

        } else {

            right =
                middle;

        }

    }


    return left;
}


// ==========================================
// UPPER BOUND
// ==========================================
//
// Finds first product whose price
// is > target.
//
// ==========================================

function upperBound(target) {

    let left = 0;

    let right =
        allProducts.length;


    while (left < right) {

        let middle =
            Math.floor(
                (left + right) / 2
            );


        if (
            allProducts[middle].price <=
            target
        ) {

            left =
                middle + 1;

        } else {

            right =
                middle;

        }

    }


    return left;
}


// ==========================================
// SEARCH RANGE
// ==========================================

function searchRange(minPrice, maxPrice) {

    if (minPrice > maxPrice) {

        return;

    }


    // First product >= minPrice

    let start =
        lowerBound(minPrice);


    // First product > maxPrice

    let end =
        upperBound(maxPrice);


    // Number of products

    let count =
        end - start;


    // Total inventory value
    //
    // prefix[end] contains total up to end
    //
    // prefix[start] contains total before start

    let totalValue =
        prefix[end] -
        prefix[start];


    displaySummary(
        count,
        totalValue
    );


    displayProducts(
        start,
        end
    );

}


// ==========================================
// DISPLAY SUMMARY
// ==========================================

function displaySummary(
    count,
    totalValue
) {

    document.getElementById(
        "productCount"
    ).textContent =
        count;


    document.getElementById(
        "inventoryValue"
    ).textContent =
        "₹" +
        totalValue.toLocaleString(
            "en-IN"
        );

}


// ==========================================
// DISPLAY PRODUCTS
// ==========================================

function displayProducts(
    start,
    end
) {

    let container =
        document.getElementById(
            "productList"
        );


    container.innerHTML = "";


    if (start === end) {

        container.innerHTML = `

            <div class="empty-message">

                No products found
                in this price range.

            </div>

        `;

        return;

    }


    for (
        let i = start;
        i < end;
        i++
    ) {

        let product =
            allProducts[i];


        let inventoryValue =
            product.price *
            product.stock;


        let card =
            document.createElement("div");


        card.className =
            "product-card";


        card.innerHTML = `

            <h3>
                ${product.name}
            </h3>

            <div class="product-price">

                ₹${product.price.toLocaleString("en-IN")}

            </div>

            <div class="stock">

                Stock:
                ${product.stock}

            </div>

            <div class="inventory">

                Inventory Value:
                ₹${inventoryValue.toLocaleString("en-IN")}

            </div>

        `;


        container.appendChild(card);

    }

}


// ==========================================
// SEARCH BUTTON
// ==========================================

document
    .getElementById("searchButton")
    .addEventListener(
        "click",
        function() {

            let minPrice =
                Number(
                    document.getElementById(
                        "minPrice"
                    ).value
                );


            let maxPrice =
                Number(
                    document.getElementById(
                        "maxPrice"
                    ).value
                );


            if (
                minPrice < 0 ||
                maxPrice < 0
            ) {

                alert(
                    "Price cannot be negative."
                );

                return;

            }


            if (
                minPrice >
                maxPrice
            ) {

                alert(
                    "Minimum price cannot be greater than maximum price."
                );

                return;

            }


            searchRange(
                minPrice,
                maxPrice
            );

        }
    );


// ==========================================
// MIN SLIDER
// ==========================================

let minSlider =
    document.getElementById(
        "minSlider"
    );


let maxSlider =
    document.getElementById(
        "maxSlider"
    );


// ==========================================
// SLIDER FUNCTION
// ==========================================

function updateSlider() {

    let min =
        Number(
            minSlider.value
        );


    let max =
        Number(
            maxSlider.value
        );


    // Prevent min > max

    if (min > max) {

        minSlider.value =
            max;

        min =
            max;

    }


    document.getElementById(
        "minSliderValue"
    ).textContent =
        "₹" +
        min.toLocaleString(
            "en-IN"
        );


    document.getElementById(
        "maxSliderValue"
    ).textContent =
        "₹" +
        max.toLocaleString(
            "en-IN"
        );


    // Update input boxes

    document.getElementById(
        "minPrice"
    ).value =
        min;


    document.getElementById(
        "maxPrice"
    ).value =
        max;


    // Automatically search

    searchRange(
        min,
        max
    );

}


// ==========================================
// SLIDER EVENTS
// ==========================================

minSlider.addEventListener(
    "input",
    updateSlider
);


maxSlider.addEventListener(
    "input",
    updateSlider
);


// ==========================================
// INITIAL STATE
// ==========================================

let highestPrice =
    allProducts.length > 0
        ? allProducts[
            allProducts.length - 1
        ].price
        : 150000;


// Set slider maximum based on data

minSlider.max =
    highestPrice;


maxSlider.max =
    highestPrice;


maxSlider.value =
    highestPrice;


document.getElementById(
    "maxSliderValue"
).textContent =
    "₹" +
    highestPrice.toLocaleString(
        "en-IN"
    );