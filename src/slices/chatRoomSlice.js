import {createSlice} from "@reduxjs/toolkit";
import {deleteChatRoom, getMessages} from "../apis/chatRoomApi";

const ChatRoomSlice = createSlice({
    name: 'chatRoom',
    initialState: {
        messages: [],
    },
    extraReducers: (builder) => {
        builder.addCase(getMessages.fulfilled, (state, action) => {
            state.messages = action.payload;
            return state;
        });
        builder.addCase(getMessages.rejected, (state, action) => {
            alert("메세지 목록을 불러오는 중 오류가 발생했습니다. 관리자에게 문의하세요.");
            return state;
        });
        builder.addCase(deleteChatRoom.fulfilled, (state, action) => {
            alert("채팅방이 삭제되었습니다.");
            window.location.href = "/chat";
            return state;
        });
        builder.addCase(deleteChatRoom.rejected, (state, action) => {
            alert("채팅방을 삭제하는 중 오류가 발생했습니다. 관리자에게 문의하세요.");
            return state;
        });
    }
});

export default ChatRoomSlice.reducer;