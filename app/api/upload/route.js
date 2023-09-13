

export async function POST(request) {
    const data = await request.formData()
    console.log("data in upload.js:", data)
    const file = data.get('files')
    console.log("data in upload.js:", file)
    

    return new Response(JSON.stringify({ message: 'Hello from the worker!' }))
    
}