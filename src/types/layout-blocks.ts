// Layout Blocks

import * as BE from './block-elements'
import * as CO from './composition-objects'
import {Array5Of, Array10Of} from './simple-types'

export type LayoutElement =
  | SectionLayoutBlock
  | DividerLayoutBlock
  | ImageLayoutBlock
  | ActionsLayoutBlock
  | ContextLayoutBlock
  | InputLayoutBlock
  | FileLayoutBlock

export type SectionLayoutBlock = {
  /** The type of block. For a section block, type will always be section. */
  type: 'section'
  /** A string acting as a unique identifier for a block. You can use this block_id when you receive an interaction payload to identify the source of the action. If not specified, one will be generated. Maximum length for this field is 255 characters. block_id should be unique for each message and each iteration of a message. If a message is updated, use a new block_id. */
  block_id?: string
  /** One of the available element objects. */
  accessory?: BE.ElementObject
} & (
  | {
      /** The text for the block, in the form of a text object. Maximum length for the text in this field is 3000 characters. This field is not required if a valid array of fields objects is provided instead. */
      text: CO.TextObject
    }
  | {
      /** An array of text objects. Any text objects included with fields will be rendered in a compact format that allows for 2 columns of side-by-side text. Maximum number of items is 10. Maximum length for the text in each item is 2000 characters. */
      fields: CO.TextObject[]
    }
)
export interface DividerLayoutBlock {
  /** The type of block. For a divider block, type is always divider. */
  type: 'divider'
  /** A string acting as a unique identifier for a block. You can use this block_id when you receive an interaction payload to identify the source of the action. If not specified, one will be generated. Maximum length for this field is 255 characters. */
  block_id?: string
}

export interface ImageLayoutBlock {
  /** The type of block. For an image block, type is always image. */
  type: 'image'
  /** The URL of the image to be displayed. Maximum length for this field is 3000 characters. */
  image_url: string
  /** A plain-text summary of the image. This should not contain any markup. Maximum length for this field is 2000 characters. */
  alt_text: string
  /** An optional title for the image in the form of a text object that can only be of type: plain_text. Maximum length for the text in this field is 2000 characters. */
  title?: CO.PlainTextObject
  /** A string acting as a unique identifier for a block. You can use this block_id when you receive an interaction payload to identify the source of the action. If not specified, a block_id will be generated. Maximum length for this field is 255 characters. */
  block_id?: string
}

export interface ActionsLayoutBlock {
  /**	The type of block. For an actions block, type is always actions. */
  type: 'actions'
  /**	An array of interactive element objects - buttons, select menus, overflow menus, or date pickers. There is a maximum of 5 elements in each action block. */
  elements: Array5Of<BE.ElementObject>
  /**	A string acting as a unique identifier for a block. You can use this block_id when you receive an interaction payload to identify the source of the action. If not specified, a block_id will be generated. Maximum length for this field is 255 characters.   */
  block_id?: string
}
// Actions	Modals Messages Home tabs
// Context	Modals Messages Home tabs
// Divider	Modals Messages Home tabs
// File	Messages
// Image	Modals Messages Home tabs
// Input	Modals
// Section	Modals Messages Home tabs

export interface ContextLayoutBlock {
  // The type of block. For a context block, type is always context.
  type: 'context'
  // An array of image elements and text objects. Maximum number of items is 10.
  elements: Array10Of<BE.ImageElementObject | CO.TextObject>
  // A string acting as a unique identifier for a block. You can use this block_id when you receive an interaction payload to identify the source of the action. If not specified, a block_id will be generated. Maximum length for this field is 255 characters.
  block_id?: string
}

export interface InputLayoutBlock {
  /** The type of block. For an input block, type is always input. */
  type: 'input'
  /** A label that appears above an input element in the form of a text object that must have type of plain_text. Maximum length for the text in this field is 2000 characters. */
  label: BE.PlainTextElementObject
  /** An plain-text input element, a select menu element, a multi-select menu element, or a datepicker. */
  element:
    | BE.PlainTextElementObject
    | BE.SingleSelectElementObject
    | BE.MutliSelectElementObject
    | BE.DatePickerElementObject
  /** A string acting as a unique identifier for a block. You can use this block_id when you receive an interaction payload to identify the source of the action. If not specified, one will be generated. Maximum length for this field is 255 characters. block_id should be unique for each message and each iteration of a message. If a message is updated, use a new block_id. */
  block_id?: string
  /** An optional hint that appears below an input element in a lighter grey. It must be a a text object with a type of plain_text. Maximum length for the text in this field is 2000 characters. */
  hint?: object
  /** A boolean that indicates whether the input element may be empty when a user submits the modal. Defaults to false.   */
  optional?: boolean
}

export interface FileLayoutBlock {
  /** The type of block. For a file block, type is always file. */
  type: 'file'
  /** The external unique ID for this file. */
  external_id: string
  /** At the moment, source will always be remote for a remote file. */
  source: 'remote'
  /** A string acting as a unique identifier for a block. You can use this block_id when you receive an interaction payload to identify the source of the action. If not specified, a block_id will be generated. Maximum length for this field is 255 characters.   */
  block_id?: string
}
