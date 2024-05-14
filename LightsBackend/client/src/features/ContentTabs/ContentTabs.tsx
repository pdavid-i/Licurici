import './ContentTabs.css';

import React, { useState } from 'react';
import './ContentTabs.css';
import Icons from '../../constants/icons';
import TabButton from './TabButton';
import HistoryTab from './TabsContent/HistoryTab';
import VisionTab from './TabsContent/VisionTab';
import ThanksTab from './TabsContent/ThanksTab';

function ContentTabs() {
	const [activeTab, setActiveTab] = useState('tab1');

	const Tabs = {
		VisionTab: 'VisionTab',
		HistoryTab: 'HistoryTab',
		ThanksTab: 'ThanksTab',
	};

	const renderContent = () => {
		switch (activeTab) {
			case Tabs.VisionTab:
				return <VisionTab />;
			case Tabs.HistoryTab:
				return <HistoryTab />;
			case Tabs.ThanksTab:
				return <ThanksTab />;
			default:
				return <div>No content available</div>;
		}
	};

	return (
		<div className='tab-section'>
			<div className='tabs'>
				<TabButton
					onClick={() => setActiveTab(Tabs.VisionTab)}
					icon={Icons.idea}
					isActive={activeTab === Tabs.VisionTab}
				/>
				<TabButton
					onClick={() => setActiveTab(Tabs.HistoryTab)}
					icon={Icons.upgrade}
					isActive={activeTab === Tabs.HistoryTab}
				/>
				<TabButton
					onClick={() => setActiveTab(Tabs.ThanksTab)}
					icon={Icons.pray}
					isActive={activeTab === Tabs.ThanksTab}
				/>
			</div>
			<div className='tab-content'>{renderContent()}</div>
		</div>
	);
}

export default ContentTabs;
