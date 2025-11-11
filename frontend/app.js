console.log("Admin's Dashboard frontend loaded.");

// API Configuration
const API_BASE_URL = 'http://localhost:5266/api';

// Authentication check - redirect to login if not authenticated
function checkAuthentication() {
    const isAuth = localStorage.getItem('adminAuth') || sessionStorage.getItem('adminAuth');
    if (isAuth !== 'true') {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('adminAuth');
        localStorage.removeItem('adminEmail');
        sessionStorage.removeItem('adminAuth');
        sessionStorage.removeItem('adminEmail');
        window.location.href = 'login.html';
    }
}

// Password hashing function (SHA256)
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashBase64 = btoa(String.fromCharCode(...hashArray));
    return hashBase64;
}

// Global data storage
let categories = [];
let users = [];
let products = [];

// Global admin profile data
let adminProfile = {
    name: "Admin User",
    email: "admin@dashboard.com",
    phone: "+212 600000000",
    avatarUrl: "https://img.freepik.com/premium-vector/avatar-icon002_750950-50.jpg",
    password: "admin123",
    darkModeAuto: false
};

// Load admin profile from API
async function loadAdminProfile() {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/profile`);
        if (response.ok) {
            const data = await response.json();
            adminProfile = {
                ...adminProfile,
                name: data.name,
                email: data.email,
                phone: data.phone,
                avatarUrl: data.avatarUrl,
                darkModeAuto: data.darkModeAuto
            };
        } else {
            console.warn('Failed to load admin profile from API, using default values');
        }
    } catch (error) {
        console.warn('Error loading admin profile:', error);
    }
}

// Save admin profile to API
async function saveAdminProfile(profileData) {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profileData)
        });

        if (response.ok) {
            const result = await response.json();
            showNotification(result.message || 'Profile updated successfully!', 'success');
            return true;
        } else {
            const errorData = await response.json();
            showNotification(errorData.message || 'Failed to update profile', 'danger');
            return false;
        }
    } catch (error) {
        console.error('Error saving admin profile:', error);
        showNotification('Network error while saving profile', 'danger');
        return false;
    }
}

// Update admin settings
async function updateAdminSettings(settingsData) {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/settings`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(settingsData)
        });

        if (response.ok) {
            const result = await response.json();
            showNotification(result.message || 'Settings updated successfully!', 'success');
            return true;
        } else {
            const errorData = await response.json();
            showNotification(errorData.message || 'Failed to update settings', 'danger');
            return false;
        }
    } catch (error) {
        console.error('Error updating admin settings:', error);
        showNotification('Network error while updating settings', 'danger');
        return false;
    }
}

// API Functions
async function fetchCategories() {
    try {
        const response = await fetch(`${API_BASE_URL}/categories`);
        if (response.ok) {
            categories = await response.json();
        } else {
            console.warn('Failed to fetch categories, using static data');
            categories = [
                { name: "Fashion", icon: "fa-shirt" },
                { name: "Health & Beauty", icon: "fa-heart" },
                { name: "Food & Drinks", icon: "fa-utensils" },
                { name: "Technology", icon: "fa-microchip" }
            ];
        }
    } catch (error) {
        console.warn('Error fetching categories, using static data:', error);
        categories = [
            { name: "Fashion", icon: "fa-shirt" },
            { name: "Health & Beauty", icon: "fa-heart" },
            { name: "Food & Drinks", icon: "fa-utensils" },
            { name: "Technology", icon: "fa-microchip" }
        ];
    }
}

async function fetchUsers() {
    try {
        const response = await fetch(`${API_BASE_URL}/users`);
        if (response.ok) {
            users = await response.json();
        } else {
            console.warn('Failed to fetch users, using static data');
            users = [
                { id: 1, name: "Ilyas Kodri", imageUrl: "https://t3.ftcdn.net/jpg/06/99/46/60/360_F_699466075_DaPTBNlNQTOwwjkOiFEoOvzDV0ByXR9E.jpg", email: "ilyasskoudri@mail.com", phoneNumber: "+212 6789334568", isBlocked: false, isRestricted: false },
                { id: 2, name: "Siham Beqali", imageUrl: "https://media.licdn.com/dms/image/v2/D4D03AQH_6ajv3kx6sw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1718257568018?e=2147483647&v=beta&t=GC1r7KdJxjZNMHCLHmurdIJvyyR2-nkYJ3ovHmcDB9w", email: "siham334@mail.com", phoneNumber: "+212 733434568", isBlocked: false, isRestricted: false },
                { id: 3, name: "Oussama Zerhouni", imageUrl: "https://www.mensjournal.com/.image/t_share/MTk2MTM2NTcwNDMxMjg0NzQx/man-taking-selfie.jpg", email: "Elgrade@mail.com", phoneNumber: "+212 6777734568", isBlocked: false, isRestricted: false },
                { id: 4, name: "Nawal Laamri", imageUrl: "https://img.freepik.com/premium-photo/woman-wearing-black-head-scarf_777078-39469.jpg", email: "nawal899@mail.com", phoneNumber: "+212 7888334568", isBlocked: false, isRestricted: false }
            ];
        }
    } catch (error) {
        console.warn('Error fetching users, using static data:', error);
        users = [
            { id: 1, name: "Ilyas Kodri", imageUrl: "https://t3.ftcdn.net/jpg/06/99/46/60/360_F_699466075_DaPTBNlNQTOwwjkOiFEoOvzDV0ByXR9E.jpg", email: "ilyasskoudri@mail.com", phoneNumber: "+212 6789334568", isBlocked: false, isRestricted: false },
            { id: 2, name: "Siham Beqali", imageUrl: "https://media.licdn.com/dms/image/v2/D4D03AQH_6ajv3kx6sw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1718257568018?e=2147483647&v=beta&t=GC1r7KdJxjZNMHCLHmurdIJvyyR2-nkYJ3ovHmcDB9w", email: "siham334@mail.com", phoneNumber: "+212 733434568", isBlocked: false, isRestricted: false },
            { id: 3, name: "Oussama Zerhouni", imageUrl: "https://www.mensjournal.com/.image/t_share/MTk2MTM2NTcwNDMxMjg0NzQx/man-taking-selfie.jpg", email: "Elgrade@mail.com", phoneNumber: "+212 6777734568", isBlocked: false, isRestricted: false },
            { id: 4, name: "Nawal Laamri", imageUrl: "https://img.freepik.com/premium-photo/woman-wearing-black-head-scarf_777078-39469.jpg", email: "nawal899@mail.com", phoneNumber: "+212 7888334568", isBlocked: false, isRestricted: false }
        ];
    }
}

