export interface ICandidate {
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
    dob: string;
    applyingForPosition: string;
    status: string;
    id: number;
    questionnaire: IQuestion[];
}

export interface IQuestion {
    key: string;
    question: string;
    response: string;
}
