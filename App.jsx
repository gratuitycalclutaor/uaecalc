import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import Matter from 'matter-js';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const App = () => {
  const [salary, setSalary] = useState(0);
  const [years, setYears] = useState(0);

  const calculateGratuity = () => {
    // Simple gratuity calculation example
    return (salary / 30) * years;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const gratuityAmount = calculateGratuity();

    // Send data to Formspree
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({gratuityAmount})
    });

    // Save to Firestore
    try {
      await addDoc(collection(db, 'gratuity'), { gratuityAmount });
      alert('Gratuity calculated successfully!');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  // Setup Matter.js for physics (optional)
  const setupMatterJS = () => {
    const engine = Matter.Engine.create();
    const world = engine.world;
    // Setup physics as needed
  };

  return (
    <div className="bg-gold text-navy-blue min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-5">UAE Gratuity Calculator</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input type="number" placeholder="Monthly Salary" value={salary} onChange={(e) => setSalary(e.target.value)} className="border rounded p-2" />
        <input type="number" placeholder="Years of Service" value={years} onChange={(e) => setYears(e.target.value)} className="border rounded p-2" />
        <button type="submit" className="bg-navy-blue text-white rounded p-2">Calculate Gratuity</button>
      </form>
    </div>
  );
};

export default App;
