export interface IValidateScreeningResponse {
    appliedPosition: string;
    candidateEmail: string;
    candidateFirstName: string;
    candidatePhoneNumber: string;
    errorMessage: string;
    id: string;
    inValid: boolean;
}

export interface IScreeningQuestion {
    questionId: number;
    questionLink: string;
    questionText: string;
    interviewComplete: boolean;
}
