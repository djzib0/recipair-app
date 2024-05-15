import logoImg from '../../../images/logo.png'

export default function AppLogo() {
  return (
    <div>
      <img src={logoImg} alt='app logo' className='logo--img' />
    </div>
  )
}
