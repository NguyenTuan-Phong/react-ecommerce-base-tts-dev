const Logo = () => {
    return (
        <svg width="120" height="60" viewBox="0 0 120 60">
        <ellipse
            cx="60"
            cy="30"
            rx="30"
            ry="18"
            fill="none"
            stroke="#888"
            strokeWidth="3"
        />
        <ellipse
            cx="60"
            cy="30"
            rx="18"
            ry="10"
            fill="none"
            stroke="#888"
            strokeWidth="3"
        />
        <circle cx="60" cy="30" r="4" fill="#888" />
        <circle cx="48" cy="30" r="2" fill="#888" />
        <circle cx="72" cy="30" r="2" fill="#888" />
        <path d="M50 30 Q60 40 70 30" stroke="#888" strokeWidth="2" fill="none" />
        </svg>
    );
};
export default Logo