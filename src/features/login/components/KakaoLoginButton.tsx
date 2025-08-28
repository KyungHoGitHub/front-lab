import KakaoLogin from "react-kakao-login";
import './KakaoLoginButton.css';
import kakaoImg from '@assets/kakao_login_medium_wide.png';

const KakaoLoginButton = () => {
    const handleSuccess = (res: any) => {
        console.log('성공 응답:', res);
        // 여기에서 프론트 → 인증 서버로 code 또는 토큰 전달
    };

    const handleFail = (err: any) => {
        console.error('실패 응답:', err);
    };


    return (
        <KakaoLogin
            token=""
            onSuccess={handleSuccess}
            onFailure={handleFail}
            render={({onClick}) => (
                <img
                    src={kakaoImg}
                    alt="kakao"
                    style={{cursor: 'pointer'}}
                    onClick={onClick}
                    className="
                     w-[320px] h-[47px] cursor-pointer
                     transition-transform duration-100 ease-in-out
                     hover:scale-105
                     active:scale-95
                     rounded-lg
                     shadow-md
                      "
                />
            )}
        />
    )
}
export default KakaoLoginButton;