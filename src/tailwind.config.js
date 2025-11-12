module.exports = {
    theme: {
        extend: {
            keyframes: {
                hop: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                moveLeft: {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(0)' },
                },
            },
            animation: {
                hop: 'hop 0.5s ease-in-out infinite',
                moveLeft: 'moveLeft 0.5s ease-out forwards',
            },
        },
    },
};