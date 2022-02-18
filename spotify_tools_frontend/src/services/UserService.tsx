import User from "../model/User";

const getUserProfile = () => {
    //return http.get<User>(`/userProfile`);
    return {
        id: "A",
        displayName: "Franta Vykoukal",
        email: "franta@volny.cz",
        imageUrl: ""
    }
};

const UserService = {
    getUserProfile
};

export default UserService;