import { Album } from "./albums";

export interface SharedAlbum {
    memberIds: number[];
    album: Album;
}

export interface SharedAlbumRequest {
    memberIds: number[];
    name: string;
}