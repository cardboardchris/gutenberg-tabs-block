/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */

import { TabsConfig } from './tabs';
import { TabPaneConfig } from './tabs/tab-pane';

/**
 * import bootstrap js and scss
 */
import '../node_modules/bootstrap/scss/bootstrap.scss';

// import "bootstrap";
import './style.scss';
import './editor.scss';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */

registerBlockType('custom-block/tabs', TabsConfig);
registerBlockType('custom-block/tab-pane', TabPaneConfig);
