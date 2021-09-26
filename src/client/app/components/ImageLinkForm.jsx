const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div className="imagelink__form">
      <div className="imagelink__form__container">
        <h4 className="">
          Paste an image link from the web here and press detect. Git it a try.
        </h4>
        <div className="form">
          <div className="form__group">
            <input
              className="form__input"
              type="text"
              onChange={onInputChange}
            />
          </div>
          <button className="btn btn--blue" onClick={onButtonSubmit}>
            Detect
          </button>
        </div>
      </div>
    </div>
  )
}

export default ImageLinkForm
