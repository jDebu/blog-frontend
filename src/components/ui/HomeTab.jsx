import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { 
  flatTabsTreeAndFilterVisible,
  hasChildTabSelected,
  isLastParentTab,
  isParentTab,
  getTabsTree
} from '../../config/tabs'
import { Container } from '../Container'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import clsx from 'clsx'
import { isAdminRoute } from '../../helpers/helpers'


export const HomeTab = () => {
  const [tabIndex, setTabIndex] = useState(0)
  const tabsTree = getTabsTree(isAdminRoute)
  const flattedTabs = flatTabsTreeAndFilterVisible(tabsTree)
  const location = useLocation()
  const navigate = useNavigate()

  const handleTabsChange = index => {
    setTabIndex(index)
    navigate(flattedTabs[index].path)
  }

  useEffect(() => {
    setTabIndex(flattedTabs.findIndex(r => r.path === location.pathname))
  }, [location.pathname])

  return (
    <Tabs selectedIndex={tabIndex} onSelect={handleTabsChange}>
      <div className="md:flex md:h-17 md:bg-white shadow-menu-dashboard relative z-10">
        <Container className="px-0 md:px-20">
          <TabList className='tablist md:flex flex-col md:flex-row bg-gray-30 absolute md:static w-full'>
            {flattedTabs.map((tab, index) => (
              <Tab
                className={clsx(
                  'tab-item',
                  { 'tab-item__last': isLastParentTab(index, flattedTabs) },
                  { 'hidden': tab.isChildTab },
                  { 'react-tabs__tab--selected': hasChildTabSelected(tab, location.pathname) }
                )}
                key={index}
                disabled={isParentTab(tab)}
              >
                {tab.name}{' '}
                {isParentTab(tab) && (<KeyboardArrowDown className="ml-2" />)}
              </Tab>
            ))}
          </TabList>
        </Container>
      </div>
      {flattedTabs.map((r, index) => (
        <Container key={index}>
          <TabPanel className='mt-8 md:mt-4'>{r.component}</TabPanel>
        </Container>
      ))}
    </Tabs>
  )
}