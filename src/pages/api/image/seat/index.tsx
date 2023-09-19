import {ImageResponse, NextRequest} from 'next/server';

export const config = {
    runtime: "edge",
};

export default function handler(request: NextRequest) {
    const {searchParams} = new URL(request.url);
    const hasId = searchParams.has('id');
    const id = hasId
        ? searchParams.get('id')?.slice(0, 100)
        : 1;
    try {
        return new ImageResponse(
            (
                <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    {id}
                </div>
            ),
            {
                width: 25,
                height: 25,
            },
        );
    } catch (e: any) {
        console.log(`${e}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
