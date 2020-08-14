import React from 'react';
import { reduxForm, InjectedFormProps } from 'redux-form';
import { Input, createField } from '../common/FormsControl/FormsControls';
import { required } from '../../utils/validators/validators';
import { connect } from 'react-redux';
import { login } from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';
import css from "../common/FormsControl/FormsControls.module.css"
import img from "../../images/ava.jpg";
import { AppStateType } from '../../redux/redux-store';

type LoginFormOwnProps = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({ handleSubmit, error, captchaUrl }) => {
    return (
        <form onSubmit={handleSubmit} className={css.loginForm} >
            {createField<LoginFormValuesTypeKeys>("Email", "email", [required], Input)}
            {createField<LoginFormValuesTypeKeys>("Password", "password", [required], Input, { type: "password" })}
            {createField<LoginFormValuesTypeKeys>(undefined, "rememberMe", [], Input, { type: "checkbox" }, /*"remember me"*/)}

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

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({ form: 'login' })(LoginForm)

type MapStatePropsType = {
    captchaUrl: string | null
    isAuth: boolean
}
type MapDispatchPropsType = {
    login: (email: string,
            password: string,
            rememberMe: boolean,
            captcha: string) => void
}

export type LoginFormValuesType = {
    captchaUrl: string
    rememberMe: boolean
    password: string
    email: string
}

type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    const onSubmit = (formData: any) => {
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


const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
});

export default connect(mapStateToProps, {login})(Login);