import fetch from 'node-fetch';

const codes = ['fzy3KqBS', 'Km7gvMRd', 'HYnJ2vBH', 'VfhJH9Vb', 'RmpJF9Zf', 'Y7DL9kCY', 'fsqSLZRJ', 'TxN5wG3b'];

async function test() {
  for (const code of codes) {
    const url = `https://postimg.cc/${code}`;
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
        }
      });
      const html = await res.text();
      const regex = /https:\/\/i\.postimg\.cc\/[^\s"']+/g;
      const matches = html.match(regex);
      console.log(`\nCode: ${code}`);
      if (matches) {
        const unique = Array.from(new Set(matches));
        console.log('Matches:', unique);
      } else {
        console.log('No matches');
      }
    } catch (err: any) {
      console.error(code, err.message);
    }
  }
}

test();
