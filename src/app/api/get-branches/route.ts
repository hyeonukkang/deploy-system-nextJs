import { NextResponse } from 'next/server';

const GITHUB_API_URL = 'https://api.github.com';

export async function POST(request: Request) {
  const { token } = await request.json();
  const owner = process.env.GITHUB_REPO_OWNER;
  const repo = process.env.GITHUB_REPO_NAME;
  console.log('🚀 ~ POST ~ token:', token);
  console.log('🚀 ~ POST ~ owner:', owner);
  console.log('🚀 ~ POST ~ repo:', repo);

  if (!token || !owner || !repo) {
    return NextResponse.json({ message: 'Missing required parameters.' }, { status: 400 });
  }

  try {
    const response = await fetch(`${GITHUB_API_URL}/repos/${owner}/${repo}/branches`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json({ message: 'Failed to fetch branches from GitHub.' }, { status: response.status });
    }

    const branches = await response.json();
    return NextResponse.json({ branches });
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error }, { status: 500 });
  }
}
