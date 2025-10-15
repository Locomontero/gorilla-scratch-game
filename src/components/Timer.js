import React, { useState, useEffect } from "react";

export default function Timer({ finish }) {
    const [seconds, setSeconds] = useState(3); // countdown fake de 10s

    useEffect(() => {
        if (seconds <= 0) {
            finish(1); // inicia o MainGame
            return;
        }

        const interval = setTimeout(() => setSeconds(seconds - 1), 1000);
        return () => clearTimeout(interval);
    }, [seconds, finish]);

    return (
        <div className="flex w-full absolute text-center justify-center items-center p-10">
            <div className="flex flex-col items-center">
                <h2 className="text-white text-2xl mb-4">Time until next play:</h2>
                <div className="flex w-[50%] gap-2 justify-center">
                    <span className="text-7xl bg-yellow-400 p-2 rounded-md m-2 select-none">
                        {`${seconds >= 3 ? seconds : " " + seconds}`}
                    </span>
                </div>
            </div>
        </div>
    );
}
