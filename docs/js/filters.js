/**
 * 过滤文件树（排除文件夹，确保搜索只针对文件名）
 * @param {Array} data 文件树数据
 * @param {string} query 搜索关键字
 * @returns {Array} 过滤后的文件树
 */
 function filterTree(data, query) {
    return data
      .map((item) => {
        if (item.type === "directory") {
          // 递归过滤子节点
          const filteredChildren = filterTree(item.children || [], query);
          if (filteredChildren.length > 0) {
            return { ...item, children: filteredChildren };
          }
        } else if (item.name.toLowerCase().includes(query)) {
          return item;
        }
      })
      .filter(Boolean); // 排除 null 或 undefined 的结果
  }
  