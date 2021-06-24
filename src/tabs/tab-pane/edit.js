import { InnerBlocks } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

const ALLOWED_BLOCKS = [
	'core/image',
	'core/paragraph',
	'core/heading',
	'core/list',
	'core/table',
];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return { JSX.Element } Element to render.
 */
export default function Edit(props) {
	const TEMPLATE = [
		[
			'core/paragraph',
			{
				placeholder: props.attributes.title + ' content',
			},
		],
	];

	const parentBlockClientId = wp.data
		.select('core/block-editor')
		.getBlockParents(props.clientId)[0];

	const getParentAttributes = () => {
		return wp.data.select('core/block-editor').getBlock(parentBlockClientId)
			.attributes;
	};

	const getOwnIndex = () => {
		return getParentAttributes()
			.tabs.map((e) => e.id)
			.indexOf(props.attributes.id);
	};

	const handleDeleteSelf = () => {
		// get fresh copy of parent attributes
		const parentAttributes = wp.data
			.select('core/block-editor')
			.getBlock(parentBlockClientId).attributes;

		// remove tab data about this child from parent block
		// update active tab index in parent
		const activeTabIndex = parentAttributes.activeTabIndex;
		let newActiveTabIndex = 0;
		if (activeTabIndex > 0) {
			newActiveTabIndex = activeTabIndex - 1;
		}
		const tabs = parentAttributes.tabs;
		tabs.splice(getOwnIndex(), 1);
		wp.data
			.dispatch('core/block-editor')
			.updateBlockAttributes(parentBlockClientId, {
				tabs: tabs,
				activeTabIndex: newActiveTabIndex,
			});

		// remove the block that calls this method
		wp.data
			.dispatch('core/block-editor')
			.removeBlock(props.clientId, false);

		// activate the new active tab in the DOM
		const tabList = document.getElementById(
			'custom-block-' + parentBlockClientId + '-tabs'
		);
		const siblingTabs = tabList.getElementsByClassName('nav-link');
		for (let i = 0; i < siblingTabs.length; i++) {
			if (newActiveTabIndex !== i) {
				siblingTabs[i].classList.remove('active');
			} else {
				siblingTabs[i].classList.add('active');
			}
		}

		// activate the previous (or next) sibling pane
		let sibling = document.getElementById(props.attributes.id)
			.previousElementSibling;
		// if current block is the first one, activate the next sibling instead
		if (!sibling) {
			sibling = document.getElementById(props.attributes.id)
				.nextElementSibling;
		}
		sibling.classList.add('show', 'active');

		// make sure the first pane's firstTab attribute is true
		wp.data
			.select('core/block-editor')
			.getBlock(
				parentBlockClientId
			).innerBlocks[0].attributes.firstTab = true;
	};

	let paneClasses = 'wp-block-custom-block-tab-pane tab-pane fade';

	if (getOwnIndex() === getParentAttributes().activeTabIndex) {
		paneClasses += ' show active';
	}

	return (
		<div
			className={paneClasses}
			id={props.attributes.id}
			role="tabpanel"
			aria-labelledby={
				'custom-block-' +
				parentBlockClientId +
				'-tab-' +
				props.attributes.tabNumber
			}
		>
			<InnerBlocks allowedBlocks={ALLOWED_BLOCKS} template={TEMPLATE} />
			<Button
				className="delete-tab-button btn btn-sm btn-outline-danger"
				icon="no-alt"
				label={'Delete this tab'}
				onClick={handleDeleteSelf.bind(this)}
			/>
		</div>
	);
}
