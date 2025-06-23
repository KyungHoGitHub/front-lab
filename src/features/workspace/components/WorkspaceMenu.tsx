import {NavLink} from "react-router";
import './WorkspaceMenu.css';
import {useTranslation} from "react-i18next";
import {FaComments, FaStickyNote, FaTasks} from "react-icons/fa";

const WorkspaceMenu: React.FC = () => {
    const {t} = useTranslation();
    const menuItems = [
        {name: t('work_space.left_menu.todo'), path: 'todo', icon: <FaTasks/>},
        {name: t('work_space.left_menu.chat'), path: 'chat', icon: <FaComments/>},
        {name: t('work_space.left_menu.memo'), path: 'memo', icon: <FaStickyNote/>},
    ];

    return (
        <nav className="workspace-menu">
            <ul>
                {menuItems.map((item) => (
                    <li key={item.path}>
                        <NavLink
                            to={`/workspace/${item.path}`}
                            className={({isActive}) => (isActive ? 'active' : '')}
                        >
                            <span className="menu-icon">{item.icon}</span>
                            <span className="menu-text">{item.name}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
export default WorkspaceMenu;