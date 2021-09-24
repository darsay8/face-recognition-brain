import Tilt from 'react-tilt'
import brain from '../../assets/images/brain.png'

const Logo = () => {
  return (
    <div className="logo">
      <Tilt className="logo__tilt" options={{ max: 55 }}>
        <div className="logo__img">
          <img src={brain} alt="" />
        </div>
      </Tilt>
    </div>
  )
}

export default Logo
