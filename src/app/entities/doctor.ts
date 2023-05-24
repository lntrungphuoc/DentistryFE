import { EHealthBookDetailDoctor } from "./eHealthBookDetailDoctor";

export class Doctor {
    id: number;
    name: string;
    information: string;
    isDoctor: boolean;
    avatarUrl: string;
    createdDate: Date;
    modifiedDate: Date;
    createdBy: number;
    modifiedBy: number;
    eHealthBookDetailDoctor: EHealthBookDetailDoctor;
}