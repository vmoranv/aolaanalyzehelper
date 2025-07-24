import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 设置CORS头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理OPTIONS预检请求
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 只允许GET请求
  if (req.method !== 'GET') {
    res.status(405).json({ error: '只支持GET请求' });
    return;
  }

  try {
    // 代理请求到目标服务器
    const response = await fetch('http://aola.100bt.com/h5/js/gamemain.js', {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP错误: ${response.status} ${response.statusText}`);
    }

    const jsContent = await response.text();

    // 设置正确的Content-Type
    res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    res.status(200).send(jsContent);
  } catch (error) {
    console.error('代理错误:', (error as Error).message);
    res.status(500).json({
      error: `代理请求失败: ${(error as Error).message}`,
    });
  }
}
