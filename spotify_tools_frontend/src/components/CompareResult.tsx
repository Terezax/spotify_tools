import React from 'react';
import Playlist from "../model/Playlist";
import ComparePlaylistsResult from "../model/ComparePlaylistsResult";
import TrackCard from "./TrackCard";

interface IProps {
    result: ComparePlaylistsResult,
    playlist1: Playlist,
    playlist2: Playlist
}
class CompareResult extends React.Component<IProps> {

    render() {
        return (
            <div className="CompareResult row g-2">
                <div className="col-sm-6 p-2">
                    <h3>Songs missing from {this.props.playlist1.name}</h3>
                    {this.props.result.tracksMissingFromPlaylist1.map((track, i) => (
                        <TrackCard key={i} track={track} playlist={this.props.playlist1} />
                    ))}
                </div>
                <div className="col-sm-6 p-2">
                    <h3>Songs missing from {this.props.playlist2.name}</h3>
                    {this.props.result.tracksMissingFromPlaylist2.map((track, i) => (
                        <TrackCard key={i} track={track} playlist={this.props.playlist2} />
                    ))}
                </div>
            </div>
        )
    };
}

export default CompareResult;
