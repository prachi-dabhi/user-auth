import { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { showErrorToast } from '../utilities/utils';
import { toastMessageText } from '../utilities/CommonText';

const URLSearchParamsRegistration = () => {
    const { login } = useContext(AuthContext);

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        role: Yup.string().required('Role is required'),
    });

    const handleSubmit = (values, { setSubmitting }) => {
        login(values.email, values.password, values.role)
            .catch((error) => {
                if (error.response && error.response.status === 403) {
                    showErrorToast(toastMessageText?.adminLoginError);
                }
            })
            .finally(() => setSubmitting(false));
    };

    return (
        <div className="login-container-wrapper">
            <h2>Login In to your Account</h2>
            <Formik
                initialValues={{ email: '', password: '', role: 'admin' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className='login-form-wrapper'>
                            <div>
                                <label>Email</label>
                                <Field type="email" name="email" placeholder="Enter your email" />
                                <ErrorMessage name="email" component="div" className="error" />
                            </div>
                            <div>
                                <label>Password</label>
                                <Field type="password" name="password" placeholder="Enter your password" />
                                <ErrorMessage name="password" component="div" className="error" />
                            </div>
                            <div>
                                <label>Role</label>
                                <Field as="select" name="role">
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </Field>
                                <ErrorMessage name="role" component="div" className="error" />
                            </div>
                            <button type="submit" disabled={isSubmitting}>Login</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default URLSearchParamsRegistration;