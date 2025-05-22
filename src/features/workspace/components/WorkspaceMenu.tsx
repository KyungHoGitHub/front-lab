import {NavLink} from "react-router";
import './WorkspaceMenu.css';

const WorkspaceMenu:React.FC =()=>{
    const menuItems = [
        { name: 'Todo', path: 'todo' },
        { name: 'Chat', path: 'chat' },
        { name: 'Memo', path: 'memo' },
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