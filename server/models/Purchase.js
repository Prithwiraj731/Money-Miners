const supabase = require('../config/supabase');

class Purchase {
    // Submit a new purchase request
    static async create(purchaseData) {
        const { data, error } = await supabase
            .from('course_purchases')
            .insert([purchaseData])
            .select();

        if (error) throw error;
        return data[0];
    }

    // Get purchases for a specific user
    static async getByUserId(userId) {
        const { data, error } = await supabase
            .from('course_purchases')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    }

    // Get all purchases (Admin only)
    static async getAll() {
        const { data, error } = await supabase
            .from('course_purchases')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    }

    // Update purchase status (Admin only)
    static async updateStatus(purchaseId, status) {
        const { data, error } = await supabase
            .from('course_purchases')
            .update({ status })
            .eq('id', purchaseId)
            .select();

        if (error) throw error;
        return data[0];
    }
}

module.exports = Purchase;
