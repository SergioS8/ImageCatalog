import { IImageItem } from "./IImageItem";

export interface ICatalog {
    Name: string;
    Id: number;
    Items: IImageItem[];
}