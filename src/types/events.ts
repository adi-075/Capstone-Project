export interface Events {
    calendarId: string;
    // ISO formatted date string
    startDate?: string;
    endDate?: string;
    categoryId?: string | null;
    additionalParams?: Record<string, string>;
    id?: string;
} 