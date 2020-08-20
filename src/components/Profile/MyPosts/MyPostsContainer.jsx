import React from 'react';
import MyPosts from "./MyPosts"
import {connect} from 'react-redux';
import actions from 'redux-form/lib/actions';


const mapStateToProps = (state) => {
    return {
        posts: state.profilPage.posts,
        newPostText: state.profilPage.newPostText
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostText) => {
            dispatch(actions.addPostActionCreator(newPostText));
        }
    }
}

const MyPostsConteiner = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsConteiner;
