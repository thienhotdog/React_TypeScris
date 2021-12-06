import { Layout, Row, Col } from 'antd';
import "../../assets/website.css";
const {  Footer } = Layout;
const FooterWebsite: React.FC = () =>{
    return( 
        <Layout style={{"paddingTop": "30px","backgroundColor" : "white"}}>
            <Footer className="footer_top">
                <Row>
                    <Col span={6}>
                        <p style={{"paddingLeft": "40px"}}> Sản Phẩm</p>
                        <div>
                           <ul className="footer_link">
                                <li><a href="#">Giày</a></li>
                                <li><a href="#">Quần Áo</a></li>
                                <li><a href="#">Phụ Kiện</a></li>
                                <li><a href="#">Hàng mới về</a></li>
                                <li><a href="#">Giày Ultra Boost</a></li>
                                <li><a href="#">Giày Pureboost</a></li>
                            </ul>
                        </div>
                    </Col>
                    <Col span={6}>
                        <p style={{"paddingLeft": "40px"}}>Thể Thao</p>
                        <div>
                            <ul  className="footer_link">
                                <li><a href="#">Quần Áo Tập Gym</a></li>
                                <li><a href="#">Áo Ngục Thể Thao</a></li>
                                <li><a href="#">Quần Tất Nữ</a></li>
                                <li><a href="#">Quần Soóc Tập Gym Dành Cho Nam</a></li>
                                <li><a href="#">Giày Bóng Đá</a></li>
                                <li><a href="#">Giày Bóng Đá Trong Nhà</a></li>
                            </ul>
                        </div>
                    </Col>
                    <Col span={6}>
                        <p style={{"paddingLeft": "40px"}}>Bộ Sưu Tập</p>
                        <div>
                            <ul className="footer_link">
                                <li><a href="#">Giày Adidas Pharrell Williams</a></li>
                                <li><a href="#">Giày Superstar</a></li>
                                <li><a href="#">Giày Stan Smith</a></li>
                                <li><a href="#">Giày Gazelle</a></li>
                                <li><a href="#">Giày NMD</a></li>
                            </ul>
                        </div>
                    </Col>
                    <Col span={6}>
                        <p style={{"paddingLeft": "40px"}}>Hỗ trợ</p>
                        <div>
                            <ul className="footer_link">
                                <li><a href="#">Trợ Giúp & Dịch Vụ Khách Hàng</a></li>
                                <li><a href="#">FAQ</a></li>
                                <li><a href="#">Công cụ tìm kiếm cửa hàng</a></li>
                                <li><a href="#">Hình Thức Thanh Toán</a></li>
                                <li><a>Giao Hàng Và Hoàn Tiền</a></li>
                                <li><a>Giao Hàng</a></li>
                                <li><a>Chương Trình Khuyến Mãi</a></li>
                            </ul>
                        </div>
                    </Col>
                    <Col span={24}>
                        <div className="footer_bomttom">
                                <p style={{"textAlign":"center"}}>© Bản quyền thuộc về trotot.vn 2021.</p>
                        </div>
                    </Col>
                </Row>
            </Footer>
        </Layout>
    )
}


export default FooterWebsite;