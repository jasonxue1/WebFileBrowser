/**
 * 渲染文件树
 * @param {Array} data 文件树数据
 */
 function renderFileTree(data) {
    const tree = document.getElementById("file-tree");
    tree.innerHTML = "";
    const ul = document.createElement("ul");
    data.forEach((item) => ul.appendChild(createTreeItem(item)));
    tree.appendChild(ul);
  
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
      li.innerHTML = `
        <span class="folder-icon"><i class="fas fa-folder"></i></span>
        ${item.name}
      `;
      const childrenUl = document.createElement("ul");
      childrenUl.style.paddingLeft = "20px";
      item.children.forEach((child) => childrenUl.appendChild(createTreeItem(child)));
      li.appendChild(childrenUl);
    } else {
      li.innerHTML = `
        <input type="checkbox" class="select-checkbox" />
        <span class="file-icon"><i class="fas fa-file"></i></span>
        <a href="${GITHUB_RAW_PREFIX}${item.path}" class="download-link" download="${item.name}">
          ${item.name}
        </a>
      `;
    }
    return li;
  }
  
  /**
   * 绑定文件夹的折叠/展开事件
   */
  function addToggleClickEvent() {
    document.querySelectorAll(".folder-icon").forEach((folder) => {
      folder.addEventListener("click", function () {
        const parentLi = this.parentElement;
        const childrenUl = parentLi.querySelector("ul");
        if (childrenUl) {
          childrenUl.style.display = childrenUl.style.display === "none" ? "block" : "none";
        }
      });
    });
  }
  