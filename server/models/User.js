const supabase = require('../config/supabase');

class User {
    static async create(userData) {
        const { full_name, username, email, phone, password } = userData;
        const { data, error } = await supabase
            .from('users')
            .insert([{ full_name, username, email, phone, password }])
            .select();

        if (error) throw error;
        return data[0];
    }

    static async findByEmail(email) {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        // Supabase returns error P0001 or PGRST116 if no rows found depending on version/config
        if (error && error.code !== 'PGRST116') return null; // throw error; 
        // If no user found, data is null or error is PGRST116, so return null/data safely
        if (error && error.code === 'PGRST116') return null;

        return data;
    }
}

module.exports = User;
