const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className="face__recognition">
      <div className="face__recognition__all">
        <div className="face__recognition__media">
          <img
            className="face__recognition__media__image"
            id="inputImage"
            src={imageUrl}
            alt=""
          />
        </div>
        <div className="face__recognition__bounding">
          <div
            className="face__recognition__bounding__box"
            style={{
              top: box.topRow,
              right: box.rightCol,
              bottom: box.bottomRow,
              left: box.leftCol,
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default FaceRecognition
