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
      // 文件夹节点
      const toggleIcon = document.createElement("span");
      toggleIcon.className = "folder-toggle";
      toggleIcon.innerHTML = '<i class="fas fa-chevron-right"></i>'; // 箭头图标
  
      const folderName = document.createElement("span");
      folderName.className = "folder-icon";
      folderName.textContent = item.name;
  
      li.appendChild(toggleIcon); // 添加展开/关闭图标
      li.appendChild(folderName); // 添加文件夹名称
  
      // 子文件/文件夹容器
      const childrenUl = document.createElement("ul");
      childrenUl.className = "nested"; // 默认隐藏子节点
      item.children.forEach((child) => childrenUl.appendChild(createTreeItem(child)));
      li.appendChild(childrenUl);
    } else {
      // 文件节点
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
   * 添加文件夹的展开/关闭事件
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
  