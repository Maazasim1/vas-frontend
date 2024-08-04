import { BACKEND_URL } from "@/config";
async function requestImages(email: string) {
    try {
        const res = await fetch(BACKEND_URL+`/get_metadata?email=${email}`||`https://vas-ech6h7cfgchdh2f2.southeastasia-01.azurewebsites.net/get_metadata?email=${email}`, {
            method: "GET",
            headers: { "content-type": "application/json" }
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        return data.metadata;
    } catch (error) {
        console.error("Error fetching images metadata:", error);
        throw error; // Optionally re-throw the error if you want the caller to handle it
    }
}

export { requestImages };
