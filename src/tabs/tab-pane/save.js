import { InnerBlocks } from '@wordpress/block-editor';

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
	return (
		<div
			className={
				'wp-block-custom-block-tab-pane tab-pane fade' +
				(!props.attributes.firstTab ? '' : ' show active')
			}
			id={props.attributes.id}
			role="tabpanel"
			aria-labelledby={
				'custom-block-' +
				props.attributes.parentClientId +
				'-tab-' +
				props.attributes.tabNumber
			}
		>
			<InnerBlocks.Content />
		</div>
	);
}
