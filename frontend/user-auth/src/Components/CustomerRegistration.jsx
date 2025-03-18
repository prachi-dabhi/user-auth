import { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const CustomerRegistration = () => {
    const { register } = useContext(AuthContext);

    const validationSchema = Yup.object({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        role: Yup.string().required('Role is required'),
    });

    const handleSubmit = (values, { setSubmitting }) => {
        register(values.email, values.password, values.role)
            .finally(() => setSubmitting(false));
    };

    return (
        <div className="login-container-wrapper">
            <h2>New Registration</h2>
            <Formik
                initialValues={{ firstName: '', lastName: '', email: '', password: '', role: 'user' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div>
                            <div>
                                <label>First Name</label>
                                <Field type="text" name="firstName" />
                                <ErrorMessage name="firstName" component="div" className="error" />
                            </div>
                            <div>
                                <label>Last Name</label>
                                <Field type="text" name="lastName" />
                                <ErrorMessage name="lastName" component="div" className="error" />
                            </div>
                            <div>
                                <label>Email</label>
                                <Field type="email" name="email" />
                                <ErrorMessage name="email" component="div" className="error" />
                            </div>
                            <div>
                                <label>Password</label>
                                <Field type="password" name="password" />
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
                            <button type="submit" disabled={isSubmitting}>Register</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CustomerRegistration;