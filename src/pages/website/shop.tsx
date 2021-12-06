
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import { Card } from 'antd';
import '../../assets/website.css'
import { useEffect } from 'react';
import { Category } from '../../model/category';
import { IProduct } from '../../model/product';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, getCateProduct, fillterProduct, sortProducts } from '../../slide/productSlide';
import { getAll } from '../../slide/categorySlide';
import { isAuthenticated } from '../../auth/util';
import { ToastContainer, toast } from 'react-toastify';
import { addToCart } from '../../slide/cartSlide';
import { useNavigate } from 'react-router';

const { Sider, Content } = Layout;
const Shop: React.FC = () =>{
    const product = useSelector((state:any) =>state.product.product);
    const dispatch = useDispatch();
    const {user} = isAuthenticated();
    useEffect(() =>{
        dispatch((fetchProducts()))
    },[dispatch])

    const category = useSelector((state:any) => state.category.category);
    useEffect(() =>{
        dispatch(getAll())
    },[])

    const onHandleSort = async (e:any) => {
        let {min,max} = e.target.dataset;
        const sortData:any = {min,max};
        console.log(sortData);
        dispatch(sortProducts(sortData))      
    }

   const onHandleFildProduct = async (e:any) =>{
        const id = e.target.dataset.id;
        dispatch(getCateProduct(id))
   }

    const onHandleSearch = async (e:any) =>{
        let text = e.target.value;
        console.log(text);
        if(product){
           dispatch(fillterProduct(text))
        }
    }
    const navigate = useNavigate();
    const handleAddToCart = async (product:any) => {
        console.log(product);
        dispatch(addToCart(product));
        toast("thêm thành công",{
            onClose: () => navigate("/cart")
        });
    }
    const handleAddToCarts = () => {
        const notify = () => toast("bạn phải đăng nhập mới thêm được sản phẩm");
        notify();
    }
    return(
            <Layout style={{"marginTop": "15px"}} >
                <ToastContainer />
                <Sider className="container" style={{backgroundColor: 'white'}}>
                    <div className="direction">
                        <Link to="/">Trang chủ</Link>
                        <span> --- </span>
                            <a href="/shop">Shop</a>
                            <div className="shop">
                                <input placeholder="nhập tên sản phẩm" onBlur={e => onHandleSearch(e)} />
                                <p className="shop_title">loại sản phẩm</p>
                                <div>
                                    <ul className="shop_option">
                                        {category.map((item:Category,index:number) =>{
                                            return<div key={index}>
                                                    <li className="option-item" onClick={e => onHandleFildProduct(e)} data-id={item._id}>{item.name}</li>
                                                </div>
                                        })}
                                    </ul>
                                </div>    
                            </div>

                            <div className="border-b py-3">
                                <p className="shop_title">khoảng giá</p>
                                <ul className="shop_option">
                                    <li className="flex justify-between mb-2">
                                        <span className="option-item" onClick={e => onHandleSort(e)} data-min="0" data-max="3000000">0 - 3,000,000Đ</span>
                                    </li>
                                    <li className="flex justify-between mb-2">
                                        <span className="option-item" onClick={e => onHandleSort(e)} data-min="3000000" data-max="4000000">3,000,000-4,000,000Đ</span>
                                    </li>
                                    <li className="flex justify-between mb-2">
                                        <span className="option-item" onClick={e => onHandleSort(e)} data-min="4000000" data-max="5000000">4,000,000-5,000,000Đ</span>
                                    </li>
                                    <li className="flex justify-between mb-2">
                                        <span className="option-item" onClick={e => onHandleSort(e)} data-min="5000000" data-max="8000000">5,000,000-8,000,000Đ</span>
                                    </li>
                                </ul>
                            </div>
                    </div>
                </Sider>
                <Content style={{backgroundColor: 'white'}}>
                    <Row className="shop container" gutter={[16, 24]}>
                        {product.map((item:IProduct, index:number) =>{
                            return <Col className="gutter-row shop-" key={index} span={6}>
                            <Card
                                hoverable
                                style={{ "width": "100%" }}

                            >
                                <Link to={`/product/${item._id}`}>
                                    <img src={item.img} />
                                </Link>
                                <p className="py-2">{item.name}</p>
                                <p><span>Giá : </span>{item.price} VNĐ</p>
                                {
                                    (user) ? (
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleAddToCart(item)} >
                                            Add To Cart
                                        </button>
                                    ) :
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleAddToCarts()} >
                                            Add To Cart
                                        </button>
                                }
                            </Card>

                        </Col>
                            
                        })}
                        {product.length==0 && <p>không tìm thấy sản phẩm</p>}
                    </Row>
                </Content>
            </Layout>
    )
}

export default Shop;