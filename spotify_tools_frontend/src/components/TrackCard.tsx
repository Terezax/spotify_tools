import React from "react";
import Track from "../model/Track";
import Playlist from "../model/Playlist";
import PlaylistService from "../services/PlaylistService";

interface IProps {
    track: Track,
    playlist: Playlist
}

class TrackCard extends React.Component<IProps> {

    getArtistsFormatted() {
        return (
            this.props.track.artists.map((artist, i) => (
                <a key={i} href={artist.url} target="_blank" rel="noreferrer">{artist.name}</a>
            ))
        )
    }

    getDurationFormatted() {
        const totalSeconds = this.props.track.duration / 1000;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
    }

    handleClick(event: any) {
        PlaylistService.addTrackToPlaylist(this.props.playlist.id, this.props.track.id);
    }

    render() {
        return (
            <div className="card my-4">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={this.props.track.albumImageUrl} className="img-fluid rounded-start" alt={this.props.track.albumName} />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title"><a href={this.props.track.url} target="_blank" rel="noreferrer">{this.props.track.name}</a></h5>
                            <h6 className="card-subtitle mb-2 text-muted"><i className="bi bi-people" /> {this.getArtistsFormatted()}</h6>
                            <h6 className="card-subtitle mb-2 text-muted"><i className="bi bi-disc" /> <a href={this.props.track.albumUrl}>{this.props.track.albumName}</a></h6>
                            <h6 className="card-subtitle mb-2 text-muted"><i className="bi bi-clock" /> {this.getDurationFormatted()}</h6>
                            <button onClick={this.handleClick} className="btn btn-primary btn-sm">Add to {this.props.playlist.name}</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TrackCard;