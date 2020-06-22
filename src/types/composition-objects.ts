import {Style} from './simple-types'

export interface BaseTextObject {
  /** The text for the block. This field accepts any of the standard text formatting markup when type is mrkdwn.*/
  text: string
  /** Indicates whether emojis in a text field should be escaped into the colon emoji format. This field is only usable when type is plain_text.*/
  emoji?: boolean
}
export interface PlainTextObject extends BaseTextObject {
  type: 'plain_text'
}

export interface MarkdownTextObject extends BaseTextObject {
  type: 'mrkdwn'
  /** When set to false (as is default) URLs will be auto-converted into links, conversation names will be link-ified, and certain mentions will be automatically parsed.
   * using value of true will skip any preprocessing of this nature, although you can still include manual parsing strings. This field is only usable when type is mrkdwn.
   **/
  verbatim?: boolean
}

export type TextObject = PlainTextObject | MarkdownTextObject

export interface ConfirmationObject {
  /** A plain_text-only text object that defines the dialog's title. Maximum length for this field is 100 characters. */
  title: PlainTextObject
  /** A text object that defines the explanatory text that appears in the confirm dialog. Maximum length for the text in this field is 300 characters. */
  text: TextObject
  /** A plain_text-only text object to define the text of the button that confirms the action. Maximum length for the text in this field is 30 characters. */
  confirm: PlainTextObject
  /** A plain_text-only text object to define the text of the button that cancels the action. Maximum length for the text in this field is 30 characters. */
  deny: PlainTextObject
  /** Defines the color scheme applied to the confirm button. A value of danger will display the button with a red background on desktop, or red text on mobile. A value of primary will display the button with a green background on desktop, or blue text on mobile. If this field is not provided, the default value will be primary.   */
  style?: Style
}

export interface OptionObject {
  /** A text object that defines the text shown in the option on the menu. Overflow, select, and multi-select menus can only use plain_text objects, while radio buttons and checkboxes can use mrkdwn text objects. Maximum length for the text in this field is 75 characters. */
  text: TextObject
  /** The string value that will be passed to your app when this option is chosen. Maximum length for this field is 75 characters. */
  value: string
  /** A plain_text only text object that defines a line of descriptive text shown below the text field beside the radio button. Maximum length for the text object within this field is 75 characters. */
  description?: PlainTextObject
  /** A URL to load in the user's browser when the option is clicked. The url attribute is only available in overflow menus. Maximum length for this field is 3000 characters. If you're using url, you'll still receive an interaction payload and will need to send an acknowledgement response.   */
  url?: string
}

export interface OptionGroupObject {
  /** A plain_text only text object that defines the label shown above this group of options. Maximum length for the text in this field is 75 characters. */
  label: PlainTextObject
  /** An array of option objects that belong to this specific group. Maximum of 100 items. */
  options: OptionObject[]
}

export interface FilterObject {
  /** Indicates which type of conversations should be included in the list. When this field is provided, any conversations that do not match will be excluded
   * You should provide an array of strings from the following options: im, mpim, private, and public. The array cannot be empty.
   */
  include?: ('im' | 'mpim' | 'private' | 'public')[]
  /** Indicates whether to exclude external shared channels from conversation lists. Defaults to false. */
  exclude_external_shared_channels?: boolean
  /** Indicates whether to exclude bot users from conversation lists. Defaults to false.   */
  exclude_bot_users?: boolean
}
