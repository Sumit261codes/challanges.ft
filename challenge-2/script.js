const products = [
    {
        name: "Sony WH-1000XM5",
        rating: 4.8,
        reviews: 5420
    },
    {
        name: "Apple AirPods Pro",
        rating: 4.7,
        reviews: 6300
    },
    {
        name: "Samsung Galaxy Buds",
        rating: 4.5,
        reviews: 4100
    },
    {
        name: "JBL Tune 760NC",
        rating: 4.4,
        reviews: 3200
    },
    {
        name: "Bose QuietComfort",
        rating: 4.8,
        reviews: 2900
    },
    {
        name: "Sennheiser Momentum 4",
        rating: 4.7,
        reviews: 2500
    },
    {
        name: "Boat Rockerz 550",
        rating: 4.3,
        reviews: 7200
    },
    {
        name: "OnePlus Buds Pro",
        rating: 4.4,
        reviews: 3800
    },
    {
        name: "Nothing Ear",
        rating: 4.2,
        reviews: 2700
    },
    {
        name: "Realme Buds Air",
        rating: 4.1,
        reviews: 5100
    }
];


function getPopularity(product) {
    return product.rating * product.reviews;
}


function getTopK(k) {

    let topProducts = [];

    for (let product of products) {

        product.popularity = getPopularity(product);

        topProducts.push(product);

        topProducts.sort(function(a, b) {
            return b.popularity - a.popularity;
        });

        if (topProducts.length > k) {
            topProducts.pop();
        }
    }

    return topProducts;
}


function displayProducts() {

    let k = Number(document.getElementById("topK").value);

    let topProducts = getTopK(k);

    let container = document.getElementById("productContainer");

    container.innerHTML = "";

    for (let i = 0; i < topProducts.length; i++) {

        let product = topProducts[i];

        let card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <div class="rank">#${i + 1}</div>

            <div class="product-name">
                ${product.name}
            </div>

            <div class="rating">
                ⭐ ${product.rating}
            </div>

            <div class="reviews">
                ${product.reviews} reviews
            </div>

            <div class="popularity">
                Popularity: ${Math.round(product.popularity)}
            </div>
        `;

        container.appendChild(card);
    }
}


document.getElementById("topK").addEventListener("change", displayProducts);

displayProducts();