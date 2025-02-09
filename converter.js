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
