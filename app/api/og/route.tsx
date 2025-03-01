import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const username = searchParams.get('username');
  const correct = searchParams.get('correct') || '0';
  const total = searchParams.get('total') || '0';

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 40,
          color: 'black',
          background: 'white',
          width: '100%',
          height: '100%',
          padding: '50px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >

        <div style={{ fontSize: '80px', marginBottom: '20px' }}>🌎</div>
        
        <h1 style={{ 
          fontSize: '48px',
          fontWeight: 'bold',
          margin: '0 0 20px 0',
          color: '#1e40af'
        }}>
          Globetrotter Challenge
        </h1>

        {username !== null ? (
          <p style={{ 
            fontSize: '32px',
            color: '#475569',
            marginTop: '16px' 
          }}>
            {username} has challenged you to beat their score of {correct}/{total}!
          </p>
        ) : (
          <p style={{ 
            fontSize: '32px',
            color: '#475569',
            marginTop: '16px' 
          }}>
            Test your geography knowledge!
          </p>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}