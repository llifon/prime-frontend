function Header( { title, description } ) {
    return (
        <div>
            <h1>{title}</h1>
            <label>{description}</label>
        </div>
    )
}

Header.defaultProps = {
    title: "Prime Generator",
    description: "Need to know about all the prime numbers which exist upto a given number? Great, just enter the maximum number in the box below"
}

export default Header;