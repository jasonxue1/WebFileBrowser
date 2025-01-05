import { config } from './config.js';
import { getCurrentDirectory, getParentPath, generateFileUrl } from './utils.js';
import { loadFiles } from './api.js';

// 初始化页面
async function init() {
    try {
        const currentDirectory = getCurrentDirectory();
        const files = await loadFiles();
        const container = document.querySelector('.file-list');
        const directoryContent = filterFilesByPath(files, currentDirectory);

        container.innerHTML = '';

        // 添加“返回”按钮
        if (currentDirectory) {
            const parentPath = getParentPath(currentDirectory);
            container.innerHTML += `<li class="back-button"><a href="?path=${parentPath}">../</a></li>`;
        }

        // 加载文件和目录
        container.innerHTML += generateFileList(directoryContent, currentDirectory);
    } catch (error) {
        console.error('Error:', error);
        document.querySelector('.file-list').innerHTML = '<li>Error loading directory.</li>';
    }
}

// 筛选当前目录文件
function filterFilesByPath(files, path) {
    const segments = path.split('/').filter(Boolean);
    let current = files;

    for (const segment of segments) {
        const match = current.find(item => item.name === segment && item.type === 'directory');
        if (match && match.children) {
            current = match.children;
        } else {
            return [];
        }
    }
    return current;
}

// 生成文件列表 HTML
function generateFileList(files, basePath) {
    let html = '';
    files.forEach(item => {
        if (item.type === 'file') {
            const fileUrl = generateFileUrl(item.path, config);
            html += `<li class="file-item"><a href="${fileUrl}" target="_blank">${item.name}</a></li>`;
        } else if (item.type === 'directory') {
            const subPath = basePath ? `${basePath}/${item.name}` : item.name;
            html += `<li class="directory-item"><a href="?path=${subPath}">${item.name}/</a></li>`;
        }
    });
    return html;
}

// 启动应用
init();