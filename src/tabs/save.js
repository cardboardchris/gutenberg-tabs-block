import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return { JSX.Element } Element to render.
 */
export default function save(props) {
	const tabTitles = props.attributes.tabs.map((tab, index) => {
		const childId = props.attributes.tabs[index].id;

		return (
			<li className={'tab-title nav-item'} role="presentation">
				<Button
					className={'nav-link' + (index !== 0 ? '' : ' active')}
					data-bs-toggle="tab"
					type="button"
					role="tab"
					id={
						'custom-block-' +
						props.attributes.clientId +
						'-tab-' +
						props.attributes.tabs[index].tabNumber
					}
					data-bs-target={'#' + childId}
					aria-controls={childId}
					aria-selected={index !== 0 ? 'false' : 'true'}
				>
					{tab.title}
				</Button>
			</li>
		);
	});

	return (
		<div {...useBlockProps.save()}>
			<ul className={'nav nav-tabs'}>{tabTitles}</ul>
			<div className={'tab-content'}>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
