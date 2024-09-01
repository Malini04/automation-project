import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

export async function POST(request) {
  try {
    // const response = await execPromise('node ../internshala-backend/server.js');
    const response = await execPromise('node server.js');

    console.log(response.stdout);
    return NextResponse.json({ success: true, message: 'Script executed successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Script execution failed' });
  }
}
