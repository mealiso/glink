window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    const rawData = params.get('data');
    const id = params.get('id');

    if (!rawData) {
        showError();
        return;
    }

    try {
        // Decode and Parse JSON
        const decodedString = decodeURIComponent(Array.prototype.map.call(atob(rawData), (c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        const payload = JSON.parse(decodedString);
        const now = Date.now();
        const ttl = 24 * 60 * 60 * 1000; // 24 Hours

        // Check Expiry
        if (now - payload.t > ttl) {
            showError("This paste has expired.");
            return;
        }

        // --- Render Text Content ---
        if (payload.c && payload.c.trim() !== "") {
            document.getElementById('textContent').innerText = payload.c;
        } else {
            document.getElementById('textContent').style.display = 'none';
        }

        // --- Render Image Gallery ---
        const gallery = document.getElementById('imageGallery');
        if (payload.i && payload.i.length > 0) {
            payload.i.forEach(url => {
                const item = document.createElement('div');
                item.className = 'gallery-item';
                item.onclick = () => openLightbox(url); // Add Lightbox support

                const img = document.createElement('img');
                img.src = url;
                img.onerror = () => item.style.display = 'none'; // Hide if broken

                item.appendChild(img);
                gallery.appendChild(item);
            });
            gallery.style.display = 'grid';
        }

        // --- Show Viewer ---
        document.getElementById('mainView').style.display = 'block';

        // --- Hit Counter (Public API) ---
        if (id) {
            fetch(`https://api.countapi.xyz/hit/ghostpaste_modern_v1/${id}`)
                .then(r => r.json())
                .then(d => document.getElementById('viewCount').innerText = d.value)
                .catch(() => document.getElementById('viewCount').innerText = "1");
        }

        // --- Expiry Timer ---
        const updateTimer = () => {
            const left = ttl - (Date.now() - payload.t);
            const h = Math.floor(left / 3600000);
            const m = Math.floor((left % 3600000) / 60000);
            document.getElementById('expiryTimer').innerHTML = `<i class="fa-solid fa-hourglass-half"></i> Expires in: ${h}h ${m}m`;
        };
        updateTimer();
        setInterval(updateTimer, 60000); // Update every minute

    } catch (e) {
        showError("Data decryption failed.");
    }
};

// --- Lightbox Logic ---
function openLightbox(url) {
    document.getElementById('lightboxImg').src = url;
    document.getElementById('lightbox').style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Disable background scrolling
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showError(msg) {
    document.getElementById('activeView')?.style.display = 'none';
    document.getElementById('errorView').style.display = 'block';
    if (msg) document.querySelector('#errorView p').innerText = msg;
}
        setInterval(updateClock, 60000);
    } catch (e) {
        document.getElementById('expired').style.display = 'block';
    }
};
