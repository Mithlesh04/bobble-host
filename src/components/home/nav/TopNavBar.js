import Tooltip from '@mui/material/Tooltip';

function TopNavBar({ PIN }) {
    
    const handleCopy = (pin) =>{
        var textField = document.createElement('textarea')
        textField.innerText = pin
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
    }
    return (
        <div className="TopNavBar">
            <div className="logo">
                <span className="game-exp"> GAME EXP </span> <span className="dashboard">DashBoard</span>
            </div>

            {
                PIN ? 
                <div className="pin">
                    <span className="pin-label">PIN:</span>
                    <span className="pin-value">
                        <Tooltip title="Click here to copy PIN" arrow onClick={_=>handleCopy(PIN)}>
                            <span>{PIN}</span>
                        </Tooltip>
                    </span>
                </div>
                : null
            }


        </div>
    )
}

export default TopNavBar