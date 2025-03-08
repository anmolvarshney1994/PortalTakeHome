import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from ml_module import generate_creative
import requests
from urllib.parse import urlparse

load_dotenv()

app = Flask(__name__)
CORS(app)


# Checks if the URL passed has .js or not, if not, appends it.
def ensure_js_suffix(url: str) -> str:
    trimmed = url.strip()
    if trimmed.endswith("/"):
        trimmed = trimmed[:-1]
    if not trimmed.endswith(".js"):
        trimmed += ".js"
    return trimmed


# Fetches the JSON from the product URL
def fetch_shopify_product_json(shopify_url: str) -> dict:
    response = requests.get(shopify_url)
    response.raise_for_status()
    return response.json()


# Extracts the images from the product JSON
def extract_image_urls(product_json: dict) -> list:
    images = product_json.get("images", [])
    if not images:
        images = [
            media.get("src")
            for media in product_json.get("media", [])
            if media.get("media_type") == "image"
        ]
    normalized = []
    for img in images:
        if img.startswith("//"):
            normalized.append("https:" + img)
        else:
            normalized.append(img)
    return normalized


# Endpoint for the frontend
@app.route("/upload", methods=["POST"])
def upload():

    data = request.json
    if not data or "shopify_url" not in data:
        return jsonify({"error": "No shopify_url provided"}), 400

    shopify_url = data["shopify_url"]

    # Step 1: Ensure the URL ends with .js
    js_url = ensure_js_suffix(shopify_url)

    try:
        # Step 2: Fetch product JSON
        product_json = fetch_shopify_product_json(js_url)

        # Step 3: Extract image URLs
        image_urls = extract_image_urls(product_json)

        product_desc = product_json.get("description", "No description provided")

        if not image_urls:
            return jsonify({"error": "No images found in the product JSON"}), 404

        # Instead of downloading, use the first image URL directly
        replicate_outputs = generate_creative(image_urls[0], product_desc)

        # Extract URLs from the Replicate output FileOutput objects
        creative_urls = [item.url for item in replicate_outputs]

        # Return a success message plus details
        return (
            jsonify(
                {
                    "message": "Images downloaded successfully",
                    "product_title": product_json.get("title", "Unknown Product"),
                    "creative_urls": creative_urls,
                }
            ),
            200,
        )

    except requests.exceptions.HTTPError as e:
        return jsonify({"error": f"Failed to fetch Shopify JSON. {str(e)}"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    app.run(debug=True, port=port)
