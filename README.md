# does this person exist? — test your AI face detection skills

**live:** https://dinablachman.github.io/realorfake/  

---

## run it locally

static HTML/CSS/JS, no build step.

```bash
git clone https://github.com/dinablachman/realorfake.git
cd realorfake
python -m http.server 8000
# visit http://localhost:8000
```

you can also open `index.html` directly, but some browsers block `fetch()` from local files.

## how it works

shows two faces — one real, one AI-generated — click the one you think is real. 
there are about 600 images in each category. the game just keeps serving random pairs, so you can play indefinitely. after you’ve seen all of them, it’ll start reusing images.

images come from:
- **AI-generated:** [thispersondoesnotexist.com](https://thispersondoesnotexist.com) (StyleGAN2, 2019)
- **real:** FFHQ dataset

## add / update images

- put new real faces in `data/real/`
- put AI faces in `data/fake/`

if using the Python scripts:

```bash
python load_real.py
python load_fake.py
```

then reload the page.

## future directions:

- nicer share feature (graphic with score)
- short video version (Google Veo3 vs stock)
- optional "hints" mode
- resource links for spotting AI images
- better/more varied dataset

## License

MIT License

Copyright (c) 2025 Dina Blachman

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE. 