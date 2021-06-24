import { __ } from '@wordpress/i18n';
import Edit from './edit';
import save from './save';
import './style.scss';
import './editor.scss';

export const TabsConfig = {
	apiVersion: 2,
	title: __('Tabs', 'custom-blocks'),
	description: __('Display content in tabs.', 'custom-blocks'),
	icon: 'category',
	category: 'text',
	supports: {
		html: false,
	},
	attributes: {
		clientId: {
			type: 'string',
		},
		tabs: {
			type: 'array',
			default: [],
		},
		childCount: {
			type: 'integer',
			default: 0,
		},
		activeTabIndex: {
			type: 'integer',
			default: 0,
		},
	},
	example: {
		attributes: {
			tabs: [{ title: 'Tab 1' }, { title: 'Tab 2' }, { title: 'Tab 3' }],
		},
	},

	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
};
