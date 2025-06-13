import {NavLink} from "react-router";
import './WorkspaceMenu.css';
import {useTranslation} from "react-i18next";

const WorkspaceMenu:React.FC =()=>{
    const {t} = useTranslation();
    const menuItems = [
        { name: t('work_space.left_menu.todo'), path: 'todo' },
        { name: t('work_space.left_menu.chat'), path: 'chat' },
        { name: t('work_space.left_menu.memo'), path: 'memo' },
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
                            {item.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
export default WorkspaceMenu;