export interface ILabel {
    _id: string;
    name: string;
    color: string;
    createdBy: string;
    createdAt: Date;
    updatedAt?: Date;
}

export interface getLabelsOptions {
    query: string
    limit: number
    page: number
}

export interface createLabelOptions {
    name: string;
    color: string;
}

export interface updateLabelOptions {
    name?: string;
    color?: string;
    _id: string;
}

export interface deleteLabelOptions {
    id: string;
}