import {
  Button,
  Navbar,
  NavbarToggle,
  Dropdown,
  TextInput,
  Avatar,
   } from "flowbite-react";
import { Link, useLocation } from "react-router-dom"; //nhấn vào sẽ reload về trang chủ
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import{toggleTheme} from '../redux/theme/themeSlice'
import { signoutSuccess } from '../redux/user/userSlice';


export default function Header() {
  const { theme } = useSelector((state) => state.theme);
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    /* self-center: tự động căn giữa
        whitespace-nowrap: ngăn cho văn bản không bị xuống dòng, buộc văn bản phải ở
        trên 1 dòng duy nhất
        text-sm: đặt kích thước chữ nhỏ 
        sm:text-xl:+(sm phù hợp với các thiết bị nhỏ và lớn )
                   + text-xl: đặt kích thước chữ lớn
        dark:text-white: đặt văn bản thành trắng khi mode dark open
    */
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm
        sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          Project Team 7
        </span>
        Blog
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="Search"
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>

      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>

      <div className="flex gap-2 md:order-2">
        <Button className="w-12 h-10 hidden sm:inline" color="gray" pill onClick={()=> dispatch(toggleTheme())}>
          
        {theme === 'light' ? <FaSun /> : <FaMoon />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign In
            </Button>
          </Link>
        )}

        <NavbarToggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link to="/projects">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
