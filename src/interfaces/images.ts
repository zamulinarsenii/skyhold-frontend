export interface GetImagesParams {
    page: number;
    size: number;
}

export interface Image {
    id: number;
    userId: number;
    filePath: string;
    originalName: string;
    createdAt: string;
}

export interface PageResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    currentPage: number;
    size: number;
}

export interface ImageDetails {
    id: number;
    userId: number;
    filePath: string;
    originalName: string;
    createdAt: string;
    favorite: boolean;
    albums: Array<Album>;
}

interface Album {
    id: number;
    name: string;
    visbility: string;
}