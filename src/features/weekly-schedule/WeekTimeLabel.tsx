const WeekTimeLabel = () => {
    const hours = Array.from({length: 12}, (_, i) => i + 8);
    return (
        <div className="flex flex-col border-r text-xs bg-gray-50">
            {hours.map((h) => (
                <div key={h} className="h-[60px] border-b text-center text-gray-500">
                    {h}:00
                </div>
            ))}
        </div>
    );
};

export default WeekTimeLabel;