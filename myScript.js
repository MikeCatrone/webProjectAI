
// AI Version

$(document).ready(() => {
    let cart = [];

    // --- 1. Helper Function to Calculate Total ---
    const calculateTotal = () => {
        return cart.reduce((sum, item) => sum + parseFloat(item.price), 0).toFixed(2);
    };

    // --- 2. The Cart "Page" Template ---
    const cartPageHtml = `
        <div id="cartContent" style="display:none;" class="container mt-5">
            <h1 class="retro-logo">Your Shopping Cart</h1>
            <div id="cartItemsList" class="list-group mb-4">
                </div>
            <div class="text-end">
                <h3>Total: $<span id="cartTotal">0.00</span></h3>
                <button class="btn btn-success btn-lg" id="checkoutBtn">Proceed to Checkout</button>
                <button class="btn btn-outline-secondary btn-lg" id="backToShop">Continue Shopping</button>
            </div>
        </div>
    `;

    // Initialize Home Load
    axios.get('https://codethesolution.com/nscc/project2700-mike.php')
        .then(response => {
            const games = response.data; // Store reference to the data

            $("#myMain").append('<div id="pageContent"></div>');
            $("#myMain").append(cartPageHtml); // Add the hidden cart div
            
            $("#pageContent").append(`
                <h2 class="text-center mt-4">Games For Sale</h2>
                <div class="container mt-5">
                    <div id="insertProduct" class="row g-4"></div>
                </div>
            `);

            // Populate Products
            $.each(games, (index, el) => {
                $("#insertProduct").append(`
                    <div class="col-md-4">
                        <div class="p-3 border bg-light text-center">
                            <img class="gameCover" src="./myImages/${el.image_main}">
                            <h3>${el.title}</h3>
                            <h5>Price: $${el.price}</h5>
                            <button type="button" class="btn btn-primary" data-micromodal-trigger="modal-${index}">
                                More Info
                            </button>

                            <div class="modal a micromodal-slide" id="modal-${index}" aria-hidden="true">
                                <div class="modal__overlay" tabindex="-1" data-micromodal-close>
                                    <div class="modal__container" role="dialog" aria-modal="true">
                                        <button class="modal__close" data-micromodal-close>X</button>
                                        <img class="gameLarge" src="./myImages/${el.image_large}">
                                        <h3>${el.title}</h3>
                                        <h5>Price: $${el.price}</h5>
                                        <p>${el.description}</p>
                                        
                                        <button class="btn btn-success add-to-cart-btn" 
                                                data-index="${index}">
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `);
            });

            MicroModal.init({ disableScroll: true });

            // --- 3. ADD TO CART LOGIC ---
            $(document).on('click', '.add-to-cart-btn', function() {
                const gameIndex = $(this).data('index');
                const selectedGame = games[gameIndex];
                
                cart.push(selectedGame);
                alert(`${selectedGame.title} added to chest!`);
                MicroModal.close(`modal-${gameIndex}`);
            });
        });

    // --- 4. CART PAGE NAVIGATION & RENDERING ---
    $("#cart-nav-button").on('click', (e) => { // Assume you have a nav link with this ID
        e.preventDefault();
        $("#homeBanner, #pageContent, #aboutHeading, #contactHeading, #form1").hide();
        $("#cartContent").show();
        renderCart();
    });

    const renderCart = () => {
        const $list = $("#cartItemsList");
        $list.empty();

        if (cart.length === 0) {
            $list.append('<p class="text-muted">Your cart is currently empty.</p>');
        } else {
            cart.forEach(item => {
                $list.append(`
                    <div class="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <img src="./myImages/${item.image_main}" style="width:50px; margin-right:15px;">
                            <strong>${item.title}</strong>
                        </div>
                        <span>$${item.price}</span>
                    </div>
                `);
            });
        }
        $("#cartTotal").text(calculateTotal());
    };

    // Back to Shop button logic
    $(document).on('click', '#backToShop', () => {
        $("#cartContent").hide();
        $("#pageContent, #homeBanner").show();
    });
    
});








