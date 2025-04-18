'use client';
import { useState } from 'react';
import styles from './page.module.css';

export default function HomePage() {
  const [url, setUrl] = useState('');
  const [alias, setAlias] = useState('');
  const [message, setMessage] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async () => {
    const res = await fetch('/api/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, alias }),
    });
    const data = await res.json();

    if (!data.success) {
      setMessage(data.error || 'Something went wrong.');
      setShortUrl('');
    } else {
      const full = `${window.location.origin}/${alias}`;
      setShortUrl(full);
      setMessage('Shortened successfully!');
    }
  };

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>URL Shortener</h1>
      <p className={styles.subtitle}>
        Shorten your long URLs into compact, shareable links
      </p>

      <div className={styles.card}>
        <label>
          URL
          <input
            type="text"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="https://example.com/"
          />
        </label>

        <label>
          Custom Alias
          <input
            type="text"
            value={alias}
            onChange={e => setAlias(e.target.value)}
            placeholder="my‑cool‑alias"
          />
        </label>

        <button className={styles.shorten} onClick={handleSubmit}>
          Shorten
        </button>

        {message && <p className={styles.message}>{message}</p>}

        {shortUrl && (
          <div className={styles.result}>
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
            <button
              onClick={() => navigator.clipboard.writeText(shortUrl)}
            >
              Copy
            </button>
          </div>
        )}
      </div>
    </main>
  );
}


