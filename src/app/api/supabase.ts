import supabase from "../utils/supabaseClient"

export const fetchAllTables = async () => {
    try {
        const response = await fetch('/api/tables')
        const data = await response.json()

        if (!response.ok) throw new Error(data.error)

        return data
    } catch (error) {
        console.error('Error fetching tables:', error)
        return null
    }
}

export async function fetchStudents() {
    try {
        const response = await fetch('/api/students')
        const data = await response.json()

        if (!response.ok) throw new Error(data.error)

        return data
    } catch (error) {
        console.error('Error fetching students:', error)
        return null
    }
}
