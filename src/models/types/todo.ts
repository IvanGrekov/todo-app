export interface ITodo {
    id: string | number;
    title: string;
    description: string;
    date: string;
    completed: boolean;
}

export type TTodos = ITodo[];

export type TTodoFormFields = Omit<ITodo, 'id'>;
