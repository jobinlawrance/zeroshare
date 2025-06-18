function initializeDownloadButton() {
    const parser = new UAParser();
    const os = parser.getOS();
    const arch = parser.getCPU();
    const repoOwner = 'jobinlawrance';
    const repoName = 'zeroshare-multiplatform';
    
    const downloadButton = document.getElementById('download-button');
    const downloadText = document.getElementById('download-text');

    if (!downloadButton) return; // Exit if not on home page

    let detectedOS = '';
    
    switch(os.name.toLowerCase()) {
        case 'mac os':
            detectedOS = 'mac';
            break;
        case 'windows':
            detectedOS = 'windows';
            break;
        case 'linux':
            detectedOS = 'linux';
            break;
        case 'ios':
            detectedOS = 'ios';
            break;
        case 'android':
            detectedOS = 'android';
            break;
    }

    fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/releases/latest`)
        .then(response => response.json())
        .then(release => {
            let downloadUrl = '';
            let osName = '';

            switch(detectedOS) {
                case 'mac':
                    downloadUrl = release.assets.find(asset => asset.name.endsWith('.dmg'))?.browser_download_url;
                    osName = 'macOS';
                    break;
                case 'windows':
                    if (arch.architecture.includes('64')) {
                        downloadUrl = release.assets.find(asset => asset.name.endsWith('.msi'))?.browser_download_url;
                    } else {
                        downloadUrl = release.assets.find(asset => asset.name.endsWith('.exe'))?.browser_download_url;
                    }
                    osName = 'Windows';
                    break;
                case 'linux':
                    downloadUrl = release.assets.find(asset => asset.name.endsWith('_amd64.deb'))?.browser_download_url;
                    osName = 'Linux';
                    break;
                case 'ios':
                    downloadUrl = release.html_url;
                    osName = 'iOS (Coming Soon)';
                    break;
                case 'android':
                    downloadUrl = release.html_url;
                    osName = 'Android (Coming Soon)';
                    break;
                default:
                    downloadUrl = release.html_url;
                    osName = 'your OS';
            }

            downloadButton.href = downloadUrl || release.html_url;
            downloadText.textContent = `Download for ${osName}`;
        })
        .catch(error => {
            console.error('Error fetching release:', error);
            downloadButton.href = `https://github.com/${repoOwner}/${repoName}/releases/latest`;
            downloadText.textContent = 'Download Latest Release';
        });
}

// Initialize on first load
document.addEventListener('DOMContentLoaded', initializeDownloadButton);

// Initialize on navigation
document.addEventListener('DOMContentSwitch', initializeDownloadButton);