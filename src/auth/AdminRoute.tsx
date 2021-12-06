import { isAuthenticated } from "./util";

import { Navigate } from "react-router-dom";
const AdminRoute = (props:any) => {

  if (isAuthenticated() && isAuthenticated().user.role == 1) {
    return props.children;
  }

  return <Navigate to="/shop" />;
}
 
export default AdminRoute;