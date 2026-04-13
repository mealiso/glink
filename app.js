// --- UI Helpers ---
function updateCharCount() {
    const text = document.getElementById('mainText').value;
    document.getElementById('charCount').innerText = `${text.length} characters`;
}

function previewImage(index, url) {
    const imgEl = document.getElementById(`prev_${index}`);
    const placeholderEl = document.getElementById(`placeholder_${index}`);

    if (url.trim() !== "" && (url.match(/\.(jpeg|jpg|gif|png|webp)$/) != null)) {
        imgEl.src = url;
        imgEl.style.display = 'block';
        placeholderEl.style.display = 'none';
    } else {
        imgEl.style.display = 'none';
        placeholderEl.style.display = 'flex';
    }
}

// --- Core Logic ---
function createPaste() {
    const text = document.getElementById('mainText').value;
    const imgInputs = document.querySelectorAll('.img-url-input');
    const images = Array.from(imgInputs).map(i => i.value.trim()).filter(url => url !== "");

    if (!text.trim() && images.length === 0) {
        alert("Please add some text or at least one image URL.");
        return;
    }

    // Modern Payload Structure
    const payload = {
        c: text, // Content
        i: images.slice(0, 8), // Images (hard limit)
        t: Date.now() // Timestamp
    };

    // Safe UTF-8 Base64 Encoding
    const encodedData = btoa(encodeURIComponent(JSON.stringify(payload)).replace(/%([0-9A-F]{2})/g, (match, p1) => {
        return String.fromCharCode('0x' + p1);
    }));

    // URL Generation (GitHub Pages compatible)
    const baseUrl = window.location.href.split('?')[0].replace('index.html', '');
    const finalUrl = `${baseUrl}post.html?data=${encodedData}&id=gp_${Date.now()}`;

    // Show Result
    document.getElementById('finalUrl').value = finalUrl;
    document.getElementById('resultPanel').style.display = 'block';
    
    // Smooth scroll to result
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

function copyFinalLink() {
    const el = document.getElementById('finalUrl');
    el.select();
    document.execCommand('copy');
    
    // Visual Feedback
    const btn = document.querySelector('#resultPanel .btn-secondary');
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
    btn.style.borderColor = '#10b981';
    btn.style.color = '#10b981';
    setTimeout(() => {
        btn.innerHTML = '<i class="fa-solid fa-copy"></i> Copy Link';
        btn.style.borderColor = '#7c3aed';
        btn.style.color = '#a78bfa';
    }, 2000);
}
