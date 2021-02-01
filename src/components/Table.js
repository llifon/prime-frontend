import { v4 as uuidv4 } from 'uuid';

const Table = ({ primeNumbers, colourPatterns }) => {

    if (!primeNumbers) {
        return (<></>)
    }

    const columnSpan = 5; // 
    const groups = primeNumbers.map((e, i) => { return i % columnSpan === 0 ? primeNumbers.slice(i, i + columnSpan) : null; }).filter(e => { return e; });

    const getColour = (groupIndex, numberIndex) => {
       
        const colours = [...colourPatterns]
        if (groupIndex % 2 === 0)
        {
            colours.reverse(); // alternate order on every other row
        }

        return colours[numberIndex % colours.length]
    }

    return (

        <div>

            <table width="100%">
                <tbody>
                {groups.map((chunk, groupIndex) => (
                    <tr key={uuidv4()}>
                        {chunk.map((number, numberIndex) => (
                            <td key={uuidv4()} style={{ backgroundColor: getColour(groupIndex, numberIndex), width: '20%', textAlign: 'center' }}>{number}</td>
                        ))}
                    </tr>
                ))}

                </tbody>

            </table>
        </div>
    )
}

Table.defaultProps = {
    colourPatterns: ['#c9c9c9', '#f2f2f2'],
}

export default Table
