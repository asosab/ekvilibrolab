// netlify/functions/proxy-image.js
//import fetch from "node-fetch";

/**
 * Proxy de imágenes: recibe ?url=... y devuelve la imagen remota
 */
export async function handler(event) {
  try {
    const url = event.queryStringParameters.url;
    if (!url) {
      return { statusCode: 400, body: "Missing url param" };
    }

    const resp = await fetch(url);
    if (!resp.ok) {
      return { statusCode: resp.status, body: "Error fetching image" };
    }

    // Copiar headers principales (content-type, length, etc.)
    const contentType = resp.headers.get("content-type") || "image/jpeg";
    const buffer = await resp.arrayBuffer();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*", // <- habilita CORS
      },
      body: Buffer.from(buffer).toString("base64"),
      isBase64Encoded: true,
    };
  } catch (err) {
    return { statusCode: 500, body: "Server error: " + err.message };
  }
}
