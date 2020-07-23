import React from 'react';
import { reduxForm } from 'redux-form';
import { Input, createField } from '../common/FormsControl/FormsControls';
import { required } from '../../utils/validators/validators';
import { connect } from 'react-redux';
import { login } from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';
import css from "../common/FormsControl/FormsControls.module.css"
import img from "../../images/ava.jpg";


const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
    return (
        <form onSubmit={handleSubmit} className={css.loginForm} >
            {createField("Email", "email", [required], Input)}
            {createField("Password", "password", [required], Input, { type: "password" })}
            {createField(null, "rememberMe", [], Input, { type: "checkbox" }, /*"remember me"*/)}

            {captchaUrl && <img src={captchaUrl} />}
            {captchaUrl && createField("symbols from images", "captcha", [required], Input, {},)}

            {error && <div className={css.formSummaryError}>
                {error}
            </div>
            }
            <div className={css.loginButton}>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }
    if (props.isAuth) {
        return <Redirect to={"/profile"} />
    }
    return <div className={css.userLogin} >
        <img src={img} alt="user" />
        <LoginReduxForm onSubmit={onSubmit} 
                        captchaUrl={props.captchaUrl} />
    </div>
}


const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
});

export default connect(mapStateToProps, {login})(Login);