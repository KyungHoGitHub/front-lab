import React from "react";
import zxcvbn from "zxcvbn";
import './PasswordStrengthBar.css';
import feedbackTranslations from "../translations/passwordFeedback.json";

interface PasswordStrengthBarProps {
    password: string;
}

interface FeedbackTranslations {
    warnings: { [key: string]: string };
    suggestions: { [key: string]: string };
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

    const translateFeedback = (warning: string, suggestions: string[]) => {
        const warningMap = (feedbackTranslations as FeedbackTranslations).warnings;
        const suggestionMap = (feedbackTranslations as FeedbackTranslations).suggestions;
        console.log("Original Warning:", warning); // 디버깅용
        console.log("Original Suggestions:", suggestions); // 디버
        return {
            warning: warningMap[warning] || warning,
            suggestions: suggestions.map((s) => suggestionMap[s] || s),
        }
    }
    const translatedFeedback = translateFeedback(feedback.warning, feedback.suggestions);

    return (
        <>
            {Boolean(password.length) && (
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
                            <span className="strength-label">암호강도 : {getStrengthLabel(strength)}</span>

                            {translatedFeedback.warning && (
                                <span className="warning">{translatedFeedback.warning}</span>
                            )}
                            {translatedFeedback.suggestions.length > 0 && (
                                <ul className="suggestions">
                                    {translatedFeedback.suggestions.map((suggestion, index) => (
                                        <li key={index}>{suggestion}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                </div>
            )
            }
        </>
    )
}
export default PasswordStrengthBar;