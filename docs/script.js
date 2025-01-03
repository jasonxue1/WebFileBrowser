// 读取并展示文件树
document.addEventListener("DOMContentLoaded", function () {
    // 动态读取 JSON 文件
    fetch('files.json')
      .then(response => response.json())
      .then(filesData => {
        // 调用递归函数生成文件树HTML
        const fileTreeHTML = createFileTree(filesData);
        // 将生成的HTML插入到页面中
        document.getElementById('fileTree').innerHTML = fileTreeHTML;
      })
      .catch(error => {
        console.error('读取文件时出错:', error);
      });
  
    // 递归函数生成文件树HTML
    function createFileTree(files) {
      let treeHTML = '<ul>';
      files.forEach(file => {
        if (file.type === 'directory') {
          treeHTML += `<li class="directory">${file.name}</li>`;
          if (file.children) {
            treeHTML += createFileTree(file.children);
          }
        } else if (file.type === 'file') {
          treeHTML += `<li class="file"><a href="${file.path}" download>${file.name}</a></li>`;
        }
      });
      treeHTML += '</ul>';
      return treeHTML;
    }
  });
  