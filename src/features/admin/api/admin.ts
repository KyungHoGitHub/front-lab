import resourceClient from "../../../shared/api/resourceClient.ts";

export const getAdminSideMenuList = async () => {
    return resourceClient.get("menu/test/menu");
}