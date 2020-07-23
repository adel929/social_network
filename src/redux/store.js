import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";


let store = {
    _state: {
        profilPage: {
            posts: [
                { id: 1, message: "Hi how you", likesCount: 12 },
                { id: 2, message: "Its my first", likesCount: 21 },
                { id: 3, message: "hi hi", likesCount: 22 },
                { id: 4, message: "my first", likesCount: 11 },
                { id: 5, message: "world", likesCount: 14 },
                { id: 6, message: "krike", likesCount: 2 }
            ],
            newPostText: "state management"
        },

        dialogsPage: {
            dialogs: [
                { id: 1, name: "Dima" },
                { id: 2, name: "Andrey" },
                { id: 3, name: "Sveta" },
                { id: 4, name: "Ruslan" },
                { id: 5, name: "Valera" },
                { id: 6, name: "Nail" }
            ],
            messages: [
                { id: 1, message: "hello" },
                { id: 2, message: "What" },
                { id: 3, message: "Yo" },
                { id: 4, message: "Yes to house" }
            ],
            newMessageBody: ""
        }
    },
    _callSubscriber() {
        console.log("State changed");
    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action) {
        this._state.profilPage = profileReducer(this._state.profilPage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);

        this._callSubscriber(this._state);
    }
};

window.store = store;
export default store;
