export interface IInputStatus {
    status: boolean,
    message: string,
    executeCheck: () => void
}

export interface IInput {
    name: string,
    value: {
        get: any;
        set: (value: any) => void;
    };
    valid: IInputStatus
}