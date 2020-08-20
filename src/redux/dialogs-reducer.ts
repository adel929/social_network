import { InferActionTypes } from "./redux-store";

type DialogType = {
    id: number
    name: string
}
type MessageType = {
    id: number
    message: string
}

let initialState = {
    dialogs: [
        { id: 1, name: "Dima" },
        { id: 2, name: "Andrey" },
        { id: 3, name: "Sveta" },
        { id: 4, name: "Ruslan" },
        { id: 5, name: "Valera" },
        { id: 6, name: "Nail" }
    ] as Array<DialogType>,
    messages: [
        { id: 1, message: "hello" },
        { id: 2, message: "What" },
        { id: 3, message: "Yo" },
        { id: 4, message: "Yes to house" }
    ] as Array<MessageType>,
}

const dialogsReducer = (state = initialState, action: ActionTypes) => {
    switch (action.type) {
        case 'SN/DIALOGS/SEND_MESSAGE':
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, { id: 5, message: body }]
            };
        default:
            return state;
    }
};

export const actions = {
    sendMessageCreator: (newMessageBody: string) => ({ type: 'SN/DIALOGS/SEND_MESSAGE', newMessageBody } as const)
}

export default dialogsReducer;

export type InitialStateType = typeof initialState
type ActionTypes = InferActionTypes<typeof actions>
