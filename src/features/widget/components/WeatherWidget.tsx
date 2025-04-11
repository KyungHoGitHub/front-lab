import React, { useState, useEffect } from 'react';
import {
    WiDaySunny,
    WiCloud,
    WiRain,
    WiSnow,
} from 'react-icons/wi'; // Weather Icons에서 가져옴
import './WeatherWidget.css';

interface WeatherData {
    main: {
        temp: number;
        humidity: number;
    };
    weather: {
        description: string;
        icon: string;
    }[];
    name: string;
}

const WeatherWidget: React.FC = () => {
    const [city, setCity] = useState<string>('Seoul');
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const currentDate = new Date().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    // 날씨 상태에 따른 아이콘 매핑
    const getWeatherIcon = (description: string) => {
        switch (description) {
            case 'clear sky':
                return <WiDaySunny className="weather-icon" />;
            case 'few clouds':
                return <WiCloud className="weather-icon" />;
            case 'rain':
                return <WiRain className="weather-icon" />;
            case 'snow':
                return <WiSnow className="weather-icon" />;
            default:
                return <WiCloud className="weather-icon" />; // 기본값
        }
    };

    // 목데이터 생성 함수
    const getMockWeatherData = (cityName: string): WeatherData => {
        const mockData: WeatherData = {
            name: cityName,
            main: {
                temp: Math.floor(Math.random() * 20) + 10,
                humidity: Math.floor(Math.random() * 40) + 50,
            },
            weather: [
                {
                    description: ['clear sky', 'few clouds', 'rain', 'snow'][
                        Math.floor(Math.random() * 4)
                        ],
                    icon: '', // 더 이상 사용하지 않으므로 빈 값
                },
            ],
        };
        return mockData;
    };

    const fetchWeatherData = (cityName: string) => {
        setLoading(true);
        setError(null);
        setTimeout(() => {
            try {
                const mockData = getMockWeatherData(cityName);
                setWeatherData(mockData);
            } catch (err) {
                setError('목데이터 생성에 실패했습니다.');
            } finally {
                setLoading(false);
            }
        }, 1000);
    };

    useEffect(() => {
        fetchWeatherData(city);
    }, [city]);

    const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetchWeatherData(city);
    };

    return (
        <div className="weather-info-container">
            <form onSubmit={handleSubmit} className="weather-form">
                <input
                    type="text"
                    value={city}
                    onChange={handleCityChange}
                    placeholder="도시 이름을 입력하세요"
                    className="weather-input"
                />
                <button type="submit" className="weather-button">
                    확인
                </button>
            </form>

            {loading && <p className="loading-text">로딩 중...</p>}
            {error && <p className="error-message">{error}</p>}
            {weatherData && !loading && (
                <div className="weather-card">
                    <div className="weather-header">
                        <h2>{weatherData.name}</h2>
                        <span className="weather-date">{currentDate}</span>
                    </div>
                    <div className="weather-details">
                        {getWeatherIcon(weatherData.weather[0].description)}
                        <p className="weather-temp">{weatherData.main.temp}°C</p>
                        <p className="weather-desc">{weatherData.weather[0].description}</p>
                        <p className="weather-humidity">습도: {weatherData.main.humidity}%</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeatherWidget;