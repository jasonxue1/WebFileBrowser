/**
 * 创建文件树节点
 * @param {Object} item 文件或文件夹信息
 * @returns {HTMLElement} 文件树节点
 */
 function createTreeItem(item) {
    const li = document.createElement("li");
  
    if (item.type === "directory") {
      // 文件夹图标与名称
      const toggleIcon = document.createElement("span");
      toggleIcon.className = "folder-toggle";
      toggleIcon.innerHTML = '<i class="fas fa-chevron-right"></i>';
      const folderName = document.createElement("span");
      folderName.className = "folder-icon";
      folderName.textContent = item.name;
  
      li.appendChild(toggleIcon);
      li.appendChild(folderName);
  
      // 子文件夹
      const childrenUl = document.createElement("ul");
      childrenUl.className = "nested";
      item.children.forEach((child) => childrenUl.appendChild(createTreeItem(child)));
      li.appendChild(childrenUl);
    } else {
      // 多选框
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "select-checkbox";
  
      // 文件名称与下载链接
      const fileName = document.createElement("span");
      fileName.className = "file-icon";
      fileName.textContent = item.name;
      const link = document.createElement("a");
      link.className = "download-link";
      link.href = `${GITHUB_RAW_PREFIX}${item.path}`;
      link.download = item.name;
      link.textContent = "[下载]";
  
      li.appendChild(checkbox);
      li.appendChild(fileName);
      li.appendChild(link);
    }
  
    return li;
  }
  