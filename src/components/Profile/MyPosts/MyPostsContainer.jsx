import React from 'react';
import { addPostActionCreator } from "../../../redux/profile-reducer"
import MyPosts from "./MyPosts"
import {connect} from 'react-redux';


const mapStateToProps = (state) => {
    return {
        posts: state.profilPage.posts,
        newPostText: state.profilPage.newPostText
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostText) => {
            dispatch(addPostActionCreator(newPostText));
        }
    }
}

const MyPostsConteiner = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsConteiner;
