export interface ILabel {
    _id: string;
    name: string;
    color: string;
    createdBy: string;
    createdAt: Date;
    updatedAt?: Date;
}

export interface getLabelsOptions {
    
}

export interface createLabelOptions {
    name: string;
    color: string;
}

export interface updateLabelOptions {
    name?: string;
    color?: string;
}

export interface deleteLabelOptions {
    id: string;
}