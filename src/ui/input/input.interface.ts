export interface IInputStatus {
    status: boolean,
    message: string,
}

export interface IInput {
    value: {
        get: any;
        set: (value: any) => void;
    };
    valid: IInputStatus
}