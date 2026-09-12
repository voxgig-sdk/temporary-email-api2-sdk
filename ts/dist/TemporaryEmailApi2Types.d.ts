export interface EmailGeneration {
    email?: string;
    expires_at?: string;
    token?: string;
}
export interface EmailGenerationLoadMatch {
    email?: string;
    expires_at?: string;
    token?: string;
}
export interface EmailInbox {
    id?: string;
    messages?: any[];
    total?: number;
}
export interface EmailInboxLoadMatch {
    id: string;
}
