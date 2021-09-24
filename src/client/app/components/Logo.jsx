import Tilt from 'react-tilt'
import brain from '../../assets/images/brain.png'

const Logo = () => {
  return (
    <div className="ma4 mt0 tilt">
      <Tilt
        className="Tilt br1 shadow-1"
        options={{ max: 55 }}
        style={{ height: 150, width: 150 }}
      >
        <div className="Tilt-inner pa3">
          <img style={{ paddingTop: '10px' }} src={brain} alt="" />
        </div>
      </Tilt>
    </div>
  )
}

export default Logo
