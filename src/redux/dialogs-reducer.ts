const SEND_MESSAGE = "SEND-MESSAGE";

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

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: ActionTypes) => {
    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, { id: 5, message: body }]
            };
        default:
            return state;
    }
};

type ActionTypes = SendMessageCreatorActionType

type SendMessageCreatorActionType = {
    type: typeof SEND_MESSAGE
    newMessageBody: string
}

export const sendMessageCreator = (newMessageBody: string): SendMessageCreatorActionType => ({ type: SEND_MESSAGE, newMessageBody });

export default dialogsReducer;
