import React from "react";
import "./directory.styles.scss"
import {createStructuredSelector} from "reselect";
import {selectDirectorySection} from "../../redux/directory/directory.selector";
import {connect} from "react-redux"
import MenuItem from "../menu-item/menu-item.component";

const Directory = ({sections}) => {

        return(
            <div className="directory-menu">
                {
                    sections.map(({id,...sectionProps}) =>
                        <MenuItem key={id} {...sectionProps} />
                        )
                }
            </div>
        )



};

const mapStateToProps = createStructuredSelector({
    sections: selectDirectorySection
})
export default connect(mapStateToProps)(Directory);