# WEBP to PNG - JPG - GIF Converter
To create a detailed WEBP to JPG/PNG/GIF converter using JavaScript and HTML, you can use the `<canvas>` element to manipulate and convert images. Below is a step-by-step guide to building a simple web-based converter.

### 1. HTML Structure
Create a basic HTML structure with file input, format selection, and a button to trigger the conversion.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WEBP to JPG/PNG/GIF Converter</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        #preview {
            max-width: 100%;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <h1>WEBP to JPG/PNG/GIF Converter</h1>
    <input type="file" id="webpInput" accept=".webp" />
    <select id="format">
        <option value="jpg">JPG</option>
        <option value="png">PNG</option>
        <option value="gif">GIF</option>
    </select>
    <button id="convertBtn">Convert</button>
    <div id="preview"></div>
    <a id="downloadLink" style="display:none;">Download</a>

    <script src="converter.js"></script>
</body>
</html>
```

### 2. JavaScript Logic
Create a `converter.js` file to handle the conversion logic.

```javascript
document.getElementById('convertBtn').addEventListener('click', function() {
    const fileInput = document.getElementById('webpInput');
    const format = document.getElementById('format').value;
    const preview = document.getElementById('preview');
    const downloadLink = document.getElementById('downloadLink');

    if (fileInput.files.length === 0) {
        alert('Please select a WEBP file.');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            canvas.toBlob(function(blob) {
                const url = URL.createObjectURL(blob);
                preview.innerHTML = `<img src="${url}" alt="Converted Image" />`;
                downloadLink.href = url;
                downloadLink.download = `converted_image.${format}`;
                downloadLink.style.display = 'block';
            }, `image/${format}`, 1.0);
        };
        img.src = event.target.result;
    };

    reader.readAsDataURL(file);
});
```

### 3. Explanation
- **File Input**: The user selects a WEBP file using the file input.
- **Format Selection**: The user selects the desired output format (JPG, PNG, or GIF).
- **Conversion**: When the "Convert" button is clicked, the script reads the WEBP file, draws it onto a canvas, and then converts it to the selected format using `canvas.toBlob()`.
- **Preview and Download**: The converted image is displayed in the preview area, and a download link is provided.

### 4. Limitations
- **GIF Conversion**: The above code converts a single WEBP image to a static GIF. For animated GIFs, you would need a more complex solution involving libraries like `gif.js`.
- **Browser Support**: Ensure that the browser supports the WEBP format and the `<canvas>` element.

### 5. Libraries for Advanced Features
For more advanced features (e.g., animated GIFs, batch conversion), consider using libraries like:
- **gif.js**: For creating animated GIFs.
- **libwebp.js**: For more comprehensive WEBP manipulation.

This basic converter should work for most static WEBP images and provide a simple way to convert them to JPG, PNG, or GIF formats directly in the browser.
