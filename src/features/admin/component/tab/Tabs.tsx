import React, { useState, ReactNode } from 'react';
import './Tabs.css';

// 탭 컴포넌트의 Props 타입 정의
interface TabsProps {
    defaultValue: string;
    children: ReactNode;
    className?: string;
}

// TabsList의 Props
interface TabsListProps {
    children: ReactNode;
}

// TabsTrigger의 Props
interface TabsTriggerProps {
    value: string;
    children: ReactNode;
    onClick: (value: string) => void;
    isActive: boolean;
}

// TabsContent의 Props
interface TabsContentProps {
    value: string;
    children: ReactNode;
    isActive: boolean;
}

// Tabs 컴포넌트
const Tabs: React.FC<TabsProps> = ({ defaultValue, children, className }) => {
    const [activeTab, setActiveTab] = useState(defaultValue);

    return (
        <div className={`tabs-container ${className || ''}`}>
            {React.Children.map(children, (child) => {
                if (!React.isValidElement(child)) return child;

                // TabsList와 TabsContent에 activeTab과 setActiveTab 전달
                if (child.type === TabsList) {
                    return React.cloneElement(child, {
                        children: React.Children.map(child.props.children, (trigger) => {
                            if (React.isValidElement(trigger) && trigger.type === TabsTrigger) {
                                return React.cloneElement(trigger, {
                                    onClick: setActiveTab,
                                    isActive: trigger.props.value === activeTab,
                                });
                            }
                            return trigger;
                        }),
                    });
                }
                if (child.type === TabsContent) {
                    return React.cloneElement(child, {
                        isActive: child.props.value === activeTab,
                    });
                }
                return child;
            })}
        </div>
    );
};

// TabsList 컴포넌트
const TabsList: React.FC<TabsListProps> = ({ children }) => {
    return <div className="tabs-list">{children}</div>;
};

// TabsTrigger 컴포넌트
const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, children, onClick, isActive }) => {
    return (
        <button

            className={`tabs-trigger ${isActive ? 'active' : ''}`}
            onClick={() => onClick(value)}
        >
            {children}
        </button>
    );
};

// TabsContent 컴포넌트
const TabsContent: React.FC<TabsContentProps> = ({ children, isActive }) => {
    return <div className={`tabs-content ${isActive ? 'active' : ''}`}>{children}</div>;
};

// 내보내기
export { Tabs, TabsList, TabsTrigger, TabsContent };