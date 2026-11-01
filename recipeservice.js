/**
 * RECIPE SERVICE & LOCAL STORAGE REPOSITORY
 * Đảm nhiệm: Quản lý CRUD, lọc danh mục, tìm kiếm và lưu trữ vào LocalStorage.
 */
class RecipeService {
    constructor() {
        this.STORAGE_KEY_RECIPES = 'cook_and_share_recipes';
        this.STORAGE_KEY_CATEGORIES = 'cook_and_share_categories';
        this.initStorage();
    }

    /**
     * Khởi tạo dữ liệu mặc định (Seed Data) nếu LocalStorage đang trống
     */
    initStorage() {
        if (!localStorage.getItem(this.STORAGE_KEY_CATEGORIES)) {
            const defaultCategories = [
                { id: 1, name: 'Tất cả' },
                { id: 2, name: 'Giá rẻ <50k' },
                { id: 3, name: 'Món mặn' },
                { id: 4, name: 'Món chay' },
                { id: 5, name: 'Đồ ngọt' }
            ];
            localStorage.setItem(this.STORAGE_KEY_CATEGORIES, JSON.stringify(defaultCategories));
        }

        if (!localStorage.getItem(this.STORAGE_KEY_RECIPES)) {
            const defaultRecipes = [
                {
                    id: 1,
                    category_id: 3,
                    title: 'Sườn Xào Chua Ngọt',
                    prep_time: '30 phút chuẩn bị',
                    rating: 4.8,
                    price: 65000,
                    image_url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&q=80',
                    ingredients: [
                        '500g sườn non heo',
                        '2 quả cà chua chín',
                        '1 củ hành tây nhỏ',
                        'Giấm, đường, nước mắm, tỏi băm'
                    ],
                    instructions: [
                        'Chặt sườn khúc vừa ăn, chần qua nước sôi rồi ướp gia vị trong 15 phút.',
                        'Rán vàng đều 2 mặt sườn, vớt ra để ráo dầu.',
                        'Pha nước sốt chua ngọt: giấm, đường, mắm, hạt tiêu theo tỷ lệ vừa khẩu vị.',
                        'Phi thơm tỏi, cho sườn và sốt vào đảo đều đến khi sánh sệt lại thì tắt bếp.'
                    ]
                },
                {
                    id: 2,
                    category_id: 2,
                    title: 'Bánh Mì Chảo',
                    prep_time: '15 phút chuẩn bị',
                    rating: 4.7,
                    price: 35000,
                    image_url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=300&q=80',
                    ingredients: [
                        '1 ổ bánh mì giòn',
                        '2 quả trứng gà',
                        '1 cây xúc xích',
                        'Pate gan, bơ lạt, dưa leo'
                    ],
                    instructions: [
                        'Làm nóng chảo gang nhỏ, cho bơ lạt vào đun chảy.',
                        'Đập 2 quả trứng ốp la lòng đào, xếp xúc xích cắt lát và 1 thìa pate vào bên cạnh.',
                        'Rắc chút tiêu, ớt bột và ăn nóng kèm bánh mì.'
                    ]
                },
                {
                    id: 3,
                    category_id: 3,
                    title: 'Cá Kho Tộ',
                    prep_time: '40 phút chuẩn bị',
                    rating: 4.9,
                    price: 70000,
                    image_url: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=300&q=80',
                    ingredients: [
                        '400g cá quả (cá lóc) hoặc cá basa',
                        'Nước mắm ngon, đường, tiêu đen',
                        'Hành tím, ớt chỉ thiên'
                    ],
                    instructions: [
                        'Cắt khúc cá, ướp nước mắm, tiêu, ớt và nước màu trong 20 phút.',
                        'Phi thơm hành trong tộ đất, xếp cá vào đun lửa lớn cho săn thịt.',
                        'Hạ lửa nhỏ, kho liu riu tới khi nước kho sánh keo lại.'
                    ]
                },
                {
                    id: 4,
                    category_id: 2,
                    title: 'Mỳ Ý Sốt Bò Bằm',
                    prep_time: '25 phút chuẩn bị',
                    rating: 4.6,
                    price: 45000,
                    image_url: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=300&q=80',
                    ingredients: [
                        '150g mỳ sợi Spaghetti',
                        '100g thịt bò băm nhuyễn',
                        'Sốt cà chua Bolognese đóng hộp',
                        'Hành tây băm nhỏ'
                    ],
                    instructions: [
                        'Luộc mỳ trong nước sôi có ít muối khoảng 8-10 phút.',
                        'Xào thơm hành tây với thịt bò băm cho chín tới.',
                        'Đổ sốt cà chua vào nấu sôi 3 phút rồi rưới đều lên đĩa mỳ.'
                    ]
                },
                {
                    id: 5,
                    category_id: 3,
                    title: 'Canh Chua Cá Lóc',
                    prep_time: '35 phút chuẩn bị',
                    rating: 4.8,
                    price: 55000,
                    image_url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&q=80',
                    ingredients: [
                        '1 con cá lóc vừa',
                        'Dọc mùng, cà chua, dứa (thơm), đậu bắp, giá đỗ',
                        'Nước cốt me, ngò gai, rau ngổ'
                    ],
                    instructions: [
                        'Nấu sôi nước me rồi cho cá lóc vào luộc chín, vớt bọt liên tục.',
                        'Lần lượt cho dứa, cà chua, đậu bắp, dọc mùng vào nấu sôi lại.',
                        'Nêm nước mắm, đường vừa miệng rồi thả rau thơm và ớt lát lên trên.'
                    ]
                }
            ];
            localStorage.setItem(this.STORAGE_KEY_RECIPES, JSON.stringify(defaultRecipes));
        }
    }

