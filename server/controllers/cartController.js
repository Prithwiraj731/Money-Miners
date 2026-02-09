const Cart = require('../models/Cart');

// Add course to cart
exports.addToCart = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user.id; // From auth middleware

        if (!courseId) {
            return res.status(400).json({ message: 'Course ID is required' });
        }

        const cartItem = await Cart.addToCart(userId, courseId);
        res.status(201).json({
            message: 'Course added to cart successfully',
            cartItem
        });

    } catch (error) {
        console.error('Add to Cart Error:', error);

        if (error.message === 'Course already in cart') {
            return res.status(400).json({ message: error.message });
        }

        res.status(500).json({ message: 'Failed to add course to cart' });
    }
};

// Get user's cart
exports.getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const cartItems = await Cart.getUserCart(userId);

        res.json({ cart: cartItems });

    } catch (error) {
        console.error('Get Cart Error:', error);
        res.status(500).json({ message: 'Failed to fetch cart' });
    }
};

// Remove course from cart
exports.removeFromCart = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.user.id;

        await Cart.removeFromCart(userId, courseId);
        res.json({ message: 'Course removed from cart successfully' });

    } catch (error) {
        console.error('Remove from Cart Error:', error);
        res.status(500).json({ message: 'Failed to remove course from cart' });
    }
};
