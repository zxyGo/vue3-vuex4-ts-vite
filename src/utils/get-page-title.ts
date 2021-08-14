/**
 * 设置每个页面的title信息
 * @param {String} pageTitle 单独页面的title
 * @param {String} allTitle 总页面的title
 */
export default function getPageTitle(pageTitle: string, allTitle?: string): string {
  if (pageTitle) {
    return `${allTitle} - ${pageTitle}`
  }
  return `${allTitle}`
}
