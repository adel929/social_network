import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
// import ProfileContainer from "./components/Profile/ProfileContainer";
// import DialogsContainer from "./components/Dialogs/DialogsConteiner";
import { Route, withRouter } from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import { connect } from "react-redux";
import {initializeApp} from "./redux/app-reducer"
import { compose } from "redux";
import Preloader from "./components/common/Preloader/Preloader";
import { withSuspense } from "./hoc/withSuspense";
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsConteiner'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));


class App extends Component {
    componentDidMount() {
        this.props.initializeApp();
    }
    render() {
        if  (!this.props.initialized) {
            return <Preloader />
        }
        return (
            <div className="App-main">
                <HeaderContainer />
                <Navbar />
                <div className="conteiner">
                    <Route path='/dialogs'
                    render={withSuspense(DialogsContainer)} />
                    <Route path='/profile/:userId?'
                    render={withSuspense(ProfileContainer)} />
                    <Route path='/users' render={() => <UsersContainer pageTitle={"Users"} />} />
                    <Route path='/login' render={() => <LoginPage />} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

export default compose( 
    withRouter,
    connect(mapStateToProps, {initializeApp})) (App);