export interface ICandidate {
    firstName: string,
    lastName: string,
    email: string,
    mobileNumber: string,
    dob: string,
    applyingForPosition: string,
    status: string,
    id: number,
    questionnaire: {
        additionalProp1: string,
        additionalProp2: string,
        additionalProp3: string
    }
}
