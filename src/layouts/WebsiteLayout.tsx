import { Outlet } from "react-router-dom";
import FooterWebsite from "../compoments/website/Footer";
import HeaderWebsite from "../compoments/website/Header";






const WebsiteLayout: React.FC = () =>{
    return(
        <div>
            <HeaderWebsite />
            <Outlet />
            <FooterWebsite />
        </div>
    )
}

export default WebsiteLayout;