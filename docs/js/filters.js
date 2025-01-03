/**
 * 过滤文件树
 * @param {Array} data 文件树数据
 * @param {string} query 搜索关键字
 * @returns {Array} 过滤后的文件树
 */
 function filterTree(data, query) {
    return data
      .map((item) => {
        if (item.type === "directory") {
          const filteredChildren = filterTree(item.children || [], query);
          if (filteredChildren.length > 0 || item.name.toLowerCase().includes(query)) {
            return { ...item, children: filteredChildren };
          }
        } else if (item.name.toLowerCase().includes(query)) {
          return item;
        }
      })
      .filter(Boolean);
  }
  
  /**
   * 对文件树排序
   * @param {Array} data 文件树数据
   * @param {string} option 排序选项
   * @returns {Array} 排序后的文件树
   */
  function sortTree(data, option) {
    const [key, order] = option.split("-");
    return data
      .sort((a, b) => {
        const aKey = a[key] || "";
        const bKey = b[key] || "";
        return order === "asc" ? aKey.localeCompare(bKey) : bKey.localeCompare(aKey);
      })
      .map((item) => ({
        ...item,
        children: item.children ? sortTree(item.children, option) : [],
      }));
  }
  