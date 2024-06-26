import {createSlice} from '@reduxjs/toolkit';
import {getMyReview, getRandReview, getReview, removeReview, reviewReg} from '../apis/reviewApi';


const reviewSlice = createSlice({
    name: 'review',
    initialState: {
        reviews: [],
        reviewDTO: [],
        searchCondition: '',
        searchKeyword: '',
        searchTravelId: '',
        page: 0,
        sort: 'latest'
    },
    reducers: {
        change_searchCondition: (state, action) => ({
            ...state,
            searchCondition: action.payload
        }),
        change_searchKeyword: (state, action) => ({
            ...state,
            searchKeyword: action.payload
        }),
        change_searchTravelId: (state, action) => ({
            ...state,
            searchTravelId: action.payload
        }),
        change_sort: (state, action) => ({
            ...state,
            sort: action.payload
        }),
        change_reviews: (state, action) => ({
            ...state,
            reviews: action.payload
        })
    },
    extraReducers: (builder) => {
        builder.addCase(getReview.fulfilled, (state, action) => (
            {
                ...state,
                reviewDTO: action.payload.pageItems,
                searchCondition: action.payload.item.searchCondition,
                searchKeyword: action.payload.item.searchKeyword,
                page: action.payload.pageItems.pageable.pageNumber,
                sort: action.payload.item.sort
            }
        ));

        builder.addCase(getReview.rejected, (state, action) => {
            alert("에러발생.");
            console.log(action.payload);
            return state;
        });

        builder.addCase(getRandReview.fulfilled, (state, action) => (
            {
                ...state,
                reviews: action.payload.items,
            }
        ));

        builder.addCase(getRandReview.rejected, (state, action) => {
            alert("에러발생.");
            console.log(action.payload);
            return state;
        });
        builder.addCase(reviewReg.fulfilled, (state, action) => {
            alert(`리뷰가 등록되었습니다.`);
            window.location.href = '/review/list';
            return state;
        });

        builder.addCase(reviewReg.rejected, (state, action) => {
            alert("에러 발생. 관리자에게 문의하세요.")
            console.log(action.payload);
            return state;
        });

        builder.addCase(removeReview.fulfilled, (state, action) => {
            alert("정상적으로 삭제되었습니다.");
            window.location.href = '/review/list';
            return {
                ...state,
                reviewDTO: action.payload,
                page: 0,
                searchCondition: 'all',
                searchKeyword: '',
                sort: 'latest'
            }
        });
        builder.addCase(removeReview.rejected, (state, action) => {
            alert("에러발생.");
            console.log(action.payload);
            return state;
        });

        builder.addCase(getMyReview.fulfilled, (state, action) => (
            {
                ...state,
                reviewDTO: action.payload.pageItems,
                page: action.payload.pageItems.pageable.pageNumber
            }
        ));

        builder.addCase(getMyReview.rejected, (state, action) => {
            alert("에러발생.");
            console.log(action.payload);
            return state;
        });

    }
});

export const {change_searchCondition, change_searchKeyword, change_sort, change_reviews} = reviewSlice.actions;
export default reviewSlice.reducer;