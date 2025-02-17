const TOKEN_LENGTH = 64;

class TokenGenerator {
    private token: string;

    constructor() {
        this.token = this.generateToken();
    }

    getToken(): string {
        return this.token;
    }

    private generateToken(): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const length = TOKEN_LENGTH;
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    static isValid(token: string): boolean {
        return token.length === TOKEN_LENGTH;
    }
}

export default TokenGenerator;