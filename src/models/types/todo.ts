export interface ITodo {
    id: string;
    title: string;
    userId: string;
    date: string;
    completed: boolean;
}

export type TCreateTodoInput = Omit<ITodo, 'id' | 'completed' | 'userId'> &
    Partial<Pick<ITodo, 'completed' | 'userId'>>;
