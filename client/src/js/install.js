const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA

window.addEventListener('beforeinstallprompt', (event) => {
    window.deferredPrompt = event;
    butInstall.style.display = 'block';
    console.log("beforeinstallpropmpt fired.");
});


butInstall.addEventListener('click', async () => {
    butInstall.style.display = 'none';
    window.deferredPrompt.prompt();
    const { outcome } = await window.deferredPrompt.userChoice;
    if (outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
    } else {
        console.log('User dismissed the A2HS prompt');
    }
    window.deferredPrompt = null;
});


window.addEventListener('appinstalled', (event) => {
    console.log('App was installed.');
    butInstall.style.display = 'hidden';
    window.deferredPrompt = null;
});
