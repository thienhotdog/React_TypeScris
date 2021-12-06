import { Layout } from 'antd';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from "react-router" ;
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../slide/productSlide';
import { get } from '../../api/product';
import { IProduct } from '../../model/product';
const ProductDetailPage :React.FC = ()=>{

    const [product,setProduct] = useState<IProduct[]>([]);
    const products = useSelector((state:any) => state.product.product);
    const disPatch = useDispatch();
    useEffect(() =>{
        disPatch(fetchProducts())
    },[])
    const {id} = useParams();
    useEffect(() =>{
        const getProduct = async (id:any) =>{
            const {data} = await get(id);
            setProduct(data[0])
        };
        getProduct(id)
    },[id])
    const productss:any = product;
    const relatedProducts :any = products.filter((item:IProduct) => item.cateId == productss.cateId && item._id != productss._id);
    console.log(relatedProducts)
    return(
        <Layout style={{ "backgroundColor":"white", "marginTop":"15px"}} >
        <Row gutter={[16, 24]} className="container">
            <div className="direction" style={{"fontSize": "1rem"}}>
                <Link to="/" style={{"color":"red"}}>Trang chủ</Link>
                <span> -- </span>
                <Link to="/shop" style={{"color":"red"}}>Shop</Link>
                <span>--</span>
                <a>{productss.name}</a>
                <div className="shop">
                    <p className="shop_title" style={{"fontSize": "3rem"}}>{productss.name}</p> 
                </div>
             </div>
        </Row>
        
        <Row style={{"margin":" 30px", "backgroundColor":"#DDDDDD"}}>
            <Col span={12} style={{"marginTop": "55px"}}>
                <Card
                    
                    style={{ width: 500 }}
                    cover={<img src={productss.img} style={{"width":"450px", "margin":"0 auto"}} />}
                >
                </Card>
            </Col>
            <Col span={12} style={{"marginTop": "55px"}}>
                <div>
                    <p style={{"fontSize":"1.5rem"}}>Mô tả sản phẩm</p>
                    <p style={{"fontSize":"1rem"}}>
                        Trend “dad shoes” đang gây bão trong giới trẻ hiện nay
                        và mẫu giày Yeezy 700 Wave Runner Solid Grey cũng góp 
                        phần tạo nên sức hút cho cơn sốt này, khiến giới săn 
                        giày đứng ngồi không yên. Kiểu dáng của Yeezy 700 Wave 
                        Runner Solid Grey chịu sự ảnh hưởng của những mẫu “dad shoes” 
                        và cross-trainer, hiện đang là 2 xu hướng sneaker được ưa 
                        thích trong những năm gần đây. Đế giày đậm chất chunky 
                        sneaker và thiết kế retro, đi cùng bản phối xám / xanh / cam 
                        đã dễ dàng thổi “bùa yêu” vào giới yêu giày.
                    </p>
                    <p style={{"fontSize":"1rem"}}>
                        Phần upper sử dụng chất liệu breathable mesh, suede và nubuck.
                        Điểm nhấn ấn tượng chính là thiết kế là dây giày màu neon đi kèm một 
                        số chi tiết được làm bằng chất liệu 3M phản quang. 
                        Với bộ đế boost nổi tiếng và form giày rộng rãi, 
                        Yeezy 700 Wave Runner Solid Grey mang đến cảm giác dễ chịu nhất 
                        cho người mang. Cộng nghệ Boost với tấm đệm lót “thần thánh” êm ái, 
                        bạn có thể mang đôi giày này từ sáng đến tối mà không hề có cảm giác 
                        khó chịu hay bí bách. Không những hype mà còn comfy nữa.
                    </p>
                    <p>
                    <span style={{"fontSize":"1.5rem"}}>Size : </span>
                    <button style= {{ "backgroundColor":"red", "padding":"5px 5px 5px 5px","color":"white","marginBottom":"30px"}}>Bảng Size</button>
                    </p>
                    <p style={{"fontSize":"1.5rem"}}>
                        <span>Giá : </span>
                        {productss.price} VNĐ
                    </p>
                    <button style={{"backgroundColor":"blue", "padding":"10px 10px 10px 10px","color":"white","marginBottom":"30px"}}>Mua Ngay</button>
                </div>
            </Col>
        </Row>
        <Row>
            <div>
                <p style={{"fontSize":"1.5rem", "marginLeft":"30px"}}>Sản phẩm liên quan</p>
            </div>
        </Row>
        <Row gutter={[16, 24]}>
            {relatedProducts.map((item:IProduct, index:number) =>{
                return<Col className="gutter-row" key={index} span={6} style={{"marginLeft":"30px"}} >
                    <Link to = {`/product/${item._id}`}>
                        <Card
                            hoverable
                            style={{ "width" : "100%" }}
                            cover={<img alt="example" src={item.img} />}
                        >
                            <p className="py-2">{item.name}</p>
                            <p><span>Giá : </span>{item.price} VNĐ</p>
                        </Card>
                    </Link>
                </Col>
                
            })}
            {relatedProducts.length==0 && <p style={{"marginLeft": "60px"}}>không tìm thấy sản phẩm</p>}
        </Row>
    </Layout>
    )
}

export default ProductDetailPage;