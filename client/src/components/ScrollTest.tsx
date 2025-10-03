import React from 'react';

export function ScrollTest() {
  return (
    <div style={{ height: '200vh', backgroundColor: '#f0f0f0', padding: '20px' }}>
      <h2>Scroll Test Component</h2>
      <a href="#scroll-target">Scroll to Target</a>
      <div id="scroll-target" style={{ marginTop: '100vh' }}>
        <h3>Scroll Target</h3>
      </div>
    </div>
  );
}
