import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxArchive } from "@fortawesome/free-solid-svg-icons";

const ArchiveButton = ({ onToggle, isArchived }) => {
    return (
        <div className="card archive-card" onClick={onToggle}>
            <div className="row">
                <div className="col-md-1 text-center">
                    <FontAwesomeIcon icon={faBoxArchive} className="archive-icon" />
                </div>
                <div className="col-md-11">
                    <small className="text-muted">
                        <b>{isArchived ? "Unarchive all calls" : "Archive all calls"}</b>
                    </small>
                </div>
            </div>
        </div>
    );
};

export default ArchiveButton;
