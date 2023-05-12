// Generated by https://quicktype.io

import { Tag } from "./tag.interface";
import { User } from "./user.interface";

export interface Question {
    type: string;
    _id: string;
    description: string;
    image: string;
    answers: Answer[];
    tags: Tag[];
    difficulty: number;
    professor: User;
}

export interface Answer {
    text: string;
    val: number;
}