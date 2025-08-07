
import React, { useState } from 'react';

const duckData = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  code: (1000 + Math.floor(Math.random() * 9000)).toString(),
  name: '',
  finder: '',
  unlocked: false,
}));

export default function DuckHunt() {
  const [ducks, setDucks] = useState(duckData);
  const [codeEntry, setCodeEntry] = useState('');
  const [selectedDuck, setSelectedDuck] = useState(null);
  const [finderName, setFinderName] = useState('');
  const [duckName, setDuckName] = useState('');

  const handleCodeSubmit = () => {
    const duck = ducks.find((d) => d.code === codeEntry);
    if (duck) {
      setSelectedDuck(duck);
    } else {
      alert('Invalid code');
    }
  };

  const handleNameSubmit = () => {
    setDucks((prev) =>
      prev.map((d) =>
        d.id === selectedDuck.id ? { ...d, name: duckName, finder: finderName, unlocked: true } : d
      )
    );
    setSelectedDuck(null);
    setCodeEntry('');
    setFinderName('');
    setDuckName('');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>🦆 Hope Ducks - Cruise G527 Duck Hunt</h1>
      <p style={{ textAlign: 'center' }}>Aboard the P&O Iona | 23–30 August 2025 | Norwegian Fjords</p>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h2>Found a duck?</h2>
        <input
          type="text"
          placeholder="Enter 4-digit code"
          maxLength={4}
          value={codeEntry}
          onChange={(e) => setCodeEntry(e.target.value)}
          style={{ padding: '8px', fontSize: '16px' }}
        />
        <button onClick={handleCodeSubmit} style={{ marginLeft: '8px', padding: '8px 16px' }}>
          Unlock
        </button>
      </div>

      {selectedDuck && (
        <div
          style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '16px',
            maxWidth: '400px',
            margin: '20px auto',
          }}
        >
          <h3>Name Duck #{selectedDuck.id}</h3>
          <input
            type="text"
            placeholder="Your name (finder)"
            value={finderName}
            onChange={(e) => setFinderName(e.target.value)}
            style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
          />
          <input
            type="text"
            placeholder="Duck's new name"
            value={duckName}
            onChange={(e) => setDuckName(e.target.value)}
            style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
          />
          <button onClick={handleNameSubmit} style={{ padding: '8px 16px' }}>
            Submit
          </button>
        </div>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
          gap: '16px',
          marginTop: '40px',
        }}
      >
        {ducks.map((duck) => (
          <div
            key={duck.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '16px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '48px' }}>🦆</div>
            <p style={{ fontWeight: 'bold' }}>Duck #{duck.id}</p>
            {duck.unlocked ? (
              <>
                <p style={{ fontStyle: 'italic', color: '#555' }}>"{duck.name}"</p>
                <p style={{ fontSize: '12px' }}>Found by {duck.finder}</p>
              </>
            ) : (
              <p style={{ color: '#aaa' }}>Locked</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
