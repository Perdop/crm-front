import logo from "../../assets/path.png"
import dashIco from "../../assets/DashboardIco.png"
import estudantes from "../../assets/estudantes.png"
import bolsa from "../../assets/bolsaico.png"
import vinculo from "../../assets/chain.png"
import notification from "../../assets/notification.png"
import canto from "../../assets/canto.png"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigationItems = [
    { label: "Dashboard", path: "/home", icon: dashIco },
    { label: "Estudantes", path: "/estudantes", icon: estudantes },
    { label: "Bolsas", path: "/bolsas", icon: bolsa },
    { label: "Sobre Nós", path: "/sobre", icon: vinculo }
  ]
  const isActive = (path: string) => location.pathname === path
  return (
    <>
      <aside
        className={`
          fixed
          top-0
          left-0
          h-screen
          w-50
          flex
          flex-col
          bg-white
          z-50 sm:z-40
          transition-transform
          duration-300
          ${menuOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}
        `}
      >
        <div
          className="
            h-40
            flex
            items-center
            justify-center
            bg-no-repeat
            bg-top
            bg-contain
            overflow-hidden
          "
          style={{ backgroundImage: `url(${canto})` }}
        >
          <img
            src={logo}
            alt="PathEduc Logo"
            className="w-36"
          />
        </div>
        <nav className="flex flex-col gap-1 px-3 mt-4">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                relative
                group
                flex
                items-center
                gap-4
                p-3
                rounded-xl
                text-lg
                transition-all
                duration-200
                ${isActive(item.path)
                  ? "bg-azulescuro text-white"
                  : "text-gray-700 hover:bg-azulescuro hover:text-white"
                }
              `}
              onClick={() => setMenuOpen(false)}
            >
              <img
                src={item.icon}
                alt={item.label}
                className={`w-7 ${item.label !== "Dashboard" ? "scale-75" : ""}`}
              />
              <h2>{item.label}</h2>
            </Link>
          ))}
        </nav>
      </aside>
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 sm:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
      <header
        className="
          fixed
          top-0
          left-0
          sm:left-50
          right-0
          h-16
          px-4
          flex
          items-center
          justify-between
          gap-10          
          bg-white
          z-40 sm:z-50
        "
      >
        <button
          className="sm:hidden text-2xl text-gray-700 hover:text-azulescuro transition-colors"
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir menu"
        >
          ☰
        </button>
        <div className="flex items-center gap-6 ml-auto py-1">
          <button className="relative hover:scale-110 transition-transform" aria-label="Notificações">
            <img src={notification} alt="Notificações" className="h-5" />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </header>
    </>
  )
}
export default Navbar