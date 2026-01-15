const supabase = require('../config/supabase');

class Contact {
    static async create(contactData) {
        const { full_name, email, phone, secondary_phone, address, query } = contactData;
        const { data, error } = await supabase
            .from('contacts')
            .insert([{ full_name, email, phone, secondary_phone, address, query }])
            .select();

        if (error) throw error;
        return data[0];
    }
}

module.exports = Contact;
