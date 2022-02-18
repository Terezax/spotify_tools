import Artist from "./Artist";

export default interface Track {
    id: string,
    name: string,
    url: string,
    duration: number,
    albumName: string,
    albumUrl: string,
    albumImageUrl: string,
    artists: Array<Artist>
}