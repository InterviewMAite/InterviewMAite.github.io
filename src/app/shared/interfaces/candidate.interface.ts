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
