import { HomePage } from '../pages/HomePage.jsx'
import { About } from '../pages/About.jsx'
import { HomePage as HomePageAdmin } from '../pages/admin/HomePage.jsx'
import { ArticlesPage } from '../pages/admin/ArticlesPage.jsx'

const getTabsTree = (isAdminTab) => [
  {
    name: 'Home',
    path: '/',
    component: <HomePage />,
    visible: !isAdminTab
  },
  {
    name: 'About',
    path: '/about',
    component: <About />,
    visible: !isAdminTab
  },
  {
    name: 'Home',
    path: '/admin/home',
    component: <HomePageAdmin />,
    visible: isAdminTab
  },
  {
    name: 'Articles',
    path: '/admin/articles',
    component: <ArticlesPage />,
    visible: isAdminTab
  },
]

const flatTabsTreeAndFilterVisible = tabs => {
  let allTabs = [...tabs]
  tabs.forEach(tab => {
    if (tab.subMenu?.length) {
      allTabs = [...allTabs, ...tab.subMenu]
    }
  })
  return allTabs.filter(tab => tab.visible)
}

const getSubTabsSelectedAndVisible = (tabsTree, parentTabSel) =>
  tabsTree.find(menu => menu.name === parentTabSel)?.subMenu.filter(subTab => subTab.visible)

const isParentTab = tab => (tab.subMenu ? true : false)
const hasChildTabSelected = (tabs, pathname) => tabs.subMenu?.find(child => child.path === pathname)
const isLastParentTab = (index, tabs) => index + 1 === tabs.filter(tab => !tab.isChildTab).length

export {
  flatTabsTreeAndFilterVisible,
  getSubTabsSelectedAndVisible,
  getTabsTree,
  hasChildTabSelected,
  isLastParentTab,
  isParentTab
}

