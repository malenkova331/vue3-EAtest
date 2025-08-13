addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
    const url = new URL(request.url);
    const apiUrl = url.searchParams.get('url');

    if (!apiUrl) {
        return new Response('Добавьте ?url=ВАШ_API_URL', { status: 400 });
    }

    const response = await fetch(apiUrl, {
        headers: { 'Authorization': request.headers.get('Authorization') }
    });

    const modifiedResponse = new Response(response.body, response);
    modifiedResponse.headers.set('Access-Control-Allow-Origin', '*');
    return modifiedResponse;
    }