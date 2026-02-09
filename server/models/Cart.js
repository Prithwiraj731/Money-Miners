const supabase = require('../config/supabase');

class Cart {
    // Add course to user's cart
    static async addToCart(userId, courseId) {
        const { data, error } = await supabase
            .from('cart')
            .insert([{ user_id: userId, course_id: courseId }])
            .select();

        if (error) {
            // Check if it's a duplicate entry error
            if (error.code === '23505') { // PostgreSQL unique violation
                throw new Error('Course already in cart');
            }
            throw error;
        }
        return data[0];
    }

    // Get all cart items for a user
    static async getUserCart(userId) {
        const { data, error } = await supabase
            .from('cart')
            .select('*')
            .eq('user_id', userId)
            .order('added_at', { ascending: false });

        if (error) throw error;
        return data || [];
    }

    // Remove course from cart
    static async removeFromCart(userId, courseId) {
        const { data, error } = await supabase
            .from('cart')
            .delete()
            .eq('user_id', userId)
            .eq('course_id', courseId)
            .select();

        if (error) throw error;
        return data;
    }

    // Check if course is in cart
    static async isInCart(userId, courseId) {
        const { data, error } = await supabase
            .from('cart')
            .select('id')
            .eq('user_id', userId)
            .eq('course_id', courseId)
            .single();

        if (error && error.code !== 'PGRST116') throw error;
        return !!data;
    }
}

module.exports = Cart;
