let originalData = [];

document.addEventListener("DOMContentLoaded", async () => {
  await loadConfig(); // 加载配置文件
  originalData = await fetchFileTree(); // 加载文件树数据
  renderFileTree(originalData); // 渲染文件树
});
