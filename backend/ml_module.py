import replicate
import os
import json

# Initialize the client once (reads token from environment file .env)
replicate_client = replicate.Client(api_token=os.getenv("REPLICATE_API_TOKEN"))


# Creates the creative ad from a single image
def generate_creative(image_url: str, product_desc: str) -> list:

    with open("prompts.json", "r") as f:
        prompt = json.load(f).get("FASHION_PRODUCT_PROMPT")

    # with open(image_path, "rb") as image:
    prompt += product_desc

    input = {"prompt": prompt, "image": image_url, "aspect_ratio": "3:2"}

    output = replicate_client.run(
        "stability-ai/stable-diffusion-3",
        input=input,
    )

    return output
