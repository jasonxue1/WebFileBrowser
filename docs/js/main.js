let originalData = [];
let currentData = [];

document.addEventListener("DOMContentLoaded", async () => {
  // 加载配置文件
  await loadConfig();

  // 加载文件树
  originalData = await fetchFileTree();
  currentData = originalData;

  // 渲染文件树
  renderFileTree(originalData);

  // 搜索功能
  document.getElementById("searchInput").addEventListener("input", (e) => {
    const query = e.target.value.trim().toLowerCase();
    currentData = query ? filterTree(originalData, query) : originalData;
    renderFileTree(currentData);
  });

  // 排序功能
  document.getElementById("sortSelect").addEventListener("change", (e) => {
    const query = document.getElementById("searchInput").value.trim().toLowerCase();
    currentData = sortTree(currentData, e.target.value);
    renderFileTree(currentData);
  });

  // 批量下载功能
  document.getElementById("downloadSelected").addEventListener("click", () => {
    const selectedFiles = document.querySelectorAll(".select-checkbox:checked");
    if (selectedFiles.length === 0) {
      alert("请先选择要下载的文件！");
      return;
    }

    selectedFiles.forEach((checkbox) => {
      const link = checkbox.nextElementSibling.nextElementSibling;
      if (link && link.tagName === "A") {
        const a = document.createElement("a");
        a.href = link.href;
        a.download = link.download;
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    });
  });
});
