import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems, SidebarLogo } from "flowbite-react";
import { BiBuoy } from "react-icons/bi";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function SidebarComp() {
    return (
        <Sidebar className="h-screen w-64 " aria-label="Sidebar navigation">
            <SidebarLogo img="/logo.png" imgAlt="GlobePulse logo">
                <span className="text-3xl font-semibold">GlobePulse</span>
            </SidebarLogo>
            <SidebarItems>
                <SidebarItemGroup>
                    <SidebarItem as={Link} to="/company" icon={HiChartPie}>
                        Dashboard
                    </SidebarItem>
                    <SidebarItem as={Link} to="/teams" icon={HiViewBoards}>
                        Teams
                    </SidebarItem>
                    <SidebarItem as={Link} to="/employees" icon={HiTable}>
                        Employees
                    </SidebarItem>
                </SidebarItemGroup>
                <SidebarItemGroup>
                    <SidebarItem as={Link} to="/calendar" icon={HiInbox}>
                        Calendar
                    </SidebarItem>
                    <SidebarItem as={Link} to="/kanban" icon={HiShoppingBag}>
                        Kanban
                    </SidebarItem>
                </SidebarItemGroup>
                <SidebarItemGroup>
                    <SidebarItem as={Link} to="/profile" icon={HiUser}>
                        Profile
                    </SidebarItem>
                    <SidebarItem as={Link} to="/logout" icon={HiInbox}>
                        Sign Out
                    </SidebarItem>
                </SidebarItemGroup>
                <SidebarItemGroup>
                    <SidebarItem icon={BiBuoy} className="text-red-500">
                        MySpace
                    </SidebarItem>
                    <SidebarItem icon={BiBuoy} className="text-red-500">
                        ChatRoom
                    </SidebarItem>
                    <SidebarItem icon={BiBuoy} className="text-red-500">
                        Support
                    </SidebarItem>
                </SidebarItemGroup>

            </SidebarItems>
        </Sidebar>
    );
}
