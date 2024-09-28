import { NextRequest } from 'next/server';

import { getToken } from 'next-auth/jwt';

export async function GET(request: Request) {
  return Response.json({ message: 'GET REQUEST ON /API/TEST HAS BEEN CALLED.' });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const accessToken = req.headers.get('Authorization');

  console.log('REQUEST BODY: ', body);
  console.log('REQUEST HEADER ACCESS TOKEN: ', accessToken);

  const token = await getToken({ req });

  console.log('TOKEN: ', token);

  return Response.json({ message: 'I am Groot!' });
}
