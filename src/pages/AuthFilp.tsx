import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, User, ArrowRight } from 'lucide-react';
import LoginForms from "@/features/login/components/LoginForm.tsx";
export default function AuthFilp() {
    const [isLogin, setIsLogin] = useState(true);

    return (
            <div className="w-full max-w-6xl">
                <div className="relative w-full h-screen lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl bg-white">

                    {/* A영역 - 좌측 */}
                    <div className="absolute left-0 top-0 w-1/2 h-full overflow-hidden">
                        {/* 로그인 상태: 이미지 */}
                        <div
                            className={`w-full h-full transition-all duration-500 ${
                                isLogin
                                    ? 'translate-y-0 scale-100 opacity-100'
                                    : 'translate-y-full scale-95 opacity-0'
                            }`}
                        >
                            <ImageSection
                                title="로그인"
                                subtitle="계정으로 접속하세요"
                                icon={<Mail className="w-24 h-24" />}
                                bgGradient="from-purple-400 to-pink-400"
                            />
                        </div>

                        {/* 회원가입 상태: 회원가입 폼 */}
                        <div
                            className={`absolute top-0 left-0 w-full h-full transition-all duration-500 ${
                                isLogin
                                    ? 'translate-y-full scale-95 opacity-0'
                                    : 'translate-y-0 scale-100 opacity-100'
                            }`}
                        >
                            <FormSection>
                                <SignupForm onSwitchToLogin={() => setIsLogin(true)} />
                            </FormSection>
                        </div>
                    </div>

                    {/* B영역 - 우측 */}
                    <div className="absolute right-0 top-0 w-1/2 h-full overflow-hidden">
                        {/* 로그인 상태: 로그인 폼 */}
                        <div
                            className={`w-full h-full transition-all duration-500 ${
                                isLogin
                                    ? 'translate-y-0 scale-100 opacity-100'
                                    : '-translate-y-full scale-95 opacity-0'
                            }`}
                        >
                            <FormSection>
                                <LoginForm onSwitchToSignup={() => setIsLogin(false)} />
                            </FormSection>
                        </div>

                        {/* 회원가입 상태: 이미지 */}
                        <div
                            className={`absolute top-0 right-0 w-full h-full transition-all duration-500 ${
                                isLogin
                                    ? '-translate-y-full scale-95 opacity-0'
                                    : 'translate-y-0 scale-100 opacity-100'
                            }`}
                        >
                            <ImageSection
                                title="회원가입"
                                subtitle="새 계정을 만들어보세요"
                                icon={<User className="w-24 h-24" />}
                                bgGradient="from-blue-400 to-cyan-400"
                            />
                        </div>
                    </div>
                </div>
            </div>
    );
}

function ImageSection({
                          title,
                          subtitle,
                          icon,
                          bgGradient
                      }: {
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    bgGradient: string;
}) {
    return (
        <div className={`bg-gradient-to-br ${bgGradient} w-full h-full flex items-center justify-center p-8 relative overflow-hidden`}>
            {/* 배경 장식 요소 */}
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 mix-blend-overlay blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-20 mix-blend-overlay blur-3xl"></div>

            <div className="relative z-10 text-center flex flex-col items-center">
                {/* SVG 일러스트레이션 */}
                {title === "로그인" ? (
                    <svg width="250" height="250" viewBox="0 0 250 250" className="mb-8 drop-shadow-lg">
                        {/* 로그인 관련 일러스트 - 열린 자물쇠 */}
                        <defs>
                            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.9 }} />
                                <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 0.6 }} />
                            </linearGradient>
                        </defs>

                        {/* 배경 원 */}
                        <circle cx="125" cy="125" r="100" fill="white" opacity="0.1" />

                        {/* 자물쇠 몸체 */}
                        <rect x="70" y="120" width="110" height="70" rx="8" fill="url(#grad1)" stroke="white" strokeWidth="2" opacity="0.8" />

                        {/* 자물쇠 구멍 */}
                        <circle cx="125" cy="145" r="8" fill="#667eea" opacity="0.3" />

                        {/* 자물쇠 고리 */}
                        <path d="M 90 120 A 35 35 0 0 1 160 120" stroke="white" strokeWidth="8" fill="none" opacity="0.7" strokeLinecap="round" />

                        {/* 키 */}
                        <g opacity="0.8">
                            <rect x="170" y="95" width="50" height="12" rx="6" fill="white" />
                            <circle cx="190" cy="101" r="8" fill="white" />
                            <rect x="195" y="98" width="25" height="6" rx="3" fill="white" />
                        </g>

                        {/* 광선 효과 */}
                        <circle cx="125" cy="80" r="4" fill="white" opacity="0.6" />
                        <circle cx="170" cy="90" r="3" fill="white" opacity="0.4" />
                    </svg>
                ) : (
                    <svg width="250" height="250" viewBox="0 0 250 250" className="mb-8 drop-shadow-lg">
                        {/* 회원가입 관련 일러스트 - 사용자 추가 */}
                        <defs>
                            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.9 }} />
                                <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 0.6 }} />
                            </linearGradient>
                        </defs>

                        {/* 배경 원 */}
                        <circle cx="125" cy="125" r="100" fill="white" opacity="0.1" />

                        {/* 사용자 1 - 왼쪽 */}
                        <circle cx="85" cy="95" r="18" fill="url(#grad2)" stroke="white" strokeWidth="2" opacity="0.8" />
                        <ellipse cx="85" cy="130" rx="25" ry="20" fill="url(#grad2)" stroke="white" strokeWidth="2" opacity="0.8" />

                        {/* 사용자 2 - 오른쪽 */}
                        <circle cx="165" cy="95" r="18" fill="url(#grad2)" stroke="white" strokeWidth="2" opacity="0.8" />
                        <ellipse cx="165" cy="130" rx="25" ry="20" fill="url(#grad2)" stroke="white" strokeWidth="2" opacity="0.8" />

                        {/* 더하기 기호 */}
                        <g opacity="0.9">
                            <rect x="115" y="155" width="20" height="4" rx="2" fill="white" />
                            <rect x="122" y="148" width="4" height="20" rx="2" fill="white" />
                            <circle cx="125" cy="157" r="22" stroke="white" strokeWidth="2" fill="none" />
                        </g>

                        {/* 광선 효과 */}
                        <circle cx="60" cy="75" r="3" fill="white" opacity="0.5" />
                        <circle cx="190" cy="75" r="3" fill="white" opacity="0.5" />
                        <circle cx="125" cy="200" r="2" fill="white" opacity="0.4" />
                    </svg>
                )}

                <h2 className="text-5xl font-bold text-white mb-4 tracking-tight">{title}</h2>
                <p className="text-white text-opacity-80 text-lg font-light max-w-xs mx-auto leading-relaxed">{subtitle}</p>

                {/* 하단 장식 */}
                <div className="mt-12 flex gap-2 justify-center">
                    <div className="w-2 h-2 rounded-full bg-white opacity-60"></div>
                    <div className="w-2 h-2 rounded-full bg-white opacity-40"></div>
                    <div className="w-2 h-2 rounded-full bg-white opacity-20"></div>
                </div>
            </div>
        </div>
    );
}

