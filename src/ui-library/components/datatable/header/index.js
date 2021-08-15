import React from "react";
const Header = props => {
    const renderTableHeader = () => {
        if(props && props.columns && Array.isArray(props.columns) && props.columns) {
            return props.columns.map((key, index) => {
                return <th key={index}>{key.toUpperCase()}</th>
            })
        } return '';
    }
    return(
        <thead>
            <tr>
                {renderTableHeader()}
            </tr>
        </thead>
    )
}
export default Header;