import Playlist from "../model/Playlist";
import ComparePlaylistsResult from "../model/ComparePlaylistsResult";

const getAll = () => {
    //return http.get<Array<Playlist>>("/playlists");
    console.log("Called getAll");
    return [
        {
            id: "A",
            name: "Playlist A",
            url: "https://www.seznam.cz",
            numberOfTracks: 3
        },
        {
            id: "B",
            name: "Playlist B",
            url: "https://www.seznam.cz",
            numberOfTracks: 4
        }
    ];
};

const addTrackToPlaylist = (playlistId: string, trackId: string) => {
    //return http.post<any>(`/playlists/${playlistId}/tracks/${trackId}`);
    console.log(`Called addTrackToPlaylist with params playlistId=${playlistId} and trackId=${trackId}`);
};

const comparePlaylists = (playlistId1: string, playlistId2: string) => {
    //return http.get<ComparePlaylistsResult>(`/playlists/$compare?pid1=${playlistId1}&pid2=${playlistId2}`);
    console.log(`Called comparePlaylists with params playlistId1=${playlistId1} and playlistId2=${playlistId2}`);
    return {
        tracksMissingFromPlaylist1: [
            {
                id: "A",
                name: "Smells Like Teen Spirit",
                url: "https://open.spotify.com/track/5ghIJDpPoe3CfHMGu71E6T",
                duration: 143000,
                albumName: "Nevermind",
                albumUrl: "https://open.spotify.com/album/2UJcKiJxNryhL050F5Z1Fk?highlight=spotify:track:4CeeEOM32jQcH3eN9Q2dGj",
                albumImageUrl: "https://i.scdn.co/image/ab67616d00001e02e175a19e530c898d167d39bf",
                artists: [{
                    id: "A",
                    name: "Nirvana",
                    url: "https://open.spotify.com/artist/6olE6TJLqED3rqDCT0FyPh"
                }]
            }
        ],
        tracksMissingFromPlaylist2: [
            {
                id: "B",
                name: "Song B",
                url: "https://www.seznam.cz",
                duration: 181000,
                albumName: "Album B",
                albumUrl: "https://www.seznam.cz",
                albumImageUrl: "",
                artists: [{
                    id: "B",
                    name: "Artist B",
                    url: "https://www.seznam.cz"
                }]
            },
            {
                id: "C",
                name: "Song C",
                url: "https://www.seznam.cz",
                duration: 210000,
                albumName: "Album C",
                albumUrl: "https://www.seznam.cz",
                albumImageUrl: "",
                artists: [{
                    id: "C",
                    name: "Artist C",
                    url: "https://www.seznam.cz"
                }, {
                    id: "D",
                    name: "Artist D",
                    url: "https://www.seznam.cz"
                }]
            }
        ]
    }
};

const PlaylistService = {
    getAll,
    addTrackToPlaylist,
    comparePlaylists
};

export default PlaylistService;