function FormSection({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-full flex items-center justify-center p-8 bg-white">
            {children}
        </div>
    );
}

function LoginForm({ onSwitchToSignup }: { onSwitchToSignup: () => void }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="w-full max-w-sm space-y-8">
            <div className="space-y-2">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">로그인</h1>
                <p className="text-gray-500 text-base font-light">계정으로 접속하세요</p>
            </div>

            <div className="space-y-4">
                <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">이메일</label>
                    <Input
                        type="email"
                        placeholder="example@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-10 transition-all duration-200 placeholder-gray-400"
                    />
                </div>

                <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">비밀번호</label>
                    <Input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-10 transition-all duration-200 placeholder-gray-400"
                    />
                </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                로그인하기
            </Button>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-3 bg-white text-gray-400 text-xs font-medium">또는</span>
                </div>
            </div>

            <div className="text-center space-y-3">
                <p className="text-gray-600 text-sm">계정이 없으신가요?</p>
                <Button
                    variant="outline"
                    className="w-full border-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-400 py-3 text-base font-semibold rounded-xl transition-all duration-200"
                    onClick={onSwitchToSignup}
                >
                    회원가입하기
                    <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </div>
    );
}

function SignupForm({ onSwitchToLogin }: { onSwitchToLogin: () => void }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <div className="w-full max-w-sm space-y-8">
            <div className="space-y-2">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">회원가입</h1>
                <p className="text-gray-500 text-base font-light">새 계정을 만들어보세요</p>
            </div>

            <div className="space-y-3">
                <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">이름</label>
                    <Input
                        type="text"
                        placeholder="홍길동"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-10 transition-all duration-200 placeholder-gray-400"
                    />
                </div>

                <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">이메일</label>
                    <Input
                        type="email"
                        placeholder="example@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-10 transition-all duration-200 placeholder-gray-400"
                    />
                </div>

                <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">비밀번호</label>
                    <Input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-10 transition-all duration-200 placeholder-gray-400"
                    />
                </div>

                <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">비밀번호 확인</label>
                    <Input
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-10 transition-all duration-200 placeholder-gray-400"
                    />
                </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white py-3 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                회원가입하기
            </Button>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-3 bg-white text-gray-400 text-xs font-medium">또는</span>
                </div>
            </div>

            <div className="text-center space-y-3">
                <p className="text-gray-600 text-sm">이미 계정이 있으신가요?</p>
                <Button
                    variant="outline"
                    className="w-full border-2 border-cyan-200 text-cyan-600 hover:bg-cyan-50 hover:border-cyan-400 py-3 text-base font-semibold rounded-xl transition-all duration-200"
                    onClick={onSwitchToLogin}
                >
                    로그인하기
                    <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </div>
    );
}