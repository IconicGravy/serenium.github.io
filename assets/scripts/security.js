// This just protects minor stuff in the website 
(function() {
    'use strict';
    const c = {
        mA: 5,           
        tW: 1000,        
        wM: "Slow down."
    };
    setInterval(() => {
        const startTime = performance.now();
        debugger; 
        if (performance.now() - startTime > 100) {
            document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#fff;font-family:sans-serif;"><h1>What is wrong with you</h1></div>';
        }
    }, 1000);

    document.addEventListener('contextmenu', event => event.preventDefault());
    document.addEventListener('keydown', event => {
        if (
            event.key === 'F12' ||
            (event.ctrlKey && event.shiftKey && (event.key === 'I' || event.key === 'J' || event.key === 'C')) ||
            (event.ctrlKey && event.key === 'U')
        ) {
            event.preventDefault();
        }
    });

    document.addEventListener('dragstart', event => {
        if (event.target.tagName === 'IMG') {
            event.preventDefault();
        }
    });

    const actionLog = [];
    function checkRateLimit() {
        const now = Date.now();
        while (actionLog.length && actionLog[0] <= now - c.tW) {
            actionLog.shift();
        }
        if (actionLog.length >= c.mA) {
            alert(c.wM);
            return false; 
        }
        actionLog.push(now);
        return true; 
    }

    window.addEventListener('load', () => {
        const interactiveElements = document.querySelectorAll('button, a, .buy-btn');
        interactiveElements.forEach(el => {
            el.addEventListener('click', (e) => {
                if (!el.href || el.classList.contains('buy-btn')) {
                    if (!checkRateLimit()) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }
            }, true); 

        });
    });
    console.clear();
    console.log("%c Serenium Security ", "background: #000; color: #fff; font-size: 20px; padding: 10px; border-radius: 5px;");
    console.log("%c Unauthorized access is monitored. ", "color: #ff0000; font-weight: bold;");
})();