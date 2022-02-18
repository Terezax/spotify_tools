import React from "react";
import User from "../model/User";

interface IProps {
}

interface IState {
    user?: User
}

class Login extends React.Component<IProps, IState> {


    constructor(props: IProps) {
        super(props);

        this.state = {
            user: undefined
        }
        // this.state = {
        //     user: {
        //         id: "A",
        //         displayName: "Franta Vykoukal",
        //         email: "franta@volny.cz",
        //         imageUrl: "https://i.pinimg.com/236x/92/3b/72/923b728f57febb1bf5a3429ac78464f7--funny-dog-photos-funny-dogs.jpg"
        //     }
        // }
    }

    render() {
        if (this.state.user) {
            return (
                <p className="row">
                    <div className="col-md-6 text-md-end">
                        <img className="rounded-circle" src={this.state.user.imageUrl} alt={this.state.user.displayName} height="75px" width="75px" />
                    </div>
                    <div className="col-md-6 text-md-start">
                        <h5>{this.state.user.displayName} ({this.state.user.email})</h5>
                        <button className="btn btn-danger">Log out</button>
                    </div>
                </p>
            )
        } else {
            return (
                <p>
                    <button className="btn btn-lg btn-success">
                        <i className="bi bi-spotify" /> Log in with Spotify
                    </button>
                </p>
            )
        }
    }
}

export default Login;