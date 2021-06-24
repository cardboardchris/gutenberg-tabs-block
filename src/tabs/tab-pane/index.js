import { __ } from '@wordpress/i18n';
import Edit from './edit';
import save from './save';
import './style.scss';
import './editor.scss';

export const TabPaneConfig = {
	apiVersion: 2,
	title: __('Tab Pane', 'custom-blocks'),
	description: __(
		"Each tab's content goes in a pane.",
		'custom-blocks'
	),
	icon: 'table-row-after',
	category: 'text',
	parent: ['custom-block/tabs'],
	supports: {
		html: false,
	},
	attributes: {
		id: {
			type: 'string',
			default: '',
		},
		title: {
			type: 'string',
			default: '',
		},
		tabNumber: {
			type: 'integer',
		},
		parentClientId: {
			type: 'string',
		},
		firstTab: {
			type: 'boolean',
			default: false,
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
