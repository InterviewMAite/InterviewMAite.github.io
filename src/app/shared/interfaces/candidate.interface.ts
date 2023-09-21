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
        agileExperience: string;
        certification: string;
        designExperience: string;
        javaExperience: string;
        javaVersion: string;
        kafkaExperience: string;
        microserviceExperience: string;
        multithreadingExperience: string;
        newTech: string;
        salaryExpectation: string;
        sqlExperience: string;
    }
}
