'use client';

import { useState } from 'react';

interface Branch {
  name: string;
}

const BranchFetcher = () => {
  const [token, setToken] = useState('');
  const [branches, setBranches] = useState<Branch[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const response = await fetch('/api/get-branches', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    if (response.ok) {
      const data = await response.json();
      setBranches(data.branches);
    } else {
      setError('Failed to fetch branches. Please check your token.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          GitHub Token:
          <input type="password" value={token} onChange={(e) => setToken(e.target.value)} />
        </label>
        <button type="submit">Fetch Branches</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {branches.length > 0 && (
        <ul>
          {branches.map((branch) => (
            <li key={branch.name}>{branch.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BranchFetcher;
