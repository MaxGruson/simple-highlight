/**
 * Highlighter.
 * 
 * Simple Highlighter that inserts a <mark> into the markup.
 */

// Import WordPress Components.
import { RichTextToolbarButton } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { registerFormatType, toggleFormat } from '@wordpress/rich-text';
import { ifCondition  } from '@wordpress/compose';
import { Icon } from '@wordpress/icons';
import { useSelect } from '@wordpress/data';

/* eslint-disable max-len */
// Custom Icon SVG.
const highlighterIcon = (
  <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.2186 3.31061C13.7838 2.89252 13.0834 2.89708 12.6543 3.32078L9.22512 6.70711C9.17494 6.75668 9.13068 6.80978 9.09236 6.86558L7.36613 8.57021L11.393 12.4419L16.362 7.50771L16.6812 7.1925C17.1103 6.76879 17.1056 6.08638 16.6708 5.66828L14.2186 3.31061Z"/>
    <path d="M6.81914 9.10588L10.8041 12.9457L9.79592 13.9391C9.42424 14.3053 8.84982 14.3575 8.42039 14.0938L7.83675 13.8883L7.01822 14.6819L5.03321 12.7381L5.86163 11.9349L5.67624 11.454C5.39121 11.0373 5.43547 10.4692 5.811 10.0992L6.81914 9.10588Z"/>
    <path d="M5.11329 13.6189L6.13911 14.5945L5.70907 15L4 14.592L5.11329 13.6189Z"/>
  </svg>
);
/* eslint-enable max-len */

// Create Highlighter Button.
const HighlighterButton = ( { isActive, onChange, value} ) => {
  return (
    <RichTextToolbarButton
      icon={ (
        <>
          <Icon icon={ highlighterIcon } />
        </>
      ) }
      isActive={ isActive }
      onClick={ () => {
        onChange(
          toggleFormat( value, {
            type: 'simple/highlight',
          } )
        );
      } }
      title={ __( 'Highlight', 'simple-highlight' ) }
    />
  );
};

var HighlighterButtonContainer = ifCondition( ( props ) => {
  const selectedBlock = useSelect( (select) => select('core/block-editor').getSelectedBlock() );
  return (
      selectedBlock &&
      (
        selectedBlock.name === 'core/paragraph'
        || selectedBlock.name === 'core/list-item'
      )
  ); 
} )( HighlighterButton );

// Register the Format.
registerFormatType(
  'simple/highlight', {
    className: 'simple-highlight',
    edit: HighlighterButton,
    tagName: 'strong',
    title: __( 'Highlight', 'simple-highlight' ),
  }
);
