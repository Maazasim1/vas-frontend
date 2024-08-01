const {BACKEND_URL}=process.env;
async function requestLogs(id: string) {
    try {
        const res = await fetch(`${process.env.BACKEND_URL}/get_metadata_array?image_id=${id}`, {
            method: "GET",
            headers: { "content-type": "application/json" }
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        return data.metadata;
    } catch (error) {
        console.error("Error fetching logs array:", error);
        throw error; // Optionally re-throw the error if you want the caller to handle it
    }
}

export { requestLogs };
