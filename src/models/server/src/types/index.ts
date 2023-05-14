import { Request, Response } from 'express';

export type TTodoId = string | number;

export interface ITodo {
    id: TTodoId;
    title: string;
    date: string;
    isCompleted: boolean;
}

export type TTodos = ITodo[];

export type TController = (req: Request, res: Response) => void;