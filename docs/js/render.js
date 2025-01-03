/**
 * 渲染文件树
 * @param {Array} data 文件树数据
 */
 function renderFileTree(data) {
    const tree = document.getElementById("file-tree");
    tree.innerHTML = ""; // 清空文件树
    const ul = document.createElement("ul");
    data.forEach((item) => ul.appendChild(createTreeItem(item)));
    tree.appendChild(ul);
  
    // 为文件夹绑定展开/关闭事件
    addToggleClickEvent();
  }
  
  /**
   * 创建文件树节点
   * @param {Object} item 文件或文件夹信息
   * @returns {HTMLElement} 文件树节点
   */
  function createTreeItem(item) {
    const li = document.createElement("li");
  
    if (item.type === "directory") {
      // 添加文件夹的展开/关闭箭头
      const toggleIcon = document.createElement("span");
      toggleIcon.className = "folder-toggle";
      toggleIcon.innerHTML = '<i class="fas fa-chevron-right"></i>'; // 使用 Font Awesome 图标
  
      // 添加文件夹名称
      const folderName = document.createElement("span");
      folderName.className = "folder-icon";
      folderName.textContent = item.name;
  
      li.appendChild(toggleIcon); // 添加箭头
      li.appendChild(folderName); // 添加文件夹名称
  
      // 渲染子文件/文件夹
      const childrenUl = document.createElement("ul");
      childrenUl.className = "nested"; // 默认隐藏子文件夹
      item.children.forEach((child) => childrenUl.appendChild(createTreeItem(child)));
      li.appendChild(childrenUl);
    } else {
      // 渲染文件
      const fileName = document.createElement("span");
      fileName.className = "file-icon";
      fileName.textContent = item.name;
  
      const link = document.createElement("a");
      link.className = "download-link";
      link.href = `${GITHUB_RAW_PREFIX}${item.path}`;
      link.download = item.name;
      link.textContent = "[下载]";
  
      li.appendChild(fileName);
      li.appendChild(link);
    }
  
    return li;
  }
  
  /**
   * 为文件夹绑定展开/关闭事件
   */
  function addToggleClickEvent() {
    document.querySelectorAll(".folder-toggle").forEach((toggle) => {
      toggle.addEventListener("click", function () {
        const parentLi = this.parentElement;
        const nestedUl = parentLi.querySelector(".nested");
  
        if (nestedUl) {
          nestedUl.classList.toggle("open"); // 切换子文件夹的显示状态
          this.classList.toggle("open"); // 切换箭头方向
        }
      });
    });
  }
  