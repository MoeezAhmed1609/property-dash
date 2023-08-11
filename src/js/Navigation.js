import { AiOutlineUser,  AiOutlineContacts, AiOutlineTeam, AiOutlineCloudUpload } from "react-icons/ai"
import { FaBlogger } from "react-icons/fa"
import { BsFillHouseAddFill, BsFillChatLeftQuoteFill } from "react-icons/bs"
import { BiUserCircle } from "react-icons/bi"
import { SiAboutdotme } from "react-icons/si"

const NavData = [
    {
        name: "Analytics",
        link: '/',
        icon: AiOutlineUser,
    },
    {
        name: "User",
        link: '/user',
        icon: AiOutlineUser,
    },
    {
        name: "Properties",
        link: '/properties',
        icon: BsFillHouseAddFill,
    },
    {
        name: "Testimonials",
        link: '/testimonial',
        icon: BsFillChatLeftQuoteFill,
    },
    {
        name: "Blog",
        link: '/blog',
        icon: FaBlogger,
    },

    {
        name: "contact",
        link: '/contact',
        icon: AiOutlineContacts,
    },
    {
        name: "Enquiry",
        link: '/enquiry',
        icon: AiOutlineContacts,
    },
    
    {
        name: "Subscription",
        link: '/subscription',
        icon: AiOutlineContacts,
    },

    {
        name: "Broker Enquiry",
        link: '/broker-enquiry',
        icon: AiOutlineContacts,
    },
    {
        name: "Team",
        link: '/team',
        icon: AiOutlineTeam,
    },
    {
        name: "About",
        link: '/about',
        icon: SiAboutdotme,
    },
    {
        name: "Content Upload",
        link: '/content',
        icon: AiOutlineCloudUpload,
    },

    {
        name: "Dashboard Users",
        link: '/dash/users',
        icon: BiUserCircle,
    },





]
export default NavData;