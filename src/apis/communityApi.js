import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_ROOT;

export const communityReg = createAsyncThunk(
    'community/reg',
    async (communityDTO, thunkAPI) => {
        const formData = new FormData();

        const community = {
            name: communityDTO.name,
            description: communityDTO.description,
            member: communityDTO.member,
        };

        formData.append('community', new Blob([JSON.stringify(community)], {
            type: 'application/json'
        }));

        const tags = communityDTO.tags.map((tag) => ({
            content: tag
        }));

        formData.append('tags', new Blob([JSON.stringify(tags)], {
            type: 'application/json'
        }));

        if (communityDTO.picture) {
            formData.append('picture', communityDTO.picture);
        }

        try {
            const response = await axios.post(
                `${API_URL}/community/reg`,

                formData, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            return response.data.item;

        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);


export const communityModify = createAsyncThunk(
    'community/edit',
    async (communityData, {rejectWithValue}) => {
        try {

            const formData = new FormData();

            formData.append('community', new Blob([JSON.stringify({
                name: communityData.name,
                description: communityData.description,
                member: communityData.member,
            })], {
                type: 'application/json'
            }));


            const tags = communityData.tags.map(tag => ({content: tag}));
            formData.append('tags', new Blob([JSON.stringify(tags)], {
                type: 'application/json'
            }));


            if (communityData.picture) {
                formData.append('picture', communityData.picture);
            }

            const response = await axios.put(
                `${API_URL}/community/modify`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
                        "Content-Type": "multipart/form-data"
                    }
                }
            );
            if (response.data && response.data.item) {
                alert("정상적으로 수정되었습니다.");
                window.location.reload();
            }
        } catch (e) {
            alert("에러 발생.");
            console.log(e);
        }
    }
);