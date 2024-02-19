import Logo from '../../assets/images/logo.svg'
import { Container } from '../Container.jsx'
import { Menu } from '../ui/Menu.jsx'

export const Header = () => (
  <header className="shadow-md py-3.75">
    <Container className="px-5 md:px-20 flex items-center">
      <a href='/'>
        <img
          src={Logo}
          className="max-w-9 h-10"
        />
      </a>
      <div className="md:bg-white md:w-px mx-6 h-6 hidden md:block"></div>
      <p className="hidden md:block text-sm leading-4">José Delgado</p>
      <Menu />
    </Container>
  </header>
)
