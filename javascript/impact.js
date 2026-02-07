// Animate numbers
document.querySelectorAll('[data-count]').forEach(el => {
    let target = +el.dataset.count;
    let count = 0;
    let step = target / 100;

    function run() {
        count += step;
        if (count < target) {
            el.textContent = Math.floor(count);
            requestAnimationFrame(run);
        } else {
            el.textContent = target;
        }
    }
    run();
});

// Progress bars
document.querySelectorAll('.bar div').forEach(bar => {
    bar.style.width = bar.dataset.width;
});
