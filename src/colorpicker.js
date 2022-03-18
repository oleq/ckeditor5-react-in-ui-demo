import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import View from '@ckeditor/ckeditor5-ui/src/view';
import fontColorIcon from '@ckeditor/ckeditor5-font/theme/icons/font-color.svg';
import eraserIcon from '@ckeditor/ckeditor5-core/theme/icons/eraser.svg';
import { createDropdown, ButtonView } from 'ckeditor5/src/ui';

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { SketchPicker } from 'react-color';

export default class ColorPicker extends Plugin {
  init() {
    const editor = this.editor;

    editor.ui.componentFactory.add( 'colorPicker', locale => {
      const t = locale.t;
      const dropdownView = createDropdown( locale );
      const pickerView = new ColorPickerView( locale );

      dropdownView.buttonView.set( {
        label: t( 'Font color' ),
        icon: fontColorIcon,
        tooltip: true
      } );

      let isUpdatingColor = false;

      pickerView.on( 'change:color', ( evt, name, color ) => {
        isUpdatingColor = true;

        editor.execute( 'fontColor', { value: color } );

        if ( color === null ) {
          dropdownView.isOpen = false;
        }

        isUpdatingColor = false;
      } );

      editor.commands.get( 'fontColor' ).on( 'change:value', ( evt, name, value ) => {
        if ( !isUpdatingColor ) {
          pickerView.setColor( !value ? '#000' : value );
        }
      } )

      dropdownView.panelView.children.add( pickerView );

      return dropdownView;
    } );
  }
}

class ColorPickerView extends View {
  constructor( locale ) {
    super( locale );

    this.set( 'color', '#fff' );

    this.setTemplate( {
      tag: 'div',
      attributes: {
        class: [
          'ck',
          'ck-font-color-picker',
        ],
      },
      children: [
        this._renderRemoveColorButton(),
        {
          tag: 'div',
          attributes: {
            class: [
              'ck-reset_all-excluded'
            ]
          }
        }
      ]
    } );
  }

  render() {
    super.render();
    this._renderReactWrapper( this.color );
  }

  setColor( color ) {
    this._renderReactWrapper( color );
  }

  _renderRemoveColorButton() {
    const buttonView = new ButtonView();
    const t = this.locale.t;

    buttonView.set( {
      withText: true,
      icon: eraserIcon,
      tooltip: true,
      label: t( 'Remove color' ) 
    } );

    buttonView.class = 'ck-color-table__remove-color';
    buttonView.on( 'execute', () => {
      this.color = null;
      this.setColor( '#000' );
    } );

    return buttonView;
  }

  _renderReactWrapper( color ) {
    ReactDOM.render( 
      <ColorPickerWrapper initialColor={ color } onNewColorPicked={ ( { hex } ) => { this.color = hex; }} />, 
      this.element.lastChild 
    );
  }
}

function ColorPickerWrapper( { initialColor, onNewColorPicked } ) {
  const [ color, setColor ] = useState( initialColor );

  useEffect( ()=>{
    onNewColorPicked( color );
  }, [ color, onNewColorPicked ] );

  useEffect( ()=>{
    setColor( initialColor );
  }, [ initialColor ] );

  return <SketchPicker color={ color } onChange={ setColor } />;
}