async function fetchProducts() {
    try {
        const response = await fetch(`${API_BASE_URL}/products`);
        if (response.ok) {
            products = await response.json();
        } else {
            console.warn('Failed to fetch products, using static data');
            products = [
                { name: "Oversized Denim Jacket", imageUrl: "https://amsupplymenswear.com/cdn/shop/products/MWO17475-33DENIMBLUE_1.jpg?v=1667187857", category: "Fashion", listedBy: "Ilyas Kodri", avatarUrl: "https://t3.ftcdn.net/jpg/06/99/46/60/360_F_699466075_DaPTBNlNQTOwwjkOiFEoOvzDV0ByXR9E.jpg", description: "A timeless streetwear staple for both men and women.", price: 349.00, rating: 4.5 },
                { name: "Chunky Sneakers", imageUrl: "https://m.media-amazon.com/images/I/61NM58P8z9L.jpg", category: "Fashion", listedBy: "Siham Beqali", avatarUrl: "https://media.licdn.com/dms/image/v2/D4D03AQH_6ajv3kx6sw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1718257568018?e=2147483647&v=beta&t=GC1r7KdJxjZNMHCLHmurdIJvyyR2-nkYJ3ovHmcDB9w", description: "Bold and comfortable sneakers trending in urban fashion.", price: 499.00, rating: 4.7 },
                { name: "Minimalist Leather Wallet", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOQ_HDFuUErBi--aLtwQNrA3BCFFOz5rgYZQ&s", category: "Fashion", listedBy: "Oussama Zerhouni", avatarUrl: "https://www.mensjournal.com/.image/t_share/MTk2MTM2NTcwNDMxMjg0NzQx/man-taking-selfie.jpg", description: "Slim and stylish wallet for everyday use.", price: 199.00, rating: 4.3 },
                { name: "Unisex Bucket Hat", imageUrl: "https://assets-prod.porsche.com/assets/74429c34-526f-41e4-8aef-e6248c736af1.webp", category: "Fashion", listedBy: "Nawal Laamri", avatarUrl: "https://img.freepik.com/premium-photo/woman-wearing-black-head-scarf_777078-39469.jpg", description: "Trendy and protective hat perfect for festivals or summer days.", price: 129.00, rating: 4.2 },
                { name: "Smartwatch-Compatible Sportswear", imageUrl: "https://i5.walmartimages.com/seo/STA-Smart-Watch-for-Android-and-iPhone-1-95-Smartwatch-for-Men-Women-Fitness-Activity-Tracker-Black_134d28af-c611-46fe-b9df-ef24faf4b8f5.6f594b4535a828a30faf59b460e3aa0f.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF", category: "Fashion", listedBy: "Oussama Zerhouni", avatarUrl: "https://www.mensjournal.com/.image/t_share/MTk2MTM2NTcwNDMxMjg0NzQx/man-taking-selfie.jpg", description: "Tech-integrated activewear with pockets for your smartwatch.", price: 279.00, rating: 4.6 },
                { name: "Collagen Peptides Powder", imageUrl: "https://sandhus.com/cdn/shop/products/CollagenPeptides-F-Mockup-1200px.jpg?v=1674522259", category: "Health & Beauty", listedBy: "Ilyas Kodri", avatarUrl: "https://t3.ftcdn.net/jpg/06/99/46/60/360_F_699466075_DaPTBNlNQTOwwjkOiFEoOvzDV0ByXR9E.jpg", description: "Supports healthy skin, joints, and hair growth.", price: 229.00, rating: 4.8 },
                { name: "LED Light Therapy Mask", imageUrl: "https://m.media-amazon.com/images/I/61WCSu+WllL.jpg", category: "Health & Beauty", listedBy: "Siham Beqali", avatarUrl: "https://media.licdn.com/dms/image/v2/D4D03AQH_6ajv3kx6sw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1718257568018?e=2147483647&v=beta&t=GC1r7KdJxjZNMHCLHmurdIJvyyR2-nkYJ3ovHmcDB9w", description: "Advanced skincare device that helps treat acne and reduce wrinkles.", price: 699.00, rating: 4.4 },
                { name: "Electric Scalp Massager", imageUrl: "https://odo-cdn.imgix.net/catalog/product/1/7/1721196941.4641.png?auto=compress,format&w=800&h=800&bg=fff&fit=fill", category: "Health & Beauty", listedBy: "Oussama Zerhouni", avatarUrl: "https://www.mensjournal.com/.image/t_share/MTk2MTM2NTcwNDMxMjg0NzQx/man-taking-selfie.jpg", description: "Stimulates scalp circulation and relieves tension.", price: 159.00, rating: 4.3 },
                { name: "Organic Turmeric Capsules", imageUrl: "https://m.media-amazon.com/images/I/71+Q1yuT5dL.jpg", category: "Health & Beauty", listedBy: "Nawal Laamri", avatarUrl: "https://img.freepik.com/premium-photo/woman-wearing-black-head-scarf_777078-39469.jpg", description: "Anti-inflammatory capsules made with organic turmeric.", price: 139.00, rating: 4.6 },
                { name: "Cold Pressed Facial Oil (Argan or Rosehip)", imageUrl: "https://www.gosupps.com/media/catalog/product/cache/25/small_image/1500x1650/9df78eab33525d08d6e5fb8d27136e95/6/1/611weDc8loL.jpg", category: "Health & Beauty", listedBy: "Nawal Laamri", avatarUrl: "https://img.freepik.com/premium-photo/woman-wearing-black-head-scarf_777078-39469.jpg", description: "Hydrating and healing oil suitable for all skin types.", price: 179.00, rating: 4.7 },
                { name: "Matcha Green Tea Powder", imageUrl: "https://m.media-amazon.com/images/I/71Z02sRW0lL.jpg", category: "Food & Drinks", listedBy: "Ilyas Kodri", avatarUrl: "https://t3.ftcdn.net/jpg/06/99/46/60/360_F_699466075_DaPTBNlNQTOwwjkOiFEoOvzDV0ByXR9E.jpg", description: "Premium matcha powder rich in antioxidants.", price: 129.00, rating: 4.8 },
                { name: "Artisan Hot Sauce Pack", imageUrl: "https://secretkiwikitchen.com/cdn/shop/products/Hotsaucekitingredeints.png?v=1661475764&width=1445", category: "Food & Drinks", listedBy: "Siham Beqali", avatarUrl: "https://media.licdn.com/dms/image/v2/D4D03AQH_6ajv3kx6sw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1718257568018?e=2147483647&v=beta&t=GC1r7KdJxjZNMHCLHmurdIJvyyR2-nkYJ3ovHmcDB9w", description: "A spicy gourmet collection for hot sauce lovers.", price: 189.00, rating: 4.5 },
                { name: "Keto Protein Bars", imageUrl: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/thk/thk71948/l/10.jpg", category: "Food & Drinks", listedBy: "Oussama Zerhouni", avatarUrl: "https://www.mensjournal.com/.image/t_share/MTk2MTM2NTcwNDMxMjg0NzQx/man-taking-selfie.jpg", description: "Low-carb bars perfect for a ketogenic lifestyle.", price: 99.00, rating: 4.4 },
                { name: "Cold Brew Coffee Concentrate", imageUrl: "https://www.gradyscoldbrew.com/cdn/shop/products/GCB_CLASSIC_32OZ_Web_1024X1024_1024x1024_ffaa34d3-9e09-403a-b2e9-27f7d2ea44cc.jpg?v=1681412750", category: "Food & Drinks", listedBy: "Nawal Laamri", avatarUrl: "https://img.freepik.com/premium-photo/woman-wearing-black-head-scarf_777078-39469.jpg", description: "Smooth and strong cold brew coffee, ready to drink.", price: 149.00, rating: 4.6 },
                { name: "Dehydrated Fruit Snack Packs", imageUrl: "https://m.media-amazon.com/images/I/815qcIw61SL._UF894,1000_QL80_.jpg", category: "Food & Drinks", listedBy: "Nawal Laamri", avatarUrl: "https://img.freepik.com/premium-photo/woman-wearing-black-head-scarf_777078-39469.jpg", description: "Healthy and portable fruit snacks made with no added sugar.", price: 89.00, rating: 4.2 },
                { name: "Wireless Charging Pad", imageUrl: "https://www.cnet.com/a/img/resize/8dfd582b861be518dcb968d1f1b6de01ef114961/hub/2023/02/28/9da2e9c7-d07d-45cb-89d1-18c7013249e5/anker-315-wireless-charger.png?auto=webp&fit=crop&height=900&width=1200", category: "Technology", listedBy: "Ilyas Kodri", avatarUrl: "https://t3.ftcdn.net/jpg/06/99/46/60/360_F_699466075_DaPTBNlNQTOwwjkOiFEoOvzDV0ByXR9E.jpg", description: "Effortless charging pad for phones and earbuds.", price: 249.00, rating: 4.5 },
                { name: "Smart Home Plug", imageUrl: "https://cdn.thewirecutter.com/wp-content/media/2025/06/smart-plug-2048px-2207.jpg", category: "Technology", listedBy: "Siham Beqali", avatarUrl: "https://media.licdn.com/dms/image/v2/D4D03AQH_6ajv3kx6sw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1718257568018?e=2147483647&v=beta&t=GC1r7KdJxjZNMHCLHmurdIJvyyR2-nkYJ3ovHmcDB9w", description: "Convert your electronics into smart home devices.", price: 129.00, rating: 4.4 },
                { name: "Noise-Canceling Bluetooth Headphones", imageUrl: "https://media.very.ie/i/littlewoodsireland/WHLBI_SQ1_0000000020_BLUE_SLf?$pdp_300x400_x2$&fmt=jpg", category: "Technology", listedBy: "Ilyas Kodri", avatarUrl: "https://t3.ftcdn.net/jpg/06/99/46/60/360_F_699466075_DaPTBNlNQTOwwjkOiFEoOvzDV0ByXR9E.jpg", description: "Perfect for remote work, travel, or gaming.", price: 599.00, rating: 4.7 },
                { name: "Mini Portable Projector", imageUrl: "https://images-cdn.ubuy.co.in/639caa159c88a479ef686f03-yaber-pico-t1-mini-pocket-projector-with.jpg", category: "Technology", listedBy: "Siham Beqali", avatarUrl: "https://media.licdn.com/dms/image/v2/D4D03AQH_6ajv3kx6sw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1718257568018?e=2147483647&v=beta&t=GC1r7KdJxjZNMHCLHmurdIJvyyR2-nkYJ3ovHmcDB9w", description: "Portable projector for movies and presentations anywhere.", price: 799.00, rating: 4.6 },
                { name: "AI-Powered Fitness Tracker Ring", imageUrl: "https://cdn.mos.cms.futurecdn.net/QZKWQpLHM6LrUAGaxv5hoK.jpg", category: "Technology", listedBy: "Oussama Zerhouni", avatarUrl: "https://www.mensjournal.com/.image/t_share/MTk2MTM2NTcwNDMxMjg0NzQx/man-taking-selfie.jpg", description: "Discreet fitness tracker with smart health insights.", price: 399.00, rating: 4.3 }
            ];
        }
    } catch (error) {
        console.warn('Error fetching products, using static data:', error);
        products = [
            { name: "Oversized Denim Jacket", imageUrl: "https://amsupplymenswear.com/cdn/shop/products/MWO17475-33DENIMBLUE_1.jpg?v=1667187857", category: "Fashion", listedBy: "Ilyas Kodri", avatarUrl: "https://t3.ftcdn.net/jpg/06/99/46/60/360_F_699466075_DaPTBNlNQTOwwjkOiFEoOvzDV0ByXR9E.jpg", description: "A timeless streetwear staple for both men and women.", price: 349.00, rating: 4.5 },
            { name: "Chunky Sneakers", imageUrl: "https://m.media-amazon.com/images/I/61NM58P8z9L.jpg", category: "Fashion", listedBy: "Siham Beqali", avatarUrl: "https://media.licdn.com/dms/image/v2/D4D03AQH_6ajv3kx6sw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1718257568018?e=2147483647&v=beta&t=GC1r7KdJxjZNMHCLHmurdIJvyyR2-nkYJ3ovHmcDB9w", description: "Bold and comfortable sneakers trending in urban fashion.", price: 499.00, rating: 4.7 },
            { name: "Minimalist Leather Wallet", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOQ_HDFuUErBi--aLtwQNrA3BCFFOz5rgYZQ&s", category: "Fashion", listedBy: "Oussama Zerhouni", avatarUrl: "https://www.mensjournal.com/.image/t_share/MTk2MTM2NTcwNDMxMjg0NzQx/man-taking-selfie.jpg", description: "Slim and stylish wallet for everyday use.", price: 199.00, rating: 4.3 },
            { name: "Unisex Bucket Hat", imageUrl: "https://assets-prod.porsche.com/assets/74429c34-526f-41e4-8aef-e6248c736af1.webp", category: "Fashion", listedBy: "Nawal Laamri", avatarUrl: "https://img.freepik.com/premium-photo/woman-wearing-black-head-scarf_777078-39469.jpg", description: "Trendy and protective hat perfect for festivals or summer days.", price: 129.00, rating: 4.2 },
            { name: "Smartwatch-Compatible Sportswear", imageUrl: "https://i5.walmartimages.com/seo/STA-Smart-Watch-for-Android-and-iPhone-1-95-Smartwatch-for-Men-Women-Fitness-Activity-Tracker-Black_134d28af-c611-46fe-b9df-ef24faf4b8f5.6f594b4535a828a30faf59b460e3aa0f.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF", category: "Fashion", listedBy: "Oussama Zerhouni", avatarUrl: "https://www.mensjournal.com/.image/t_share/MTk2MTM2NTcwNDMxMjg0NzQx/man-taking-selfie.jpg", description: "Tech-integrated activewear with pockets for your smartwatch.", price: 279.00, rating: 4.6 },
            { name: "Collagen Peptides Powder", imageUrl: "https://sandhus.com/cdn/shop/products/CollagenPeptides-F-Mockup-1200px.jpg?v=1674522259", category: "Health & Beauty", listedBy: "Ilyas Kodri", avatarUrl: "https://t3.ftcdn.net/jpg/06/99/46/60/360_F_699466075_DaPTBNlNQTOwwjkOiFEoOvzDV0ByXR9E.jpg", description: "Supports healthy skin, joints, and hair growth.", price: 229.00, rating: 4.8 },
            { name: "LED Light Therapy Mask", imageUrl: "https://m.media-amazon.com/images/I/61WCSu+WllL.jpg", category: "Health & Beauty", listedBy: "Siham Beqali", avatarUrl: "https://media.licdn.com/dms/image/v2/D4D03AQH_6ajv3kx6sw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1718257568018?e=2147483647&v=beta&t=GC1r7KdJxjZNMHCLHmurdIJvyyR2-nkYJ3ovHmcDB9w", description: "Advanced skincare device that helps treat acne and reduce wrinkles.", price: 699.00, rating: 4.4 },
            { name: "Electric Scalp Massager", imageUrl: "https://odo-cdn.imgix.net/catalog/product/1/7/1721196941.4641.png?auto=compress,format&w=800&h=800&bg=fff&fit=fill", category: "Health & Beauty", listedBy: "Oussama Zerhouni", avatarUrl: "https://www.mensjournal.com/.image/t_share/MTk2MTM2NTcwNDMxMjg0NzQx/man-taking-selfie.jpg", description: "Stimulates scalp circulation and relieves tension.", price: 159.00, rating: 4.3 },
            { name: "Organic Turmeric Capsules", imageUrl: "https://m.media-amazon.com/images/I/71+Q1yuT5dL.jpg", category: "Health & Beauty", listedBy: "Nawal Laamri", avatarUrl: "https://img.freepik.com/premium-photo/woman-wearing-black-head-scarf_777078-39469.jpg", description: "Anti-inflammatory capsules made with organic turmeric.", price: 139.00, rating: 4.6 },
            { name: "Cold Pressed Facial Oil (Argan or Rosehip)", imageUrl: "https://www.gosupps.com/media/catalog/product/cache/25/small_image/1500x1650/9df78eab33525d08d6e5fb8d27136e95/6/1/611weDc8loL.jpg", category: "Health & Beauty", listedBy: "Nawal Laamri", avatarUrl: "https://img.freepik.com/premium-photo/woman-wearing-black-head-scarf_777078-39469.jpg", description: "Hydrating and healing oil suitable for all skin types.", price: 179.00, rating: 4.7 },
            { name: "Matcha Green Tea Powder", imageUrl: "https://m.media-amazon.com/images/I/71Z02sRW0lL.jpg", category: "Food & Drinks", listedBy: "Ilyas Kodri", avatarUrl: "https://t3.ftcdn.net/jpg/06/99/46/60/360_F_699466075_DaPTBNlNQTOwwjkOiFEoOvzDV0ByXR9E.jpg", description: "Premium matcha powder rich in antioxidants.", price: 129.00, rating: 4.8 },
            { name: "Artisan Hot Sauce Pack", imageUrl: "https://secretkiwikitchen.com/cdn/shop/products/Hotsaucekitingredeints.png?v=1661475764&width=1445", category: "Food & Drinks", listedBy: "Siham Beqali", avatarUrl: "https://media.licdn.com/dms/image/v2/D4D03AQH_6ajv3kx6sw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1718257568018?e=2147483647&v=beta&t=GC1r7KdJxjZNMHCLHmurdIJvyyR2-nkYJ3ovHmcDB9w", description: "A spicy gourmet collection for hot sauce lovers.", price: 189.00, rating: 4.5 },
            { name: "Keto Protein Bars", imageUrl: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/thk/thk71948/l/10.jpg", category: "Food & Drinks", listedBy: "Oussama Zerhouni", avatarUrl: "https://www.mensjournal.com/.image/t_share/MTk2MTM2NTcwNDMxMjg0NzQx/man-taking-selfie.jpg", description: "Low-carb bars perfect for a ketogenic lifestyle.", price: 99.00, rating: 4.4 },
            { name: "Cold Brew Coffee Concentrate", imageUrl: "https://www.gradyscoldbrew.com/cdn/shop/products/GCB_CLASSIC_32OZ_Web_1024X1024_1024x1024_ffaa34d3-9e09-403a-b2e9-27f7d2ea44cc.jpg?v=1681412750", category: "Food & Drinks", listedBy: "Nawal Laamri", avatarUrl: "https://img.freepik.com/premium-photo/woman-wearing-black-head-scarf_777078-39469.jpg", description: "Smooth and strong cold brew coffee, ready to drink.", price: 149.00, rating: 4.6 },
            { name: "Dehydrated Fruit Snack Packs", imageUrl: "https://m.media-amazon.com/images/I/815qcIw61SL._UF894,1000_QL80_.jpg", category: "Food & Drinks", listedBy: "Nawal Laamri", avatarUrl: "https://img.freepik.com/premium-photo/woman-wearing-black-head-scarf_777078-39469.jpg", description: "Healthy and portable fruit snacks made with no added sugar.", price: 89.00, rating: 4.2 },
            { name: "Wireless Charging Pad", imageUrl: "https://www.cnet.com/a/img/resize/8dfd582b861be518dcb968d1f1b6de01ef114961/hub/2023/02/28/9da2e9c7-d07d-45cb-89d1-18c7013249e5/anker-315-wireless-charger.png?auto=webp&fit=crop&height=900&width=1200", category: "Technology", listedBy: "Ilyas Kodri", avatarUrl: "https://t3.ftcdn.net/jpg/06/99/46/60/360_F_699466075_DaPTBNlNQTOwwjkOiFEoOvzDV0ByXR9E.jpg", description: "Effortless charging pad for phones and earbuds.", price: 249.00, rating: 4.5 },
            { name: "Smart Home Plug", imageUrl: "https://cdn.thewirecutter.com/wp-content/media/2025/06/smart-plug-2048px-2207.jpg", category: "Technology", listedBy: "Siham Beqali", avatarUrl: "https://media.licdn.com/dms/image/v2/D4D03AQH_6ajv3kx6sw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1718257568018?e=2147483647&v=beta&t=GC1r7KdJxjZNMHCLHmurdIJvyyR2-nkYJ3ovHmcDB9w", description: "Convert your electronics into smart home devices.", price: 129.00, rating: 4.4 },
            { name: "Noise-Canceling Bluetooth Headphones", imageUrl: "https://media.very.ie/i/littlewoodsireland/WHLBI_SQ1_0000000020_BLUE_SLf?$pdp_300x400_x2$&fmt=jpg", category: "Technology", listedBy: "Ilyas Kodri", avatarUrl: "https://t3.ftcdn.net/jpg/06/99/46/60/360_F_699466075_DaPTBNlNQTOwwjkOiFEoOvzDV0ByXR9E.jpg", description: "Perfect for remote work, travel, or gaming.", price: 599.00, rating: 4.7 },
            { name: "Mini Portable Projector", imageUrl: "https://images-cdn.ubuy.co.in/639caa159c88a479ef686f03-yaber-pico-t1-mini-pocket-projector-with.jpg", category: "Technology", listedBy: "Siham Beqali", avatarUrl: "https://media.licdn.com/dms/image/v2/D4D03AQH_6ajv3kx6sw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1718257568018?e=2147483647&v=beta&t=GC1r7KdJxjZNMHCLHmurdIJvyyR2-nkYJ3ovHmcDB9w", description: "Portable projector for movies and presentations anywhere.", price: 799.00, rating: 4.6 },
            { name: "AI-Powered Fitness Tracker Ring", imageUrl: "https://cdn.mos.cms.futurecdn.net/QZKWQpLHM6LrUAGaxv5hoK.jpg", category: "Technology", listedBy: "Oussama Zerhouni", avatarUrl: "https://www.mensjournal.com/.image/t_share/MTk2MTM2NTcwNDMxMjg0NzQx/man-taking-selfie.jpg", description: "Discreet fitness tracker with smart health insights.", price: 399.00, rating: 4.3 }
        ];
    }
}

// Initialize data on page load
async function initializeData() {
    // Load admin profile first
    await loadAdminProfile();
    
    await Promise.all([
        fetchCategories(),
        fetchUsers(),
        fetchProducts()
    ]);
    console.log('All data initialized');
}

// Dashboard rendering function
async function renderDashboardPage() {
    const totalProducts = products.length;
    const totalUsers = users.length;
    
    // Fetch order statistics from backend
    let totalOrders = 16; // Default fallback
    let totalDelivered = 4; // Default fallback
    let totalConfirmed = 8; // Default fallback
    
    try {
        const response = await fetch(`${API_BASE_URL}/orders/statistics`);
        if (response.ok) {
            const stats = await response.json();
            totalOrders = stats.totalOrders;
            totalDelivered = stats.deliveredOrders;
            totalConfirmed = stats.confirmedOrders;
        }
    } catch (error) {
        console.warn('Failed to fetch order statistics, using default values:', error);
    }
    
    // Get top-rated products (sorted by rating, then by price for tie-breaking)
    const topRatedProducts = [...products]
        .sort((a, b) => {
            if (b.rating !== a.rating) {
                return b.rating - a.rating;
            }
            return b.price - a.price; // Higher price as tie-breaker
        })
        .slice(0, 5);
    
    // Get top-selling products (simulated based on price and rating)
    const topSellingProducts = [...products]
        .sort((a, b) => {
            // Simulate sales based on rating and price combination
            const aScore = (a.rating * 0.7) + (a.price / 1000 * 0.3);
            const bScore = (b.rating * 0.7) + (b.price / 1000 * 0.3);
            return bScore - aScore;
        })
        .slice(0, 5);

    const dashboardHTML = `
        <div class="dashboard-container">
            <!-- Statistics Cards -->
            <div class="row mb-4">
                <div class="col-md-6 col-lg-3 mb-3">
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-box"></i>
                        </div>
                        <div class="stat-content">
                            <h3 class="stat-number">${totalProducts}</h3>
                            <p class="stat-label">Total Products</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-3 mb-3">
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="stat-content">
                            <h3 class="stat-number">${totalUsers}</h3>
                            <p class="stat-label">Total Users</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-3 mb-3">
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-shopping-cart"></i>
                        </div>
                        <div class="stat-content">
                            <h3 class="stat-number">${totalOrders}</h3>
                            <p class="stat-label">Total Orders</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-3 mb-3">
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="stat-content">
                            <h3 class="stat-number">${totalConfirmed}</h3>
                            <p class="stat-label">Confirmed Orders</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-3 mb-3">
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-truck"></i>
                        </div>
                        <div class="stat-content">
                            <h3 class="stat-number">${totalDelivered}</h3>
                            <p class="stat-label">Delivered Orders</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-3 mb-3">
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-tags"></i>
                        </div>
                        <div class="stat-content">
                            <h3 class="stat-number">${categories.length}</h3>
                            <p class="stat-label">Categories</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-3 mb-3">
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-star"></i>
                        </div>
                        <div class="stat-content">
                            <h3 class="stat-number">${(products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1)}</h3>
                            <p class="stat-label">Avg Rating</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Top Rated Products -->
            <div class="row mb-4">
                <div class="col-12">
                    <div class="section-card">
                        <div class="section-header">
                            <h4><i class="fas fa-star text-warning"></i> Top Rated Products</h4>
                            <p class="text-muted">Products with the highest customer ratings</p>
                        </div>
                        <div class="row">
                            ${topRatedProducts.map(product => `
                                <div class="col-md-6 col-lg-4 mb-3">
                                    <div class="product-card-small">
                                        <div class="product-image-small">
                                            <img src="${product.imageUrl}" alt="${product.name}" class="img-fluid">
                                        </div>
                                        <div class="product-info-small">
                                            <h6 class="product-name">${product.name}</h6>
                                            <div class="product-meta">
                                                <span class="rating">
                                                    <i class="fas fa-star text-warning"></i>
                                                    ${product.rating}
                                                </span>
                                                <span class="price">DH${product.price}</span>
                                            </div>
                                            <small class="text-muted">${product.category} • ${product.listedBy}</small>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Top Selling Products -->
            <div class="row">
                <div class="col-12">
                    <div class="section-card">
                        <div class="section-header">
                            <h4><i class="fas fa-chart-line text-success"></i> Top Selling Products</h4>
                            <p class="text-muted">Best performing products based on sales metrics</p>
                        </div>
                        <div class="row">
                            ${topSellingProducts.map(product => `
                                <div class="col-md-6 col-lg-4 mb-3">
                                    <div class="product-card-small">
                                        <div class="product-image-small">
                                            <img src="${product.imageUrl}" alt="${product.name}" class="img-fluid">
                                        </div>
                                        <div class="product-info-small">
                                            <h6 class="product-name">${product.name}</h6>
                                            <div class="product-meta">
                                                <span class="rating">
                                                    <i class="fas fa-star text-warning"></i>
                                                    ${product.rating}
                                                </span>
                                                <span class="price">DH${product.price}</span>
                                            </div>
                                            <small class="text-muted">${product.category} • ${product.listedBy}</small>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.querySelector('.app-content').innerHTML = dashboardHTML;
}

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

function renderUsersPage() {
    const usersHTML = `
        <div class="users-page">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h2><i class="fas fa-users"></i> Users Management</h2>
                <div class="user-stats">
                    <span class="badge bg-primary">${users.length} Total Users</span>
                    <span class="badge bg-success">${users.filter(u => !u.isBlocked && !u.isRestricted).length} Active</span>
                    <span class="badge bg-warning">${users.filter(u => u.isBlocked).length} Blocked</span>
                    <span class="badge bg-info">${users.filter(u => u.isRestricted).length} Restricted</span>
                </div>
            </div>
            
            <div class="row">
                ${users.map(user => `
                    <div class="col-md-6 col-lg-4 mb-4">
                        <div class="user-card" onclick="showUserDetails(${user.id})" style="cursor: pointer;">
                            <div class="user-header">
                                <img src="${user.imageUrl}" alt="${user.name}" class="user-profile-img">
                                <div class="user-status">
                                    ${user.isBlocked ? '<span class="status-badge blocked"><i class="fas fa-ban"></i> Blocked</span>' : ''}
                                    ${user.isRestricted ? '<span class="status-badge restricted"><i class="fas fa-lock"></i> Restricted</span>' : ''}
                                    ${!user.isBlocked && !user.isRestricted ? '<span class="status-badge active"><i class="fas fa-check-circle"></i> Active</span>' : ''}
                                </div>
                            </div>
                            <div class="user-details">
                                <h5 class="user-name">${user.name}</h5>
                                <div class="user-info">
                                    <span><i class="fas fa-envelope"></i> ${user.email}</span>
                                    <span><i class="fas fa-phone"></i> ${user.phoneNumber}</span>
                                </div>
                                <div class="user-actions" onclick="event.stopPropagation();">
                                    <div class="btn-group" role="group">
                                        ${user.isBlocked ? 
                                            `<button class="btn btn-success btn-sm" onclick="unblockUser('${user.name}')">
                                                <i class="fas fa-unlock"></i> Unblock
                                            </button>` : 
                                            `<button class="btn btn-warning btn-sm" onclick="blockUser('${user.name}')">
                                                <i class="fas fa-ban"></i> Block
                                            </button>`
                                        }
                                        
                                        ${user.isRestricted ? 
                                            `<button class="btn btn-info btn-sm" onclick="unrestrictUser('${user.name}')">
                                                <i class="fas fa-unlock-alt"></i> Unrestrict
                                            </button>` : 
                                            `<button class="btn btn-secondary btn-sm" onclick="restrictUser('${user.name}')">
                                                <i class="fas fa-lock"></i> Restrict
                                            </button>`
                                        }
                                        
                                        <button class="btn btn-danger btn-sm" onclick="deleteUser('${user.name}')">
                                            <i class="fas fa-trash"></i> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    document.querySelector('.app-content').innerHTML = usersHTML;
}

// User management functions
async function blockUser(userName) {
    if (confirm(`Are you sure you want to block ${userName}?`)) {
        const user = users.find(u => u.name === userName);
        if (user) {
            try {
                const response = await fetch(`${API_BASE_URL}/users/${user.id}/block`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (response.ok) {
                    const result = await response.json();
                    showNotification(result.message || `User ${userName} has been blocked successfully!`, 'success');
                    await fetchUsers(); // Refresh user data
                    renderUsersPage(); // Refresh the page
                } else {
                    const errorData = await response.json();
                    showNotification(errorData.message || 'Failed to block user', 'danger');
                }
            } catch (error) {
                console.error('Error blocking user:', error);
                showNotification('Network error while blocking user', 'danger');
            }
        }
    }
}

async function unblockUser(userName) {
    if (confirm(`Are you sure you want to unblock ${userName}?`)) {
        const user = users.find(u => u.name === userName);
        if (user) {
            try {
                const response = await fetch(`${API_BASE_URL}/users/${user.id}/unblock`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (response.ok) {
                    const result = await response.json();
                    showNotification(result.message || `User ${userName} has been unblocked successfully!`, 'success');
                    await fetchUsers(); // Refresh user data
                    renderUsersPage(); // Refresh the page
                } else {
                    const errorData = await response.json();
                    showNotification(errorData.message || 'Failed to unblock user', 'danger');
                }
            } catch (error) {
                console.error('Error unblocking user:', error);
                showNotification('Network error while unblocking user', 'danger');
            }
        }
    }
}

async function restrictUser(userName) {
    if (confirm(`Are you sure you want to restrict ${userName}?`)) {
        const user = users.find(u => u.name === userName);
        if (user) {
            try {
                const response = await fetch(`${API_BASE_URL}/users/${user.id}/restrict`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (response.ok) {
                    const result = await response.json();
                    showNotification(result.message || `User ${userName} has been restricted successfully!`, 'success');
                    await fetchUsers(); // Refresh user data
                    renderUsersPage(); // Refresh the page
                } else {
                    const errorData = await response.json();
                    showNotification(errorData.message || 'Failed to restrict user', 'danger');
                }
            } catch (error) {
                console.error('Error restricting user:', error);
                showNotification('Network error while restricting user', 'danger');
            }
        }
    }
}

async function unrestrictUser(userName) {
    if (confirm(`Are you sure you want to remove restrictions from ${userName}?`)) {
        const user = users.find(u => u.name === userName);
        if (user) {
            try {
                const response = await fetch(`${API_BASE_URL}/users/${user.id}/unrestrict`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (response.ok) {
                    const result = await response.json();
                    showNotification(result.message || `Restrictions have been removed from ${userName}!`, 'success');
                    await fetchUsers(); // Refresh user data
                    renderUsersPage(); // Refresh the page
                } else {
                    const errorData = await response.json();
                    showNotification(errorData.message || 'Failed to unrestrict user', 'danger');
                }
            } catch (error) {
                console.error('Error unrestricting user:', error);
                showNotification('Network error while unrestricting user', 'danger');
            }
        }
    }
}

async function deleteUser(userName) {
    if (confirm(`Are you sure you want to delete ${userName}? This action cannot be undone!`)) {
        const user = users.find(u => u.name === userName);
        if (user) {
            try {
                const response = await fetch(`${API_BASE_URL}/users/${user.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (response.ok) {
                    showNotification(`User ${userName} has been deleted successfully!`, 'success');
                    await fetchUsers(); // Refresh user data
                    renderUsersPage(); // Refresh the page
                } else {
                    const errorData = await response.json();
                    showNotification(errorData.message || 'Failed to delete user', 'danger');
                }
            } catch (error) {
                console.error('Error deleting user:', error);
                showNotification('Network error while deleting user', 'danger');
            }
        }
    }
}

// Settings page rendering function
function renderSettingsPage() {
    const settingsHTML = `
        <div class="settings-page">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h2><i class="fas fa-cog"></i> Settings</h2>
                <div class="settings-status">
                    <span class="badge bg-success">Profile Updated</span>
                </div>
            </div>
            
            <div class="row">
                <div class="col-lg-8">
                    <div class="settings-card">
                        <div class="settings-header">
                            <h4><i class="fas fa-user-edit"></i> Profile Information</h4>
                            <p class="text-muted">Update your personal information and account settings</p>
                        </div>
                        
                        <form id="profileForm" class="settings-form">
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="profileName" class="form-label">Full Name</label>
                                    <div class="input-group">
                                        <span class="input-group-text"><i class="fas fa-user"></i></span>
                                        <input type="text" class="form-control" id="profileName" value="${adminProfile.name}" required>
                                    </div>
                                </div>
                                
                                <div class="col-md-6 mb-3">
                                    <label for="profileEmail" class="form-label">Email Address</label>
                                    <div class="input-group">
                                        <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                                        <input type="email" class="form-control" id="profileEmail" value="${adminProfile.email}" required>
                                    </div>
                                </div>
                                
                                <div class="col-md-6 mb-3">
                                    <label for="profilePhone" class="form-label">Phone Number</label>
                                    <div class="input-group">
                                        <span class="input-group-text"><i class="fas fa-phone"></i></span>
                                        <input type="tel" class="form-control" id="profilePhone" value="${adminProfile.phone}" required>
                                    </div>
                                </div>
                                
                                <div class="col-md-6 mb-3">
                                    <label for="profileAvatar" class="form-label">Profile Picture URL</label>
                                    <div class="input-group">
                                        <span class="input-group-text"><i class="fas fa-image"></i></span>
                                        <input type="url" class="form-control" id="profileAvatar" value="${adminProfile.avatarUrl}" required>
                                    </div>
                                </div>
                                
                                <div class="col-md-6 mb-3">
                                    <label for="currentPassword" class="form-label">Current Password</label>
                                    <div class="input-group">
                                        <span class="input-group-text"><i class="fas fa-lock"></i></span>
                                        <input type="password" class="form-control" id="currentPassword" placeholder="Enter current password">
                                    </div>
                                </div>
                                
                                <div class="col-md-6 mb-3">
                                    <label for="newPassword" class="form-label">New Password</label>
                                    <div class="input-group">
                                        <span class="input-group-text"><i class="fas fa-key"></i></span>
                                        <input type="password" class="form-control" id="newPassword" placeholder="Enter new password">
                                    </div>
                                </div>
                                
                                <div class="col-12 mb-3">
                                    <label for="confirmPassword" class="form-label">Confirm New Password</label>
                                    <div class="input-group">
                                        <span class="input-group-text"><i class="fas fa-check-circle"></i></span>
                                        <input type="password" class="form-control" id="confirmPassword" placeholder="Confirm new password">
                                    </div>
                                </div>
                            </div>
                            
                            <div class="settings-actions">
                                <button type="submit" class="btn btn-primary">
                                    <i class="fas fa-save"></i> Save Changes
                                </button>
                                <button type="button" class="btn btn-secondary" onclick="resetForm()">
                                    <i class="fas fa-undo"></i> Reset
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                
                <div class="col-lg-4">
                    <div class="settings-card">
                        <div class="settings-header">
                            <h4><i class="fas fa-eye"></i> Profile Preview</h4>
                            <p class="text-muted">How your profile will appear</p>
                        </div>
                        
                        <div class="profile-preview">
                            <div class="preview-avatar">
                                <img src="${adminProfile.avatarUrl}" alt="Profile Preview" id="previewAvatar" class="img-fluid rounded-circle">
                            </div>
                            <div class="preview-info">
                                <h5 id="previewName">${adminProfile.name}</h5>
                                <p id="previewEmail" class="text-muted">${adminProfile.email}</p>
                                <p id="previewPhone" class="text-muted">${adminProfile.phone}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="settings-card mt-3">
                        <div class="settings-header">
                            <h4><i class="fas fa-palette"></i> Appearance</h4>
                            <p class="text-muted">Customize your dashboard appearance</p>
                        </div>
                        
                        <div class="appearance-settings">
                            <div class="form-check form-switch mb-3">
                                <input class="form-check-input" type="checkbox" id="darkModeToggle" ${adminProfile.darkModeAuto ? 'checked' : ''}>
                                <label class="form-check-label" for="darkModeToggle">
                                    Dark Mode (Auto)
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.querySelector('.app-content').innerHTML = settingsHTML;
    
    // Add event listeners
    setupSettingsEventListeners();
}

// Setup event listeners for settings page
function setupSettingsEventListeners() {
    const form = document.getElementById('profileForm');
    if (form) {
        form.addEventListener('submit', handleProfileSubmit);
    }
    
    // Real-time preview updates
    const inputs = ['profileName', 'profileEmail', 'profilePhone', 'profileAvatar'];
    inputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', updatePreview);
        }
    });

    // Appearance settings change handlers
    const appearanceSettings = ['darkModeToggle'];
    appearanceSettings.forEach(settingId => {
        const setting = document.getElementById(settingId);
        if (setting) {
            setting.addEventListener('change', handleAppearanceSettingChange);
        }
    });
}

// Handle profile form submission
async function handleProfileSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validate password change
    if (newPassword || confirmPassword) {
        if (!currentPassword) {
            showNotification('Current password is required!', 'danger');
            return;
        }
        
        if (newPassword !== confirmPassword) {
            showNotification('New passwords do not match!', 'danger');
            return;
        }
        
        if (newPassword.length < 6) {
            showNotification('New password must be at least 6 characters long!', 'danger');
            return;
        }
    }
    
    // Prepare data for API
    const profileData = {
        name: document.getElementById('profileName').value,
        email: document.getElementById('profileEmail').value,
        phone: document.getElementById('profilePhone').value,
        avatarUrl: document.getElementById('profileAvatar').value,
    };

    // Add password change if needed
    if (newPassword) {
        profileData.currentPassword = currentPassword;
        profileData.newPassword = newPassword;
    }

    const settingsData = {
        darkModeAuto: document.getElementById('darkModeToggle').checked,
    };

    const success = await saveAdminProfile(profileData);
    if (success) {
        await updateAdminSettings(settingsData);
    }
    
    // Clear password fields
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
    
    // Update preview
    updatePreview();
}

// Handle appearance setting changes
async function handleAppearanceSettingChange() {
    const settingsData = {
        darkModeAuto: document.getElementById('darkModeToggle').checked,
    };

    await updateAdminSettings(settingsData);
}

// Update profile preview in real-time
function updatePreview() {
    const nameInput = document.getElementById('profileName');
    const emailInput = document.getElementById('profileEmail');
    const phoneInput = document.getElementById('profilePhone');
    const avatarInput = document.getElementById('profileAvatar');
    
    if (nameInput) {
        document.getElementById('previewName').textContent = nameInput.value || adminProfile.name;
    }
    
    if (emailInput) {
        document.getElementById('previewEmail').textContent = emailInput.value || adminProfile.email;
    }
    
    if (phoneInput) {
        document.getElementById('previewPhone').textContent = phoneInput.value || adminProfile.phone;
    }
    
    if (avatarInput) {
        const previewAvatar = document.getElementById('previewAvatar');
        if (previewAvatar) {
            previewAvatar.src = avatarInput.value || adminProfile.avatarUrl;
        }
    }
}

// Reset form to original values
function resetForm() {
    if (confirm('Are you sure you want to reset all changes?')) {
        document.getElementById('profileName').value = adminProfile.name;
        document.getElementById('profileEmail').value = adminProfile.email;
        document.getElementById('profilePhone').value = adminProfile.phone;
        document.getElementById('profileAvatar').value = adminProfile.avatarUrl;
        document.getElementById('currentPassword').value = '';
        document.getElementById('newPassword').value = '';
        document.getElementById('confirmPassword').value = '';
        
        updatePreview();
        showNotification('Form reset to original values!', 'info');
    }
}

// Notification function
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show notification-toast`;
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Show user details modal
function showUserDetails(userId) {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    const modalHTML = `
        <div class="modal fade" id="userModal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header bg-gradient" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                        <h5 class="modal-title text-white"><i class="fas fa-user-circle me-2"></i>User Details</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body p-4">
                        <div class="row">
                            <div class="col-md-4 text-center mb-3">
                                <img src="${user.imageUrl}" alt="${user.name}" class="img-fluid rounded-circle mb-3" style="width: 150px; height: 150px; object-fit: cover; border: 4px solid #667eea;">
                                <div class="mb-2">
                                    ${user.isBlocked ? '<span class="badge bg-warning fs-6"><i class="fas fa-ban"></i> Blocked</span>' : ''}
                                    ${user.isRestricted ? '<span class="badge bg-info fs-6"><i class="fas fa-lock"></i> Restricted</span>' : ''}
                                    ${!user.isBlocked && !user.isRestricted ? '<span class="badge bg-success fs-6"><i class="fas fa-check-circle"></i> Active</span>' : ''}
                                </div>
                            </div>
                            <div class="col-md-8">
                                <h3 class="mb-3 text-primary">${user.name}</h3>
                                <div class="user-detail-section">
                                    <div class="detail-item mb-3">
                                        <label class="fw-bold text-muted d-block mb-1"><i class="fas fa-envelope text-primary me-2"></i>Email</label>
                                        <span class="fs-5">${user.email}</span>
                                    </div>
                                    <div class="detail-item mb-3">
                                        <label class="fw-bold text-muted d-block mb-1"><i class="fas fa-phone text-primary me-2"></i>Phone Number</label>
                                        <span class="fs-5">${user.phoneNumber}</span>
                                    </div>
                                    <div class="detail-item mb-3">
                                        <label class="fw-bold text-muted d-block mb-1"><i class="fas fa-id-card text-primary me-2"></i>User ID</label>
                                        <span class="fs-5">#${user.id}</span>
                                    </div>
                                    <div class="detail-item mb-3">
                                        <label class="fw-bold text-muted d-block mb-1"><i class="fas fa-info-circle text-primary me-2"></i>Account Status</label>
                                        <div class="mt-2">
                                            ${user.isBlocked ? '<span class="badge bg-warning me-2">Blocked</span>' : '<span class="badge bg-success me-2">Not Blocked</span>'}
                                            ${user.isRestricted ? '<span class="badge bg-info">Restricted</span>' : '<span class="badge bg-secondary">No Restrictions</span>'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            <i class="fas fa-times me-1"></i>Close
                        </button>
                        ${user.isBlocked ? 
                            `<button class="btn btn-success" onclick="unblockUser('${user.name}'); bootstrap.Modal.getInstance(document.getElementById('userModal')).hide();">
                                <i class="fas fa-unlock me-1"></i>Unblock User
                            </button>` : 
                            `<button class="btn btn-warning" onclick="blockUser('${user.name}'); bootstrap.Modal.getInstance(document.getElementById('userModal')).hide();">
                                <i class="fas fa-ban me-1"></i>Block User
                            </button>`
                        }
                        <button class="btn btn-danger" onclick="deleteUser('${user.name}'); bootstrap.Modal.getInstance(document.getElementById('userModal')).hide();">
                            <i class="fas fa-trash me-1"></i>Delete User
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Remove existing modal if any
    const existingModal = document.getElementById('userModal');
    if (existingModal) existingModal.remove();

    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('userModal'));
    modal.show();
}

// Show product details modal
function showProductDetails(productName) {
    const product = products.find(p => p.name === productName);
    if (!product) return;

    const modalHTML = `
        <div class="modal fade" id="productModal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered modal-xl">
                <div class="modal-content">
                    <div class="modal-header bg-gradient" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                        <h5 class="modal-title text-white"><i class="fas fa-box-open me-2"></i>Product Details</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body p-4">
                        <div class="row">
                            <div class="col-md-5 text-center mb-3">
                                <div class="product-image-container p-3" style="background: #f8f9fa; border-radius: 15px;">
                                    <img src="${product.imageUrl}" alt="${product.name}" class="img-fluid" style="max-height: 300px; object-fit: contain;">
                                </div>
                                <div class="mt-3">
                                    <span class="badge bg-warning text-dark fs-5 px-3 py-2">
                                        <i class="fas fa-star"></i> ${product.rating} Rating
                                    </span>
                                </div>
                            </div>
                            <div class="col-md-7">
                                <h2 class="mb-3 text-primary">${product.name}</h2>
                                
                                <div class="detail-item mb-4">
                                    <label class="fw-bold text-muted d-block mb-2"><i class="fas fa-align-left text-primary me-2"></i>Description</label>
                                    <p class="fs-6">${product.description}</p>
                                </div>

                                <div class="row mb-3">
                                    <div class="col-md-6">
                                        <div class="detail-item mb-3">
                                            <label class="fw-bold text-muted d-block mb-1"><i class="fas fa-tag text-primary me-2"></i>Price</label>
                                            <span class="fs-3 fw-bold text-success">DH${product.price.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="detail-item mb-3">
                                            <label class="fw-bold text-muted d-block mb-1"><i class="fas fa-folder text-primary me-2"></i>Category</label>
                                            <span class="badge bg-primary fs-6">${product.category}</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="detail-item mb-3 p-3" style="background: #f8f9fa; border-radius: 10px;">
                                    <label class="fw-bold text-muted d-block mb-2"><i class="fas fa-user text-primary me-2"></i>Listed By</label>
                                    <div class="d-flex align-items-center">
                                        <img src="${product.avatarUrl}" alt="${product.listedBy}" class="rounded-circle me-3" style="width: 50px; height: 50px; object-fit: cover; border: 2px solid #667eea;">
                                        <div>
                                            <div class="fw-bold fs-5">${product.listedBy}</div>
                                            <small class="text-muted">Product Seller</small>
                                        </div>
                                    </div>
                                </div>

                                <div class="detail-item">
                                    <label class="fw-bold text-muted d-block mb-2"><i class="fas fa-star-half-alt text-primary me-2"></i>Customer Rating</label>
                                    <div class="d-flex align-items-center">
                                        ${Array(5).fill(0).map((_, i) => 
                                            `<i class="fas fa-star ${i < Math.floor(product.rating) ? 'text-warning' : 'text-muted'}" style="font-size: 1.5rem;"></i>`
                                        ).join('')}
                                        <span class="ms-3 fs-5 fw-bold">${product.rating} / 5.0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            <i class="fas fa-times me-1"></i>Close
                        </button>
                        <button type="button" class="btn btn-primary">
                            <i class="fas fa-edit me-1"></i>Edit Product
                        </button>
                        <button type="button" class="btn btn-danger">
                            <i class="fas fa-trash me-1"></i>Delete Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Remove existing modal if any
    const existingModal = document.getElementById('productModal');
    if (existingModal) existingModal.remove();

    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('productModal'));
    modal.show();
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
                        <div class="card product-card h-100 p-3" onclick="showProductDetails('${product.name.replace(/'/g, "\\'")}')" style="cursor: pointer;">
                            <img src="${product.imageUrl}" class="card-img-top product-img mb-3" alt="${product.name}">
                            <div class="card-body p-0">
                                <h5 class="card-title fw-bold mb-1">${product.name}</h5>
                                <div class="mb-2 text-muted small d-flex align-items-center">
                                    <img src="${product.avatarUrl}" class="user-avatar me-2" alt="${product.listedBy}">
                                    ${product.category} &bull; Listed by: ${product.listedBy}
                                </div>
                                <p class="card-text mb-2">${product.description}</p>
                                <div class="d-flex justify-content-between align-items-center mt-2">
                                    <span class="fw-bold text-primary">DH${product.price.toFixed(2)}</span>
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

function renderOrdersPage() {
    // Simulate orders: 16 out of 20 products have orders
    const orderStatuses = [
        ...Array(8).fill('Confirmed'),
        ...Array(4).fill('Delivered'),
        ...Array(4).fill('Not Confirmed')
    ];
    // Shuffle products for demo
    const shuffledProducts = [...products].sort(() => Math.random() - 0.5);
    const orderedProducts = shuffledProducts.slice(0, 16);
    const orders = orderedProducts.map((product, i) => ({
        orderNumber: 1001 + i,
        product,
        status: orderStatuses[i]
    }));
    
    const main = document.querySelector('.app-content');
    main.innerHTML = `
        <div class="orders-page">
            <div class="d-flex align-items-center mb-4">
                <h2 class="mb-0"><i class="fas fa-shopping-cart me-2"></i>Orders</h2>
                <span class="badge bg-primary ms-3">${orders.length} Orders</span>
            </div>
            <div class="row g-4">
                ${orders.map(order => `
                    <div class="col-12 col-md-6 col-lg-4">
                        <div class="card h-100 p-3 order-card">
                            <div class="d-flex align-items-center mb-2">
                                <span class="badge bg-secondary me-2">#${order.orderNumber}</span>
                                <span class="badge ${order.status === 'Delivered' ? 'bg-success' : order.status === 'Confirmed' ? 'bg-info text-dark' : 'bg-warning text-dark'}">${order.status}</span>
                            </div>
                            <div class="d-flex align-items-center mb-2">
                                <img src="${order.product.imageUrl}" class="order-product-img me-3" alt="${order.product.name}" style="width:56px;height:56px;object-fit:contain;background:#fff;border-radius:8px;">
                                <div>
                                    <div class="fw-bold">${order.product.name}</div>
                                    <div class="small text-muted">${order.product.category}</div>
                                </div>
                            </div>
                            <div class="d-flex align-items-center justify-content-between mt-2">
                                <span class="fw-bold text-primary">DH${order.product.price.toFixed(2)}</span>
                                <span class="badge bg-warning text-dark"><i class="fas fa-star"></i> ${order.product.rating}</span>
                            </div>
                            <div class="mt-2 small text-muted">Ordered by: <img src="${order.product.avatarUrl}" class="user-avatar me-1" style="width:20px;height:20px;">${order.product.listedBy}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="mt-4 text-muted small">* 4 products have not been ordered yet.</div>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', function() {
    // Check authentication first
    if (!checkAuthentication()) {
        return; // Stop execution if not authenticated
    }

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
                renderDashboardPage().catch(error => {
                    console.error('Error rendering dashboard:', error);
                    showNotification('Error loading dashboard data', 'danger');
                });
            } else if (text === 'Products') {
                renderProductsPage();
            } else if (text === 'Users') {
                renderUsersPage();
            } else if (text === 'Settings') {
                renderSettingsPage();
            } else if (text === 'Orders') {
                renderOrdersPage();
            }
            // Add more navigation as needed
        });
    });

    // Initialize data on page load
    initializeData();
}); 