import logo from "./images/logo512.png"

const Header = () =>{
    return(
        <div className="py-2 pl-2" style={{borderBottom: "1px solid #777"}}>
            <img src={logo} alt="" style={{height: "35px", verticalAlign: "top"}}></img>
            <span className="h2 pt-4 m-2 text-white-50">Contactopedia</span>
        </div>
    )
}
export default Header;