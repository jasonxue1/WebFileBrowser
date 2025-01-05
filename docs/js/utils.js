// 从 URL 获取当前路径
export function getCurrentDirectory() {
    const params = new URLSearchParams(window.location.search);
    return params.get('path') || '';
}

// 获取父目录路径
export function getParentPath(path) {
    const segments = path.split('/').filter(Boolean);
    segments.pop();
    return segments.join('/');
}

// 构建完整文件 URL
export function generateFileUrl(filePath, config) {
    const baseUrl = `https://raw.githubusercontent.com/${config.repoOwner}/${config.repoName}/${config.branch}`;
    return `${baseUrl}/${filePath}`;
}