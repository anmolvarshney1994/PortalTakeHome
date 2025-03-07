# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


@app.route("/upload", methods=["POST"])
def upload():
    # Expecting a JSON body with { "shopify_url": "..." }
    data = request.json

    # Extract the url from the JSON
    shopify_url = data.get("shopify_url", None)

    # Print to console (or use logging)
    print(f"Received Shopify URL: {shopify_url}")

    # Respond with a basic success message
    return jsonify({"message": "URL received!", "received_url": shopify_url}), 200


if __name__ == "__main__":
    # For local development
    app.run(debug=True)
