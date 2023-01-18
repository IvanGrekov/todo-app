export interface ITodo {
    id: string | number;
    title: string;
    date?: string;
    isCompleted: boolean;
}

export type TCreateTodoInput = Omit<ITodo, 'id' | 'completed' | 'userId'> &
    Partial<Pick<ITodo, 'isCompleted'>>;
