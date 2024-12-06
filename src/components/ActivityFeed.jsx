import React, { useState, useEffect } from 'react';
import '../css/header.css';
import '../css/footer.css';
import ArchiveButton from './ArchiveButton.jsx';
import CallCard from './CallCard.jsx';
import Footer from '../Footer.jsx';
import Header from '../Header.jsx';

const ActivityFeed = () => {
    const [calls, setCalls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showArchived, setShowArchived] = useState(false);
    const [activeTab, setActiveTab] = useState('inbox');
    const [selectedCallId, setSelectedCallId] = useState(null); 

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${hours}:${formattedMinutes} ${ampm}`;
    };

    const groupByDate = (calls) => {
        return calls.reduce((groups, call) => {
            const date = new Date(call.created_at).toLocaleDateString();
            if (!groups[date]) groups[date] = [];
            groups[date].push(call);
            return groups;
        }, {});
    };

    const fetchCalls = async () => {
        try {
            const response = await fetch('https://aircall-api.onrender.com/activities');
            const data = await response.json();
            setCalls(data);
        } catch (error) {
            console.error('Error fetching calls:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleArchive = () => {
        setShowArchived(!showArchived);
        if (!showArchived) {
            setActiveTab('allCalls');
        } else {
            setActiveTab('inbox');
        }
    };

    const handlePhoneClick = () => {
        setActiveTab('inbox');
        setShowArchived(false);
    };

    const handleCallClick = (id) => {
        setSelectedCallId((prevId) => (prevId === id ? null : id));  
    };

    useEffect(() => {
        fetchCalls();
    }, []);

    const filteredCalls = showArchived 
        ? calls.filter(call => call.is_archived === true) 
        : calls.filter(call => activeTab === 'inbox' ? call.call_type === 'missed' : true);

    const groupedCalls = groupByDate(filteredCalls);

    if (loading) {
        return <div className="text-center"><p>Loading...</p></div>;
    }

    if (calls.length === 0) {
        return <div className="text-center"><p>No calls available.</p></div>;
    }

    return (
        <div>
            <Header activeTab={activeTab} setShowArchived={setShowArchived} onTabChange={setActiveTab} />
            <div className="row space">
                <div className="col-md-12">
                    <ArchiveButton onToggle={toggleArchive} isArchived={showArchived} />
                </div>
            </div>

            <div className="row space archive-scroll">
                {Object.keys(groupedCalls).map((date) => (
                    <div key={date} className="col-md-12">
                        <div className="date text-center">
                            <small className="text-muted"><b>{date}</b></small>
                        </div>
                        {groupedCalls[date].map((call) => (
                            <div key={call.id} onClick={() => handleCallClick(call.id)}>
                                <CallCard call={call} formatTime={formatTime} isExpanded={selectedCallId === call.id} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <Footer onPhoneClick={handlePhoneClick} />
        </div>
    );
};


export default ActivityFeed;
