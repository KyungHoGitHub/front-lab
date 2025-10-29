import LoginForm from "@/features/login/components/LoginForm.tsx";
import LoginSignupPage from "@/pages/LoginSignupPage.tsx";

const LoginPageWrapper = () => {

    return (
        <LoginSignupPage formComponent={<LoginForm/>}/>
    )
}
export default LoginPageWrapper;