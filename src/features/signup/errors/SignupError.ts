export class SignupError extends Error {
    constructor(message: string) {
        super(message);
        this.name= "SignupError";
    }
}