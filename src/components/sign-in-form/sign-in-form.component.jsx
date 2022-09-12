import { useState } from "react";

import { createAuthUserWithEmailAndPassword, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from '../form-input/form-input.component';
import Button from "../button/button.component";

import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    //console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        const { user } = await createAuthUserWithEmailAndPassword(email, password);
        console.log(user);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(formFields);

       try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response);

            // await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        } catch (error) {
            //console.log('Error1', error);
            if(error.code === 'auth/email-already-in-use'){
                alert('Cannot create user, email already in use');
            } else {
                console.log('user creation encountered an error', error);
            }
        }
    };

    
    const handleChange = (event) => {
        //const {name} = event;
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]:value });
    };

    return (
        <div className='sign-in-container'>
            <h2>Already have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' type='email' required onChange={handleChange} name='email' value={email}></FormInput>
                <FormInput label='Password' type='password' required onChange={handleChange} name='password' value={password}></FormInput>
                <div className='buttons-container'>
                    <Button type='submit'>Sign In</Button>
                    <Button buttonType='google' onClick={signInWithGoogle}>Google sign in</Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;