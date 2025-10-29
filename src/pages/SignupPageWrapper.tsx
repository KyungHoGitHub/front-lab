import LoginSignupPage from "@/pages/LoginSignupPage.tsx";
import SignupForm from "@/features/signup/components/SignupForm.tsx";


const SignupPageWrapper=()=>{
    return (
        <LoginSignupPage formComponent={<SignupForm title="Sign Up"/>}/>
    )
}
export default SignupPageWrapper;