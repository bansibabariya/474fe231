import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

const formatDuration = (durationInSeconds) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return `${minutes} min ${seconds} sec`;
};

const CallCard = ({ call, formatTime, isExpanded }) => {
    let phoneIconClass = '';
    if (call.call_type === 'missed') {
        phoneIconClass = 'phone-red-icon'; // Red for missed call
    } else if (call.call_type === 'answered') {
        phoneIconClass = 'phone-green-icon'; // Green for answered call
    } else if (call.call_type === 'voicemail') {
        phoneIconClass = 'phone-gray-icon'; // Gray for voicemail
    }

    return (
        <div className="col-md-12">
            <div className="card all-card">
                <div className="row">
                    <div className="col-md-1 text-center">
                        <FontAwesomeIcon icon={faPhone} className={phoneIconClass} />
                    </div>
                    <div className="col-md-8">
                        <small className="text-muted"><b>{call.from}</b></small>
                    </div>
                    <div className="col-md-3">
                        <small className="time">{formatTime(call.created_at)}</small>
                    </div>
                </div>

                {/* Conditionally render the extra details if the card is expanded */}
                {isExpanded && (
                    <div className="row">
                        <div className="col-md-12 call-border text-center">
                            <small>Call details</small>
                        </div>
                        <div className="col-md-12">
                            <small className="text-muted">
                                <div className="call-details">
                                    <div>
                                        <span
                                            className={`call-icon ${call.direction === 'inbound' ? 'inbound' : 'outbound'}`}
                                        ></span>
                                        <span className="call-info">
                                            {call.direction === 'inbound' ? 'Incoming' : 'Outgoing'} call from {call.from} (To: {call.to})
                                        </span>
                                    </div>
                                    <div className="call-info duration">
                                        Duration: {formatDuration(call.duration)}
                                    </div>
                                </div>
                            </small>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CallCard;
