import supabase from "../utils/supabaseClient"

// export const fetchStudent = async () => {
//     try {
//         console.log('Attempting to fetch students...');
//         const { data, error } = await supabase
//             .from('student')
//             .select('*')
        
//         // Log the raw response
//         console.log('Supabase response:', { data, error });
        
//         if (error) {
//             console.error('Supabase query error:', error)
//             throw error
//         }
        
//         if (!data || data.length === 0) {
//             console.log('No students found in the database');
//         } else {
//             console.log(`Found ${data.length} students`);
//         }
        
//         return data
//     } catch (error) {
//         console.error('Error fetching student data:', error)
//         return null
//     }
// }

export const fetchAllTables = async () => {
    try {
        console.log('Attempting to fetch all tables...');
        // Using rpc to call a PostgreSQL function that lists tables
        const { data, error } = await supabase
            .rpc('get_tables')
            .select('*')
        
        console.log('Tables response:', { data, error });
        
        if (error) {
            console.error('Supabase query error:', error)
            throw error
        }
        
        if (!data || data.length === 0) {
            console.log('No tables found in the database');
        } else {
            console.log(`Found ${data.length} tables`);
        }
        
        return data
    } catch (error) {
        console.error('Error fetching tables:', error)
        return null
    }
}

// If you want to fetch data from all tables
export const fetchAllTablesData = async () => {
    try {
        const tables = await fetchAllTables()
        if (!tables) return null

        const allData: Record<string, any[]> = {}
        
        for (const table of tables) {
            const { data, error } = await supabase
                .from(table.table_name)
                .select('*')
            
            if (error) {
                console.error(`Error fetching from ${table.table_name}:`, error)
                continue
            }
            
            allData[table.table_name] = data
        }
        
        return allData
    } catch (error) {
        console.error('Error fetching all ta    bles data:', error)
        return null
    }
}