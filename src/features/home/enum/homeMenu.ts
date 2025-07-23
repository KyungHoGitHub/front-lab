
export enum MenuList {
    TODO = "Todo",
    CHAT = "Chat",
    MEMO = "Memo",
    SCHEDULE = "Schedule",
    MYPAGE = "Mypage",
    SETTING = "Setting"
}

const USER_EXCLUED_MENUS: MenuList[] = [
    MenuList.SETTING,
];

export const excludedMenusByRole :Record<string, MenuList[]>={
    user: USER_EXCLUED_MENUS,
}