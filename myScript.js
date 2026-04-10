
// AI Version



let cart = [];

const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + parseFloat(item.price), 0).toFixed(2);
};



$(document).ready(() => {
    
    // --- 1. Templates ---
    
    // The "Confirmation" Modal (Nested logic)
    const confirmationModalHtml = `
        <div class="modal micromodal-slide" id="modal-confirm" aria-hidden="true">
            <div class="modal__overlay" tabindex="-1" data-micromodal-close>
                <div class="modal__container" role="dialog" aria-modal="true">
                    <header class="modal__header">
                        <h2 class="modal__title">Added to Chest!</h2>
                        <button class="modal__close" aria-label="Close modal" data-micromodal-close></button>
                    </header>
                    <main class="modal__content text-center">
                        <p id="confirm-msg"></p>
                        <hr>
                        <h4>Current Cart Total: $<span id="confirm-total">0.00</span></h4>
                    </main>
                    <footer class="modal__footer">
                        <button class="btn btn-primary" data-micromodal-close>Keep Shopping</button>
                        <button class="btn btn-success" id="go-to-cart-from-modal">View Cart</button>
                    </footer>
                </div>
            </div>
        </div>
    `;

    const cartPageHtml = `
        <div id="cartContent" style="display:none;" class="container mt-5">
            <h1 class="retro-logo">Your Shopping Cart</h1>
            <div id="cartItemsList" class="list-group mb-4"></div>
            <div class="text-end">
                <h3>Total: $<span id="cartTotal">0.00</span></h3>
                <button class="btn btn-outline-secondary btn-lg" id="backToShop">Continue Shopping</button>
            </div>
        </div>
    `;

    // --- 2. Initial Data Fetch ---

    axios.get('https://codethesolution.com/nscc/project2700-mike.php')
        .then(response => {
            const games = response.data;
            
            // Append containers and hidden modals
            $("#myMain").append('<div id="pageContent"></div>');
            $("#myMain").append(cartPageHtml);
            $("body").append(confirmationModalHtml); 

            $("#pageContent").append(`
                <h2 class="text-center mt-4">Games For Sale</h2>
                <div id="insertProduct" class="row g-4 mt-2"></div>
            `);

            // Populate Products
            $.each(games, (index, el) => {
                $("#insertProduct").append(`
                    <div class="col-md-4">
                        <div class="p-3 border bg-light text-center">
                            <img class="gameCover" src="./myImages/${el.image_main}">
                            <h3>${el.title}</h3>
                            <h5>Price: $${el.price}</h5>
                            <button class="btn btn-primary" data-micromodal-trigger="modal-${index}">More Info</button>

                            <div class="modal micromodal-slide" id="modal-${index}" aria-hidden="true">
                                <div class="modal__overlay" tabindex="-1" data-micromodal-close>
                                    <div class="modal__container">
                                        <button class="modal__close" data-micromodal-close>X</button>
                                        <img class="gameLarge" src="./myImages/${el.image_large}">
                                        <h3>${el.title}</h3>
                                        <p>${el.description}</p>
                                        <button class="btn btn-success add-to-cart-btn" data-index="${index}">
                                            Add to Cart - $${el.price}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `);
            });

            MicroModal.init({ disableScroll: true });

            // --- 3. Add to Cart Logic with Nested Modal ---

            $(document).on('click', '.add-to-cart-btn', function() {
                const gameIndex = $(this).data('index');
                const selectedGame = games[gameIndex];
                
                // Add to array
                cart.push(selectedGame);

                // Update the Confirmation Modal Text
                $("#confirm-msg").text(`${selectedGame.title} has been added to your collection.`);
                $("#confirm-total").text(calculateTotal());

                // Close product modal and open confirmation modal
                MicroModal.close(`modal-${gameIndex}`);
                
                // Small timeout ensures the first modal is fully closed before opening the next
                setTimeout(() => {
                    MicroModal.show('modal-confirm');
                }, 100);
            });
        });

    // --- 4. Navigation Logic ---

    const showCart = () => {
        $("#homeBanner, #pageContent, #aboutHeading, #contactHeading, #form1").hide();
        $("#cartContent").show();
        renderCart();
    };

    const renderCart = () => {
        const $list = $("#cartItemsList");
        $list.empty();
        cart.forEach(item => {
            $list.append(`
                <div class="list-group-item d-flex justify-content-between align-items-center">
                    <span>${item.title}</span>
                    <strong>$${item.price}</strong>
                </div>
            `);
        });
        $("#cartTotal").text(calculateTotal());
    };

    // Go to cart from the confirmation modal
    $(document).on('click', '#go-to-cart-from-modal', () => {
        MicroModal.close('modal-confirm');
        showCart();
    });

    // Nav button click
    $("#cart-nav-button").on('click', (e) => {
        e.preventDefault();
        showCart();
    });

    $(document).on('click', '#backToShop', () => {
        $("#cartContent").hide();
        $("#pageContent, #homeBanner").show();
    });
    
});








