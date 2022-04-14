import React from "react"
import { vendorCollection } from "../../../api/vendors"
import {vendorTypeCollection } from "../../../api/vendorTypes" 
import ReactDom from "react-dom"
import VendorSelectionModal from "../../VendorSelectionModal"

const VendorTask = (props) => {
    const { task, completed, vendorType } = props

    const openModal = () => {
        document.getElementById("modal-holder").style.display = "block"
       ReactDom.render(<VendorSelectionModal vendorType={vendorType} />, document.getElementById("modal-holder"))
    }
    

    return (
        <ul>
            <li>
                {completed ? (
                    <label className="check">
                        <input
                            type="checkbox"
                            defaultChecked
                            className="checked"
                            onChange={() => openModal()}
                        />
                        <div className="checkbox"></div>
                    </label>
                ) : (
                    <label className="check">
                        <input type="checkbox" onChange={() => openModal()} />
                        <div className="checkbox"></div>
                    </label>
                )}
                {completed ? <p className="task completed">{task}</p> : <p className="task">{task}</p>}
            </li>
        </ul>
    )
}

export default VendorTask