    /**
     * Lấy toàn bộ danh sách danh mục
     */
    getCategories() {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY_CATEGORIES)) || [];
    }

    /**
     * Lấy toàn bộ danh sách món thô từ Storage
     */
    _getAllRawRecipes() {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY_RECIPES)) || [];
    }

    /**
     * Action: Lọc danh sách món ăn theo danh mục hoặc từ khóa tìm kiếm
     * @param {Object} filters { category_id: number, keyword: string }
     */
    getFilteredRecipes({ category_id = 1, keyword = '' } = {}) {
        let recipes = this._getAllRawRecipes();

        // 1. Lọc theo danh mục
        const catId = parseInt(category_id, 10);
        if (catId === 2) {
            // Danh mục "Giá rẻ <50k"
            recipes = recipes.filter(item => item.price < 50000);
        } else if (catId > 2) {
            recipes = recipes.filter(item => item.category_id === catId);
        }
        // catId === 1 là 'Tất cả' -> giữ nguyên

        // 2. Lọc theo từ khóa tìm kiếm
        if (keyword.trim()) {
            const query = keyword.toLowerCase().trim();
            recipes = recipes.filter(item => 
                item.title.toLowerCase().includes(query) ||
                (item.ingredients && item.ingredients.some(ing => ing.toLowerCase().includes(query)))
            );
        }

        return recipes;
    }

    /**
     * Action: Lấy chi tiết 1 món ăn theo ID
     * @param {number|string} id 
     */
    getRecipeDetail(id) {
        const recipeId = parseInt(id, 10);
        const recipes = this._getAllRawRecipes();
        return recipes.find(item => item.id === recipeId) || null;
    }

    /**
     * Action: Thêm món ăn mới (đồng đội sau này làm form Create Recipe chỉ cần gọi hàm này)
     * @param {Object} newRecipeData 
     */
    addRecipe(newRecipeData) {
        const recipes = this._getAllRawRecipes();
        const nextId = recipes.length > 0 ? Math.max(...recipes.map(r => r.id)) + 1 : 1;

        const record = {
            id: nextId,
            rating: 5.0,
            image_url: newRecipeData.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&q=80',
            ...newRecipeData
        };

        recipes.unshift(record); // Thêm lên đầu danh sách
        localStorage.setItem(this.STORAGE_KEY_RECIPES, JSON.stringify(recipes));
        return record;
    }
}

// Khởi tạo một singleton instance để toàn bộ script trên trang dùng chung
window.recipeService = new RecipeService();