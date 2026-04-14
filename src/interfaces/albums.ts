export interface Album {
    id: number;
    ownerId: number;
    imageCount: number;
    lastImageId: number | null;
    name: string;
    visibility: string;
}

export interface AlbumRequest {
    name: string;
    visibility: string;
}