export interface ITodo {
    id: string;
    title: string;
    userId: string;
    date: string;
    isCompleted: boolean;
}

export type TCreateTodoInput = Omit<ITodo, 'id' | 'completed' | 'userId'> &
    Partial<Pick<ITodo, 'isCompleted' | 'userId'>>;
