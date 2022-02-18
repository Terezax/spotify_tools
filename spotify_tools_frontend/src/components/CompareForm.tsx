import React from 'react';
import Playlist from "../model/Playlist";
import ComparePlaylistsResult from "../model/ComparePlaylistsResult";
import PlaylistService from "../services/PlaylistService";
import CompareResult from "./CompareResult";

interface IProps {

}

interface IState {
    playlists?: Array<Playlist>,
    playlist1?: Playlist,
    playlist2?: Playlist,
    result?: ComparePlaylistsResult
}

class CompareForm extends React.Component<IProps, IState> {


    constructor(props: Readonly<IProps> | IProps) {
        super(props);
        this.state = {
            playlists: undefined,
            playlist1: undefined,
            playlist2: undefined,
            result: undefined
        }
    }

    componentDidMount() {
        this.setState(state => ({
            playlists: PlaylistService.getAll()
        }));
    }

    handlePlaylist1Change(e: any) {
        this.setState({playlist1: this.state.playlists?.find(playlist => playlist.id === e.target.value)});
    }

    handlePlaylist2Change(e: any) {
        this.setState({playlist2: this.state.playlists?.find(playlist => playlist.id === e.target.value)});
    }

    handleSubmit(e: any) {
        e.preventDefault();

        if (this.submitEnabled()) {
            this.setState({
                result: PlaylistService.comparePlaylists(this.state.playlist1!.id, this.state.playlist2!.id)
            });
        }
    }

    submitEnabled() {
        return this.state.playlist1 && this.state.playlist2 && this.state.playlist1.id !== this.state.playlist2.id;
    }

    render() {
        return (
            <div>
                <form className="CompareForm row g-2">
                    <div className="col-md-6">
                        <select defaultValue="" onChange={(e) => this.handlePlaylist1Change(e)} className="form-select" aria-label="Default select example">
                            <option>Select playlist</option>
                            {this.state.playlists?.map((playlist, i) =>(
                                <option key={i} value={playlist.id}>{playlist.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-6">
                        <select defaultValue="" onChange={(e) => this.handlePlaylist2Change(e)} className="form-select" aria-label="Default select example">
                            <option>Select playlist</option>
                            {this.state.playlists?.map((playlist, i) =>(
                                <option key={i} value={playlist.id}>{playlist.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-12 text-center">
                        <button disabled={!this.submitEnabled()} onClick={(e) => this.handleSubmit(e)} className="btn btn-primary">
                            Compare!
                        </button>
                    </div>
                </form>
                <hr />
                {this.state.result && this.state.playlist1 && this.state.playlist2 && <CompareResult result={this.state.result!} playlist1={this.state.playlist1!} playlist2={this.state.playlist2!} />}
            </div>
        )
    };
}

export default CompareForm;
