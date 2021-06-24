import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const ALLOWED_BLOCKS = ['custom-block/tab-pane'];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return { JSX.Element } Element to render.
 */
export default function Edit(props) {
	const handleAddTab = () => {
		let childCount = props.attributes.childCount;

		const tabs = [...props.attributes.tabs];
		const tabNumber = childCount + 1;
		const tabId =
			'custom-block-' + props.clientId + '-child-pane-' + tabNumber;
		let firstTab = tabNumber === 1;

		// update attributes to include the new pane
		const newBlockAttributes = {
			parentClientId: props.clientId,
			title: 'Tab ' + tabNumber,
			tabNumber: tabNumber,
			id: tabId,
			firstTab: firstTab,
		};
		tabs.push(newBlockAttributes);
		props.setAttributes({ tabs });

		// hide existing panes
		const parentBlock = document.getElementById(
			'custom-block-' + props.clientId + '-tab-content'
		);
		const paneBlocks = parentBlock.getElementsByClassName('tab-pane');
		for (let i = 0; i < paneBlocks.length; i++) {
			paneBlocks[i].classList.remove('show', 'active');
		}

		// insert new pane
		let newBlock = wp.blocks.createBlock(
			'custom-block/tab-pane',
			newBlockAttributes
		);
		wp.data
			.dispatch('core/block-editor')
			.insertBlock(newBlock, tabs.length, props.clientId);

		// update the attribute that tracks the current active tab
		props.setAttributes({ activeTabIndex: paneBlocks.length });

		// increment the child index for future new tabs
		childCount++;
		props.setAttributes({ childCount: childCount });
	};

	const handleActiveTabChange = (index) => {
		props.setAttributes({ activeTabIndex: index });
	};

	const handleTabTitleChange = (title, index) => {
		const tabs = [...props.attributes.tabs];
		tabs[index].title = title;
		props.setAttributes({ tabs });
	};

	let tabTitlesDisplay;

	if (props.attributes.tabs.length) {
		tabTitlesDisplay = props.attributes.tabs.map((tab, index) => {
			const childId = props.attributes.tabs[index].id;

			return (
				<li className={'nav-item'} role="presentation">
					<Button
						className={
							'nav-link' +
							(index !== props.attributes.activeTabIndex
								? ''
								: ' active')
						}
						data-bs-toggle="tab"
						type="button"
						role="tab"
						data-index={index}
						id={
							'custom-block-' +
							props.clientId +
							'-tab-' +
							props.attributes.tabs[index].tabNumber
						}
						data-bs-target={'#' + childId}
						aria-controls={childId}
						aria-selected={index !== 0 ? 'false' : 'true'}
						onClick={handleActiveTabChange.bind(this, index)}
					>
						<RichText
							value={props.attributes.tabs[index].title}
							onChange={(title) =>
								handleTabTitleChange(title, index)
							}
						/>
					</Button>
				</li>
			);
		});
	}

	return (
		<div {...useBlockProps()}>
			<ul
				className={'nav nav-tabs'}
				role={'tablist'}
				id={'custom-block-' + props.clientId + '-tabs'}
			>
				{tabTitlesDisplay}
				<Button
					className={'add-tab-button btn'}
					icon="plus"
					label={__('Add Tab')}
					onClick={handleAddTab.bind(this)}
				/>
			</ul>
			<div
				className={'tab-content'}
				id={'custom-block-' + props.clientId + '-tab-content'}
			>
				<InnerBlocks allowedBlocks={ALLOWED_BLOCKS} />
			</div>
		</div>
	);
}
