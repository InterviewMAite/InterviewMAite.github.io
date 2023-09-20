export interface ICandidate {
    name: string;
    phone: number;
    email: string;
    candidateId: number;
    jobId: string;
    screeningId: string;
}

export interface IJob {
    jobId: string;
    title: string;
}
