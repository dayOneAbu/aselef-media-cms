import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { path, tag } = await req.json()
    if (!path || typeof path !== 'string') {
      return NextResponse.json({ error: 'Invalid path' }, { status: 400 })
    }
    const secret = req.headers.get('x-revalidate-secret')
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    revalidatePath(path)
    if (tag) revalidateTag(tag)
    return NextResponse.json({ success: true, revalidated: path })
  } catch (error) {
    return NextResponse.json({ error: `Revalidation failed: ${error.message}` }, { status: 500 })
  }
}
