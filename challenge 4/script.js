// ==========================================
// CHALLENGE 4
// UNDO / REDO CART
// ==========================================


// ==========================================
// GET PRODUCTS FROM DATA
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


// ==========================================
// CART
// ==========================================

let cart = [];


// ==========================================
// TWO STACKS
// ==========================================

let undoStack = [];

let redoStack = [];


// ==========================================
// OPERATION HISTORY
// ==========================================

let operationHistory = [];


// ==========================================
// DISPLAY PRODUCTS
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


        card.className =
            "product-card";


        card.innerHTML = `

            <h3>
                ${product.name}
            </h3>

            <div class="product-price">
                ₹${product.price.toLocaleString("en-IN")}
            </div>

            <button class="add-button">
                Add to Cart
            </button>

        `;


        card
            .querySelector(".add-button")
            .addEventListener(
                "click",
                function() {

                    addProduct(product);

                }
            );


        productList.appendChild(card);
    }
}


// ==========================================
// SAVE STATE
// ==========================================

function saveState() {

    return JSON.parse(
        JSON.stringify(cart)
    );
}


// ==========================================
// RESTORE STATE
// ==========================================

function restoreState(state) {

    cart = JSON.parse(
        JSON.stringify(state)
    );


    displayCart();
}


// ==========================================
// ADD PRODUCT
// ==========================================

function addProduct(product) {

    let oldState =
        saveState();


    let existingProduct =
        cart.find(function(item) {

            return item.id === product.id;

        });


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            quantity: 1

        });

    }


    let newState =
        saveState();


    undoStack.push({

        oldState: oldState,

        newState: newState,

        message:
            "Added " + product.name

    });


    // New action clears redo history

    redoStack = [];


    operationHistory.push(
        "✓ Added " + product.name
    );


    displayCart();

}


// ==========================================
// REMOVE PRODUCT
// ==========================================

function removeProduct(productId) {

    let oldState =
        saveState();


    let removedProduct =
        cart.find(function(item) {

            return item.id === productId;

        });


    if (!removedProduct) {

        return;

    }


    cart =
        cart.filter(function(item) {

            return item.id !== productId;

        });


    let newState =
        saveState();


    undoStack.push({

        oldState: oldState,

        newState: newState,

        message:
            "Removed " +
            removedProduct.name

    });


    redoStack = [];


    operationHistory.push(
        "✓ Removed " +
        removedProduct.name
    );


    displayCart();

}


// ==========================================
// INCREASE QUANTITY
// ==========================================

function increaseQuantity(productId) {

    let oldState =
        saveState();


    let product =
        cart.find(function(item) {

            return item.id === productId;

        });


    if (!product) {

        return;

    }


    product.quantity++;


    let newState =
        saveState();


    undoStack.push({

        oldState: oldState,

        newState: newState,

        message:
            "Increased " +
            product.name

    });


    redoStack = [];


    operationHistory.push(
        "✓ Increased " +
        product.name
    );


    displayCart();

}


// ==========================================
// DECREASE QUANTITY
// ==========================================

function decreaseQuantity(productId) {

    let oldState =
        saveState();


    let product =
        cart.find(function(item) {

            return item.id === productId;

        });


    if (!product) {

        return;

    }


    product.quantity--;


    if (product.quantity <= 0) {

        cart =
            cart.filter(function(item) {

                return item.id !== productId;

            });

    }


    let newState =
        saveState();


    undoStack.push({

        oldState: oldState,

        newState: newState,

        message:
            "Decreased " +
            product.name

    });


    redoStack = [];


    operationHistory.push(
        "✓ Decreased " +
        product.name
    );


    displayCart();

}


// ==========================================
// UNDO
// ==========================================

function undo() {

    if (undoStack.length === 0) {

        return;

    }


    let operation =
        undoStack.pop();


    // Save operation for redo

    redoStack.push(operation);


    // Restore previous state

    restoreState(
        operation.oldState
    );


    operationHistory.push(
        "↩ Undo: " +
        operation.message
    );


    updateButtons();

}


// ==========================================
// REDO
// ==========================================

function redo() {

    if (redoStack.length === 0) {

        return;

    }


    let operation =
        redoStack.pop();


    // Put operation back into undo stack

    undoStack.push(operation);


    // Restore new state

    restoreState(
        operation.newState
    );


    operationHistory.push(
        "↪ Redo: " +
        operation.message
    );


    updateButtons();

}


// ==========================================
// DISPLAY CART
// ==========================================

function displayCart() {

    let container =
        document.getElementById(
            "cartItems"
        );


    container.innerHTML = "";


    if (cart.length === 0) {

        container.innerHTML = `

            <div class="empty-cart">

                Your cart is empty.

            </div>

        `;

    }


    let total = 0;

    let itemCount = 0;


    for (
        let i = 0;
        i < cart.length;
        i++
    ) {

        let item =
            cart[i];


        total +=
            item.price *
            item.quantity;


        itemCount +=
            item.quantity;


        let cartItem =
            document.createElement("div");


        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <div class="cart-product-info">

                <h3>
                    ${item.name}
                </h3>

                <p>
                    ₹${item.price.toLocaleString("en-IN")}
                </p>

            </div>


            <div class="quantity-controls">

                <button class="decrease">
                    −
                </button>


                <span class="quantity">
                    ${item.quantity}
                </span>


                <button class="increase">
                    +
                </button>


                <button class="remove-button">
                    Remove
                </button>

            </div>

        `;


        cartItem
            .querySelector(".increase")
            .addEventListener(
                "click",
                function() {

                    increaseQuantity(
                        item.id
                    );

                }
            );


        cartItem
            .querySelector(".decrease")
            .addEventListener(
                "click",
                function() {

                    decreaseQuantity(
                        item.id
                    );

                }
            );


        cartItem
            .querySelector(".remove-button")
            .addEventListener(
                "click",
                function() {

                    removeProduct(
                        item.id
                    );

                }
            );


        container.appendChild(
            cartItem
        );

    }


    document.getElementById(
        "cartTotal"
    ).textContent =
        "₹" +
        total.toLocaleString("en-IN");


    document.getElementById(
        "itemCount"
    ).textContent =
        "Items: " +
        itemCount;


    displayHistory();

    updateButtons();
}


// ==========================================
// DISPLAY OPERATION HISTORY
// ==========================================

function displayHistory() {

    let history =
        document.getElementById(
            "operationHistory"
        );


    history.innerHTML = "";


    if (
        operationHistory.length === 0
    ) {

        history.textContent =
            "No operations yet.";

        return;

    }


    // Show latest operations first

    for (
        let i =
            operationHistory.length - 1;

        i >= 0;

        i--
    ) {

        let item =
            document.createElement("div");


        item.className =
            "history-item";


        item.textContent =
            operationHistory[i];


        history.appendChild(item);
    }
}


// ==========================================
// ENABLE / DISABLE UNDO REDO
// ==========================================

function updateButtons() {

    document.getElementById(
        "undoButton"
    ).disabled =
        undoStack.length === 0;


    document.getElementById(
        "redoButton"
    ).disabled =
        redoStack.length === 0;
}


// ==========================================
// UNDO BUTTON
// ==========================================

document.getElementById(
    "undoButton"
).addEventListener(
    "click",
    function() {

        undo();

    }
);


// ==========================================
// REDO BUTTON
// ==========================================

document.getElementById(
    "redoButton"
).addEventListener(
    "click",
    function() {

        redo();

    }
);


// ==========================================
// INITIAL DISPLAY
// ==========================================

displayProducts();

displayCart();