import { BACKEND_URL } from "@/config";

async function requestLogs(id: string) {
    const url = BACKEND_URL+`/get_metadata_array?image_id=${id}` || `https://vas-ech6h7cfgchdh2f2.southeastasia-01.azurewebsites.net/get_metadata_array?image_id=${id}`;
    
    try {
        const res = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        return data.metadata;
    } catch (error) {
        console.error("Error fetching logs array:", error);
        throw error; // Optionally re-throw the error if you want the caller to handle it
    }
}

export { requestLogs };
