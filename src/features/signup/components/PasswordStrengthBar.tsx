import React from "react";
import zxcvbn from "zxcvbn";
import './PasswordStrengthBar.css';

interface PasswordStrengthBarProps {
    password: string;
}

const PasswordStrengthBar: React.FC<PasswordStrengthBarProps> = ({password}) => {
    const {strength, feedback} = React.useMemo(() => {
        if (!password) return {strength: 0, feedback: {warning: "", suggestions: []}};
        const result = zxcvbn(password);
        const score = result.score;
        // 단순 반복 패턴 조정
        if (/^(.)\1+$/.test(password)) {
            return {strength: Math.min(score, 1), feedback: result.feedback};
        }
        return {strength: score, feedback: result.feedback};
    }, [password]);

    const getStrengthColor = (score: number) => {
        switch (score) {
            case 0:
                return "red";
            case 1:
                return "orange";
            case 2:
                return "yellow";
            case 3:
                return "lightgreen";
            case 4:
                return "green";
            default:
                return "gray";
        }
    };

    const getStrengthLabel = (score: number) => {
        switch (score) {
            case 0:
                return "매우 약함";
            case 1:
                return "약함";
            case 2:
                return "보통";
            case 3:
                return "강함";
            case 4:
                return "매우 강함";
            default:
                return "없음";
        }
    };

    return (
        <div className="password-strength-container">
            <progress
                value={strength}
                max={4}
                className="password-strength-bar"
                // style={{backgroundColor: getStrengthColor(strength)}}
            />
            <style>{`
        .password-strength-bar::-webkit-progress-value {
          background-color: ${getStrengthColor(strength)};
        }
        .password-strength-bar::-moz-progress-bar {
          background-color: ${getStrengthColor(strength)};
        }
      `}</style>
            {password && (
                <div className="password-strength-feedback">
                    <span className="strength-label">{getStrengthLabel(strength)}</span>
                    {feedback.warning && <span className="warning">{feedback.warning}</span>}
                    {feedback.suggestions.length > 0 && (
                        <ul className="suggestions">
                            {feedback.suggestions.map((suggestion, index) => (
                                <li key={index}>{suggestion}</li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    )
}
export default PasswordStrengthBar;