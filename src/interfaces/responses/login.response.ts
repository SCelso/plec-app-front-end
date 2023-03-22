export interface LoginResponse {
    token: string;
    email: string;
    _id: string;
    name: string;
    bio: string;
    linkedin: string;
    roles: string[];
    isBanned: boolean;
    isActive: boolean;
    isVerified: boolean;
}
