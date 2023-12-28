import { render, screen, cleanup} from '@testing-library/react';
import LoginForm from '../Login';
import { BrowserRouter } from 'react-router-dom';

test('should render login form component', () => {
    render(
        <BrowserRouter>
            <LoginForm />
        </BrowserRouter>);
    const emailElement = screen.getByTestId('email');
    expect(emailElement).toBeInTheDocument()
})

test('password text should be Password', () => {
    render(
        <BrowserRouter>
            <LoginForm />
        </BrowserRouter>);
    const emailElement = screen.getByTestId('password');
    expect(emailElement).toHaveTextContent('Password')
})