const Rank = ({ user }) => {
  const { name, entries } = user

  const username = `${name.charAt(0).toUpperCase()}${name.slice(1)}`

  return (
    <div className="rank">
      <div className="rank__text">
        <h3>{`Welcome ${username}, your current entry count is...`}</h3>
      </div>

      <div className="mt-s rank__entries">
        <h2>{entries}</h2>
      </div>
    </div>
  )
}

export default Rank
