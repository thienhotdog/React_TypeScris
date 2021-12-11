import { Link, Outlet} from "react-router-dom";
import { Layout, Menu, Breadcrumb } from 'antd';
import {DesktopOutlined,FileOutlined,UserOutlined, } from '@ant-design/icons';
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
const AdminLayout: React.FC = () =>{
    return(
    <Layout>
        <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" style={{"justifyContent":"flex-end"}}>
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
                    <Menu.Item key="1">Dashboard</Menu.Item>
                    <SubMenu key="sub1" icon={<DesktopOutlined />} title="Danh mục ">
                        <Menu.Item key="2">
                            <Link to="/admin/category">Quản Lý Danh mục</Link>
                        </Menu.Item>        
                        <Menu.Item key="3">
                            <Link to="/admin/addcategory">Thêm Danh mục</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<DesktopOutlined />} title="Sản Phẩm">
                        <Menu.Item key="4">
                            <Link to="/admin/product">Quản Lý Sản Phẩm</Link>
                        </Menu.Item>        
                        <Menu.Item key="5">
                            <Link to="/admin/addproduct">Thêm Sản Phẩm</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" icon={<FileOutlined  />} title="Đặt Hàng">
                        <Menu.Item key="6">
                            <Link to="/admin/listorder">Quản Lý Đơn Hàng</Link>
                        </Menu.Item>
                        {/* <Menu.Item key="7">
                            <Link to="/admin/listorderapproved">Đã Duyệt</Link>
                        </Menu.Item>
                        <Menu.Item key="8">
                            <Link to="/admin/listorderdelivered">Đã Giao</Link>
                        </Menu.Item> */}
                    </SubMenu>
                    <SubMenu key="sub4" icon={<UserOutlined />} title="User">
                        <Menu.Item key="9">
                            <Link to="/admin/users">User</Link>
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

export default AdminLayout;