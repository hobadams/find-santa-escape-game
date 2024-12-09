const Snowflakes = () => {
  const snowflakes = Array.from({ length: 50 }); // Create an array of 50 snowflakes

  return (
    <div
      className="fixed z-0 left-0 top-0 w-full h-full overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900"
    >
      {snowflakes.map((_, index) => {
        const size = `${Math.random() * 1 + 0.1}vw`;
        const leftStart = `${Math.random() * 100}vw`;
        const animationDuration = `${5 + Math.random() * 12}s`;
        const animationDelay = `${-Math.random() * 12}s`;
        const isBlurred = index % 6 === 0;
        const opacity = Math.random() * (1 - 0.1) + 0.1;

        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: '-5vh',
              left: leftStart,
              width: size,
              height: size,
              background: 'white',
              opacity: opacity,
              borderRadius: '50%',
              filter: isBlurred ? 'blur(1px)' : 'none',
              animation: `snowfall ${animationDuration} linear infinite`,
              animationDelay,
            }}
          />
        );
      })}

      {/* Inline keyframes definition */}
      <style>
        {`
          @keyframes snowfall {
            0% {
              transform: translate3d(0, 0, 0);
            }
            100% {
              transform: translate3d(0, 110vh, 0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Snowflakes;