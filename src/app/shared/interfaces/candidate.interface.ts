export interface ICandidate {
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
    dob: string;
    applyingForPosition: string;
    status: string;
    screeningId: string;
    id: number;
    questionnaire: IQuestion[];
}

export interface IQuestion {
    key: string;
    question: string;
    response: string;
}

export interface IStatus {
    key: string;
    value: string;
    class: string;
}

export interface IRating {
    appliedForPosition: string;
    candidateEmail: string;
    candidateName: string;
    candidatePhone: string;
    overallRating: number;
    questionResults: IQuestionResult[];
}

export interface IQuestionResult {
    aiFeedback: string;
    candidateResponse: string;
    question: string;
    questionSequence: number;
    rating: number;
}
