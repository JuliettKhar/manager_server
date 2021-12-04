export interface User {
    id: string;
    name: string;
    age: number;
    email: string;
    workingPosition: workingPosition;
}

export enum workingPosition {
    JUNIOR,
    PROGRAMMER,
    ENGINEER,
    MANAGER,
    EXPERT
}