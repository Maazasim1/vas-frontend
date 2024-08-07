import { BACKEND_URL } from "@/config";
async function requestNVR() {
    const url = BACKEND_URL+`/view_all_videos` || `https://vas-ech6h7cfgchdh2f2.southeastasia-01.azurewebsites.net/view_all_videos`;
    
    try {
        const res = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        // if (!res.ok) {
        //     throw new Error(`HTTP error! Status: ${res.status}`);
        // }

        const data = await res.json();
        return data.urls;
    } catch (error) {
        console.error("Error fetching logs array:", error);
        throw error; // Optionally re-throw the error if you want the caller to handle it
    }
}

export {requestNVR}