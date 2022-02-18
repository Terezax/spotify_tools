import Track from "./Track";

export default interface ComparePlaylistsResult {
    tracksMissingFromPlaylist1: Array<Track>,
    tracksMissingFromPlaylist2: Array<Track>,
}