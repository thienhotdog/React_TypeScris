import { Link, Outlet } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from 'antd';
import { DesktopOutlined, FileOutlined, UserOutlined, } from '@ant-design/icons';
import { isAuthenticated } from "../auth/util";
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const UserLayout: React.FC = () => {
    const {user} = isAuthenticated();
    return (
        <Layout>
            <Header className="header">
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" style={{ "justifyContent": "flex-end" }}>
                    <Menu.Item key="1">
                        <Link to="/">Black To Website</Link>
                    </Menu.Item>
                </Menu>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                        <Menu.Item key="1">
                            <Link to={`/user/${user._id}`}>Thông Tin Chung</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to={`/user/${user._id}/update`}>Thay đổi Thông Tin</Link>
                        </Menu.Item>
                    </SubMenu>
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 600,
                        }}>
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}

export default UserLayout;