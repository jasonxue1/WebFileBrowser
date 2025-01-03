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

  // 绑定事件
  document.getElementById("searchInput").addEventListener("input", (e) => {
    const query = e.target.value.trim().toLowerCase();
    applyFilters(query, document.getElementById("sortSelect").value);
  });

  document.getElementById("sortSelect").addEventListener("change", (e) => {
    const query = document.getElementById("searchInput").value.trim().toLowerCase();
    applyFilters(query, e.target.value);
  });

  document.getElementById("downloadSelected").addEventListener("click", () => {
    const selectedLinks = document.querySelectorAll(".select-checkbox:checked + .download-link");
    if (selectedLinks.length === 0) {
      alert("请选择要下载的文件！");
      return;
    }

    selectedLinks.forEach((link) => {
      const a = document.createElement("a");
      a.href = link.href;
      a.download = link.download;
      a.click();
    });
  });
});
