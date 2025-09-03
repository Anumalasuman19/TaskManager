const ApiStatus = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

export const NavBarActivePopup = {
  mobileViewOrganizationPopup: 'MOBILE_VIEW_ORGANIZATION_POPUP',
  mobileViewSearchSection: 'MOBILE_VIEW_SEARCH_SECTION',
  desktopViewOrganizationPopup: 'DESKTOP_VIEW_ORGANIZATION_POPUP',
  desktopSearchSection: 'DESKTOP_SEARCH_SECTION',
}

export const HomeRouteActivePopup = {
  createBoardPopup: 'CREATE_BOARD_POPUP',
  createNewOrganizationPopup: 'CREATE_NEW_ORGANIZATION_POPUP',
}
export const BoardRouteActivePopup = {
  addListPopup: 'ADD_LIST_POPUP',
  addTaskPopup: 'ADD_TASK_POPUP',
  editListPopup: 'EDIT_LIST_POPUP',
  closeListPopup: 'CLOSE_LIST_POPUP',
}

export const ActiveOrganizationKey = 'organization_id'
export const UserInitialsKey = 'user_initials'
export const TokenKey = 'pa_token'

export const GetToken = () => {
  const token = localStorage.getItem(TokenKey)
  return token
}
export const ApiKey = '23335c9526346209ad2255ae52d79303'
export const NoBoardsText = 'You Don’t have any workspace'
export const BoardsSubHeading = 'Your Workspace boards'
export const CardType = 'CARD'
export const ListType = 'LIST'
export default ApiStatus
