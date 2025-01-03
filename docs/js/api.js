let GITHUB_RAW_PREFIX = "";

/**
 * 加载配置文件
 * @returns {Promise<void>}
 */
async function loadConfig() {
  try {
    const response = await fetch("config.json");
    if (!response.ok) {
      throw new Error("无法加载 config.json");
    }
    const config = await response.json();
    GITHUB_RAW_PREFIX = `https://raw.githubusercontent.com/${config.repoOwner}/${config.repoName}/${config.branch}/`;
  } catch (error) {
    console.error(error);
  }
}

/**
 * 获取文件树数据
 * @returns {Promise<Array>} 文件树数组
 */
async function fetchFileTree() {
  try {
    const response = await fetch("files.json");
    if (!response.ok) {
      throw new Error("无法加载文件列表");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
