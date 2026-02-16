import React, { useState } from 'react';
import { Engine, Render, World, Bodies } from 'matter-js';

const Calculator = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [contractType, setContractType] = useState('Full-time');
    const [gratuity, setGratuity] = useState(0);

    const calculateGratuity = () => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const totalDays = (end - start) / (1000 * 3600 * 24);
        let days

        if (totalDays <= 5 * 365) {
            days = totalDays * (21 / 30);
        } else {
            days = (5 * 21) + ((totalDays - (5 * 365)) * (30 / 30));
        }
        setGratuity(days);
    };

    // Matter.js setup for animation
    React.useEffect(() => {
        const engine = Engine.create();
        const render = Render.create({
            element: document.body,
            engine: engine
        });

        // Create and add bodies, for illustration
        const boxA = Bodies.rectangle(400, 200, 80, 80);
        const boxB = Bodies.rectangle(450, 50, 80, 80);
        World.add(engine.world, [boxA, boxB]);
        Engine.run(engine);
        Render.run(render);
    }, []);

    return (
        <div>
            <h1>UAE Labour Law Gratuity Calculator</h1>
            <label>
                Start Date:
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </label>
            <label>
                End Date:
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </label>
            <label>
                Contract Type:
                <select value={contractType} onChange={(e) => setContractType(e.target.value)}>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                </select>
            </label>
            <button onClick={calculateGratuity}>Calculate Gratuity</button>
            <h2>Gratuity: {gratuity} Days</h2>
        </div>
    );
};

export default Calculator;