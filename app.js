document.getElementById('genBtn').addEventListener('click', function() {
    const content = document.getElementById('noteInput').value;
    if (!content.trim()) return alert("Please enter some text.");

    // Encode UTF-8 to Base64 safely
    const encoded = btoa(encodeURIComponent(content).replace(/%([0-9A-F]{2})/g, (match, p1) => {
        return String.fromCharCode('0x' + p1);
    }));

    const timestamp = Date.now();
    const uniqueId = 'gp_' + Math.random().toString(36).substr(2, 9);
    
    const baseUrl = window.location.href.split('?')[0].replace('index.html', '');
    const finalUrl = `${baseUrl}post.html?v=${encoded}&t=${timestamp}&id=${uniqueId}`;

    document.getElementById('shareUrl').value = finalUrl;
    document.getElementById('resultBox').style.display = 'block';
    this.innerHTML = '<i class="fa-solid fa-arrows-rotate"></i> Regenerate';
});

function copyUrl() {
    const input = document.getElementById("shareUrl");
    input.select();
    document.execCommand("copy");
    const btn = document.querySelector("#resultBox .btn");
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
    setTimeout(() => { btn.innerHTML = '<i class="fa-solid fa-copy"></i> Copy'; }, 2000);
}
