export interface ITodo {
    id: string | number;
    title: string;
    date: string;
    isCompleted: boolean;
}

export type TTodos = ITodo[];

export type TTodoFormFields = Omit<ITodo, 'id'>;
