export interface IProblem {
    _id: string;
    name: string;
    code: string;
    timeLimit: number;
    memLimit: number;
    testCases: number;
    problemUrl?: string;
}

export interface FileDetail {
    contentType: string;
    signedUrl: string;
}

export interface ProblemDetail {
    name: string;
    code: string;
    timeLimit: number;
    memLimit: number;
}
