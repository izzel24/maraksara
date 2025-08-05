export const CircularProgress = ({ score }) => {
    const radius = 45;
    const stroke = 2;
    const normalizedRadius = radius - stroke / 2;
    const circumference = 2 * Math.PI * normalizedRadius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <div className='flex justify-center items-center h-[100px] w-[100px] rounded-full relative'>
            <svg
                height={radius * 2}
                width={radius * 2}
                className='rotate-[-90deg]'
            >
                <circle
                    stroke="#d1fae5" 
                    fill="transparent"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
                <circle
                    stroke="#22c55e" 
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
            </svg>
            <div className='absolute text-center'>
                <span className='text-2xl font-bold font-inter'>{score}</span>
                <span className='text-sm'>/100</span>
            </div>
        </div>
    );
};