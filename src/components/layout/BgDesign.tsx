const BgDesign = () => {
    // This component is used to display a background design on the website
    return (
        <div className="fixed top-0 left-0 h-screen w-full -z-50">
            <div className="absolute inset-0 ">
                <div className="absolute inset-0">
                    {[...Array(100)].map((_, index) => (
                        <div
                            key={index}
                            className={`absolute w-[2px] h-[2px] bg-primary rounded-full scale-up-down`}
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 4}s`,
                            }}
                        />
                    ))}
                    {[...Array(100)].map((_, index) => (
                        <div
                            key={index}
                            className="absolute w-[2px] h-[2px] bg-white rounded-full scale-up-down"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 4}s`,
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BgDesign;
