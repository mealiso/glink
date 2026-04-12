window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    const data = params.get('v');
    const time = parseInt(params.get('t'));
    const id = params.get('id');
    const day = 24 * 60 * 60 * 1000;

    if (!data || !time || (Date.now() - time > day)) {
        document.getElementById('expired').style.display = 'block';
        return;
    }

    // --- View Counter via CountAPI (or similar public API) ---
    // Note: We use a namespace to keep your counts unique
    if (id) {
        fetch(`https://api.countapi.xyz/hit/ghostpaste-pro-v1/${id}`)
            .then(res => res.json())
            .then(res => document.getElementById('count').innerText = res.value)
            .catch(() => document.getElementById('count').innerText = "1");
    }

    try {
        const decoded = decodeURIComponent(Array.prototype.map.call(atob(data), (c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        document.getElementById('content').innerText = decoded;
        document.getElementById('active').style.display = 'block';

        const updateClock = () => {
            const remain = day - (Date.now() - time);
            const h = Math.floor(remain / 3600000);
            const m = Math.floor((remain % 3600000) / 60000);
            document.getElementById('timer').innerHTML = `<i class="fa-solid fa-clock"></i> Expires in ${h}h ${m}m`;
        };
        updateClock();
        setInterval(updateClock, 60000);
    } catch (e) {
        document.getElementById('expired').style.display = 'block';
    }
};
