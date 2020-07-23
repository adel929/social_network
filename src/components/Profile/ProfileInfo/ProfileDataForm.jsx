import React from "react";
import { createField, Input, Textarea } from "../../common/FormsControl/FormsControls";
import { reduxForm } from "redux-form";
import css from '../ProfileInfo/ProfileInfo.module.css';
import style from "../../common/FormsControl/FormsControls.module.css";

const ProfileDataForm = ({ handleSubmit, profile, error }) => {
    return <form onSubmit={handleSubmit}>
        <div><button>save</button></div>
        {error && <div className={style.formSummaryError}>
            {error}
        </div>
        }
        <div>
            <b>Full name</b>: {createField("Full name", "fullname", [], Input)}
        </div>
        
        <div>
            <b>Looking for a job</b>: {createField("", "lookingForAJob", [], Input, {type: "checkbox"})}
        </div>
        
        <div>
            <b>My professional skills</b>: {createField("My proffisional skills", "lookingForAJobDescription", [], Textarea)}
        </div>
        
        <div>
            <b>About me</b>: {createField("About me", "aboutMe", [], Textarea)}
        </div>
        
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                return <div key={key} className={css.contact}>
                    <b>{key}: {createField( key, "contacts." + key, [], Input)}</b>
                </div>
            })}
        </div>
    </form>
}

const ProfileDataFormReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm;