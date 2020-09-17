export interface Candidate {
    uid: string;
    email: string;
    photoUrl?: string;
    user_type: string;
    resume?: any;
    attachmentsUrls?: Array<string>;
}
