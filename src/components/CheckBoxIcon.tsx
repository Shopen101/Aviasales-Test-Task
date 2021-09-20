import React from 'react'
import pictureCheckbox from '../assets/checkbox.svg';

export const CheckBoxIcon: React.FC = (): React.ReactElement => {
    return (
        <div >
            <img style={{width: '20px', height: '20px'}} src={pictureCheckbox} alt="checkbox" />
        </div>
    )
}
