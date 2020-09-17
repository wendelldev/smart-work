export interface Company {
    uid: string;
    email: string;
    photoUrl?: string;
    user_type: string;
    company_detail?: any;
    attachmentsUrls?: Array<string>;
}