console.log("Admin's Dashboard frontend loaded."); 

const categories = [
    { name: 'Fashion', icon: 'fa-shirt' },
    { name: 'Health & Beauty', icon: 'fa-heart' },
    { name: 'Food & Drinks', icon: 'fa-utensils' },
    { name: 'Technology', icon: 'fa-microchip' }
];

function renderCategoriesPage() {
    const main = document.querySelector('.app-content');
    main.innerHTML = `
        <div class="categories-page">
            <h2 class="mb-4"><i class="fas fa-list me-2"></i>Categories</h2>
            <div class="row g-4">
                ${categories.map(cat => `
                    <div class="col-12 col-md-6 col-lg-4">
                        <div class="card category-card h-100 text-center p-4 category-clickable" data-category="${cat.name}">
                            <i class="fas ${cat.icon} fa-2x mb-3"></i>
                            <h5 class="fw-bold">${cat.name}</h5>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    // Add click listeners to category cards
    document.querySelectorAll('.category-clickable').forEach(card => {
        card.addEventListener('click', function() {
            const category = card.getAttribute('data-category');
            renderProductsPage(category);
        });
    });
}

function setActiveSidebar(linkText) {
    document.querySelectorAll('.sidebar .nav-link').forEach(link => {
        if (link.textContent.trim() === linkText) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

const products = [
    // Ilyas Kodri's products (5)
    { name: "Oversized Denim Jacket", imageUrl: "https://amsupplymenswear.com/cdn/shop/products/MWO17475-33DENIMBLUE_1.jpg?v=1667187857", category: "Fashion", listedBy: "Ilyas Kodri", avatarUrl: "https://t3.ftcdn.net/jpg/06/99/46/60/360_F_699466075_DaPTBNlNQTOwwjkOiFEoOvzDV0ByXR9E.jpg", description: "A timeless streetwear staple for both men and women.", price: 349.00, rating: 4.5 },
    { name: "Collagen Peptides Powder", imageUrl: "https://sandhus.com/cdn/shop/products/CollagenPeptides-F-Mockup-1200px.jpg?v=1674522259", category: "Health & Beauty", listedBy: "Ilyas Kodri", avatarUrl: "https://t3.ftcdn.net/jpg/06/99/46/60/360_F_699466075_DaPTBNlNQTOwwjkOiFEoOvzDV0ByXR9E.jpg", description: "Supports healthy skin, joints, and hair growth.", price: 229.00, rating: 4.8 },
    { name: "Matcha Green Tea Powder", imageUrl: "https://m.media-amazon.com/images/I/71Z02sRW0lL.jpg", category: "Food & Drinks", listedBy: "Ilyas Kodri", avatarUrl: "https://t3.ftcdn.net/jpg/06/99/46/60/360_F_699466075_DaPTBNlNQTOwwjkOiFEoOvzDV0ByXR9E.jpg", description: "Premium matcha powder rich in antioxidants.", price: 129.00, rating: 4.8 },
    { name: "Wireless Charging Pad", imageUrl: "https://www.cnet.com/a/img/resize/8dfd582b861be518dcb968d1f1b6de01ef114961/hub/2023/02/28/9da2e9c7-d07d-45cb-89d1-18c7013249e5/anker-315-wireless-charger.png?auto=webp&fit=crop&height=900&width=1200", category: "Technology", listedBy: "Ilyas Kodri", avatarUrl: "https://t3.ftcdn.net/jpg/06/99/46/60/360_F_699466075_DaPTBNlNQTOwwjkOiFEoOvzDV0ByXR9E.jpg", description: "Effortless charging pad for phones and earbuds.", price: 249.00, rating: 4.5 },
    { name: "Noise-Canceling Bluetooth Headphones", imageUrl: "https://media.very.ie/i/littlewoodsireland/WHLBI_SQ1_0000000020_BLUE_SLf?$pdp_300x400_x2$&fmt=jpg", category: "Technology", listedBy: "Ilyas Kodri", avatarUrl: "https://t3.ftcdn.net/jpg/06/99/46/60/360_F_699466075_DaPTBNlNQTOwwjkOiFEoOvzDV0ByXR9E.jpg", description: "Perfect for remote work, travel, or gaming.", price: 599.00, rating: 4.7 },
    
    // Siham Beqali's products (5)
    { name: "Chunky Sneakers", imageUrl: "https://m.media-amazon.com/images/I/61NM58P8z9L.jpg", category: "Fashion", listedBy: "Siham Beqali", avatarUrl: "https://media.licdn.com/dms/image/v2/D4D03AQH_6ajv3kx6sw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1718257568018?e=2147483647&v=beta&t=GC1r7KdJxjZNMHCLHmurdIJvyyR2-nkYJ3ovHmcDB9w", description: "Bold and comfortable sneakers trending in urban fashion.", price: 499.00, rating: 4.7 },
    { name: "LED Light Therapy Mask", imageUrl: "https://m.media-amazon.com/images/I/61WCSu+WllL.jpg", category: "Health & Beauty", listedBy: "Siham Beqali", avatarUrl: "https://media.licdn.com/dms/image/v2/D4D03AQH_6ajv3kx6sw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1718257568018?e=2147483647&v=beta&t=GC1r7KdJxjZNMHCLHmurdIJvyyR2-nkYJ3ovHmcDB9w", description: "Advanced skincare device that helps treat acne and reduce wrinkles.", price: 699.00, rating: 4.4 },
    { name: "Artisan Hot Sauce Pack", imageUrl: "https://secretkiwikitchen.com/cdn/shop/products/Hotsaucekitingredeints.png?v=1661475764&width=1445", category: "Food & Drinks", listedBy: "Siham Beqali", avatarUrl: "https://media.licdn.com/dms/image/v2/D4D03AQH_6ajv3kx6sw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1718257568018?e=2147483647&v=beta&t=GC1r7KdJxjZNMHCLHmurdIJvyyR2-nkYJ3ovHmcDB9w", description: "A spicy gourmet collection for hot sauce lovers.", price: 189.00, rating: 4.5 },
    { name: "Smart Home Plug", imageUrl: "https://cdn.thewirecutter.com/wp-content/media/2025/06/smart-plug-2048px-2207.jpg", category: "Technology", listedBy: "Siham Beqali", avatarUrl: "https://media.licdn.com/dms/image/v2/D4D03AQH_6ajv3kx6sw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1718257568018?e=2147483647&v=beta&t=GC1r7KdJxjZNMHCLHmurdIJvyyR2-nkYJ3ovHmcDB9w", description: "Convert your electronics into smart home devices.", price: 129.00, rating: 4.4 },
    { name: "Mini Portable Projector", imageUrl: "https://images-cdn.ubuy.co.in/639caa159c88a479ef686f03-yaber-pico-t1-mini-pocket-projector-with.jpg", category: "Technology", listedBy: "Siham Beqali", avatarUrl: "https://media.licdn.com/dms/image/v2/D4D03AQH_6ajv3kx6sw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1718257568018?e=2147483647&v=beta&t=GC1r7KdJxjZNMHCLHmurdIJvyyR2-nkYJ3ovHmcDB9w", description: "Portable projector for movies and presentations anywhere.", price: 799.00, rating: 4.6 },
    
    // Oussama Zerhouni's products (5)
    { name: "Minimalist Leather Wallet", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOQ_HDFuUErBi--aLtwQNrA3BCFFOz5rgYZQ&s", category: "Fashion", listedBy: "Oussama Zerhouni", avatarUrl: "https://www.mensjournal.com/.image/t_share/MTk2MTM2NTcwNDMxMjg0NzQx/man-taking-selfie.jpg", description: "Slim and stylish wallet for everyday use.", price: 199.00, rating: 4.3 },
    { name: "Electric Scalp Massager", imageUrl: "https://odo-cdn.imgix.net/catalog/product/1/7/1721196941.4641.png?auto=compress,format&w=800&h=800&bg=fff&fit=fill", category: "Health & Beauty", listedBy: "Oussama Zerhouni", avatarUrl: "https://www.mensjournal.com/.image/t_share/MTk2MTM2NTcwNDMxMjg0NzQx/man-taking-selfie.jpg", description: "Stimulates scalp circulation and relieves tension.", price: 159.00, rating: 4.3 },
    { name: "Keto Protein Bars", imageUrl: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/thk/thk71948/l/10.jpg", category: "Food & Drinks", listedBy: "Oussama Zerhouni", avatarUrl: "https://www.mensjournal.com/.image/t_share/MTk2MTM2NTcwNDMxMjg0NzQx/man-taking-selfie.jpg", description: "Low-carb bars perfect for a ketogenic lifestyle.", price: 99.00, rating: 4.4 },
    { name: "AI-Powered Fitness Tracker Ring", imageUrl: "https://cdn.mos.cms.futurecdn.net/QZKWQpLHM6LrUAGaxv5hoK.jpg", category: "Technology", listedBy: "Oussama Zerhouni", avatarUrl: "https://www.mensjournal.com/.image/t_share/MTk2MTM2NTcwNDMxMjg0NzQx/man-taking-selfie.jpg", description: "Discreet fitness tracker with smart health insights.", price: 399.00, rating: 4.3 },
    { name: "Smartwatch-Compatible Sportswear", imageUrl: "https://i5.walmartimages.com/seo/STA-Smart-Watch-for-Android-and-iPhone-1-95-Smartwatch-for-Men-Women-Fitness-Activity-Tracker-Black_134d28af-c611-46fe-b9df-ef24faf4b8f5.6f594b4535a828a30faf59b460e3aa0f.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF", category: "Fashion", listedBy: "Oussama Zerhouni", avatarUrl: "https://www.mensjournal.com/.image/t_share/MTk2MTM2NTcwNDMxMjg0NzQx/man-taking-selfie.jpg", description: "Tech-integrated activewear with pockets for your smartwatch.", price: 279.00, rating: 4.6 },
    
    // Nawal Laamri's products (5)
    { name: "Unisex Bucket Hat", imageUrl: "https://assets-prod.porsche.com/assets/74429c34-526f-41e4-8aef-e6248c736af1.webp", category: "Fashion", listedBy: "Nawal Laamri", avatarUrl: "https://img.freepik.com/premium-photo/woman-wearing-black-head-scarf_777078-39469.jpg", description: "Trendy and protective hat perfect for festivals or summer days.", price: 129.00, rating: 4.2 },
    { name: "Organic Turmeric Capsules", imageUrl: "https://m.media-amazon.com/images/I/71+Q1yuT5dL.jpg", category: "Health & Beauty", listedBy: "Nawal Laamri", avatarUrl: "https://img.freepik.com/premium-photo/woman-wearing-black-head-scarf_777078-39469.jpg", description: "Anti-inflammatory capsules made with organic turmeric.", price: 139.00, rating: 4.6 },
    { name: "Cold Brew Coffee Concentrate", imageUrl: "https://www.gradyscoldbrew.com/cdn/shop/products/GCB_CLASSIC_32OZ_Web_1024X1024_1024x1024_ffaa34d3-9e09-403a-b2e9-27f7d2ea44cc.jpg?v=1681412750", category: "Food & Drinks", listedBy: "Nawal Laamri", avatarUrl: "https://img.freepik.com/premium-photo/woman-wearing-black-head-scarf_777078-39469.jpg", description: "Smooth and strong cold brew coffee, ready to drink.", price: 149.00, rating: 4.6 },
    { name: "Cold Pressed Facial Oil (Argan or Rosehip)", imageUrl: "https://www.gosupps.com/media/catalog/product/cache/25/small_image/1500x1650/9df78eab33525d08d6e5fb8d27136e95/6/1/611weDc8loL.jpg", category: "Health & Beauty", listedBy: "Nawal Laamri", avatarUrl: "https://img.freepik.com/premium-photo/woman-wearing-black-head-scarf_777078-39469.jpg", description: "Hydrating and healing oil suitable for all skin types.", price: 179.00, rating: 4.7 },
    { name: "Dehydrated Fruit Snack Packs", imageUrl: "https://m.media-amazon.com/images/I/815qcIw61SL._UF894,1000_QL80_.jpg", category: "Food & Drinks", listedBy: "Nawal Laamri", avatarUrl: "https://img.freepik.com/premium-photo/woman-wearing-black-head-scarf_777078-39469.jpg", description: "Healthy and portable fruit snacks made with no added sugar.", price: 89.00, rating: 4.2 }
];

function renderProductsPage(category = null) {
    const main = document.querySelector('.app-content');
    let filtered = products;
    let title = 'Products';
    if (category) {
        filtered = products.filter(p => p.category === category);
        title = `${category} Products`;
    }
    main.innerHTML = `
        <div class="products-page">
            <div class="d-flex align-items-center mb-4">
                ${category ? `<button class='btn btn-outline-primary me-3' id='backToCategories'><i class='fas fa-arrow-left'></i></button>` : ''}
                <h2 class="mb-0"><i class="fas fa-box-open me-2"></i>${title}</h2>
            </div>
            <div class="row g-4">
                ${filtered.length === 0 ? `<div class='col-12'><div class='alert alert-info'>No products found in this category.</div></div>` :
                    filtered.map(product => `
                    <div class="col-12 col-md-6 col-lg-4">
                        <div class="card product-card h-100 p-3">
                            <img src="${product.imageUrl}" class="card-img-top product-img mb-3" alt="${product.name}">
                            <div class="card-body p-0">
                                <h5 class="card-title fw-bold mb-1">${product.name}</h5>
                                <div class="mb-2 text-muted small d-flex align-items-center">
                                    <img src="${product.avatarUrl}" class="user-avatar me-2" alt="${product.listedBy}">
                                    ${product.category} &bull; Listed by: ${product.listedBy}
                                </div>
                                <p class="card-text mb-2">${product.description}</p>
                                <div class="d-flex justify-content-between align-items-center mt-2">
                                    <span class="fw-bold text-primary">$${product.price.toFixed(2)}</span>
                                    <span class="badge bg-warning text-dark"><i class="fas fa-star"></i> ${product.rating}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    if (category) {
        document.getElementById('backToCategories').onclick = () => renderCategoriesPage();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('darkModeToggle');
    const icon = toggleBtn.querySelector('i');
    const body = document.body;

    // Load preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    toggleBtn.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        const enabled = body.classList.contains('dark-mode');
        if (enabled) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('darkMode', 'disabled');
        }
    });

    // Sidebar navigation
    document.querySelectorAll('.sidebar .nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const text = link.textContent.trim();
            setActiveSidebar(text);
            if (text === 'Categories') {
                renderCategoriesPage();
            } else if (text === 'Dashboard') {
                // Render welcome message
                document.querySelector('.app-content').innerHTML = `
                    <div class="welcome-message">
                        <h2>Welcome to the Admin Dashboard</h2>
                        <p>Select an item from the sidebar to get started.</p>
                    </div>
                `;
            } else if (text === 'Products') {
                renderProductsPage();
            }
            // Add more navigation as needed
        });
    });
}); 