from datasets import load_dataset
from itertools import islice
from PIL import Image
import os

os.makedirs("data/real", exist_ok=True)

# 1. stream so it doesn't pre-download shards
stream_ds = load_dataset(
    "marcosv/ffhq-dataset",
    split="train",
    streaming=True   # <- important
)

# 2. take the first 600 examples only
for i, item in enumerate(islice(stream_ds, 600)):
    img: Image.Image = item["image"]      # already decoded to PIL
    img.save(f"data/real/{i}.jpg")

print("saved", i + 1, "real faces")
