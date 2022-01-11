export function isWebp() {
    function testWebp(cb) {
        let webp = new Image();
        webp.onload = webp.onerror = function () {
            cb(webp.height == 2);
        }
        webp.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAFklEQVQI12P8//8/AwMDEwMDAwMDAwAkBgMBvR7jugAAAABJRU5ErkJggg=="
    }
    testWebp(function (support) {
        let classname = support === true ? 'webp' : 'no-webp';
        document.documentElement.classList.add(classname);
    })
}