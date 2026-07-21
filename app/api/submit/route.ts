import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Here you can add custom logic
    // For now, we just return success
    // In the future, you can connect to a database here

    return NextResponse.json({ 
      success: true, 
      message: 'Data received successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
