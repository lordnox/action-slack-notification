import * as CO from './composition-objects'
import {Style} from './simple-types'

export type ElementObject =
  | ButtonElementObject
  | CheckboxElementObject
  | DatePickerElementObject
  | ImageElementObject
  | OverflowElementObject
  | PlainTextElementObject
  | RadioButtonGroupElementObjectg
  | MutliSelectElementObject
  | SingleSelectElementObject

export interface ButtonElementObject {
  /** The type of element. In this case type is always button. */
  type: 'button'
  /** 	A text object that defines the button's text. Can only be of type: plain_text. Maximum length for the text in this field is 75 characters. */
  text: CO.PlainTextObject
  /** 	An identifier for this action. You can use this when you receive an interaction payload to identify the source of the action. Should be unique among all other action_ids used elsewhere by your app. Maximum length for this field is 255 characters. */
  action_id: string
  /** 	A URL to load in the user's browser when the button is clicked. Maximum length for this field is 3000 characters. If you're using url, you'll still receive an interaction payload and will need to send an acknowledgement response. */
  url?: string
  /** 	The value to send along with the interaction payload. Maximum length for this field is 2000 characters. */
  value?: string
  /** 	Decorates buttons with alternative visual color schemes. Use this option with restraint.
   * primary gives buttons a green outline and text, ideal for affirmation or confirmation actions. primary should only be used for one button within a set.
   * danger gives buttons a red outline and text, and should be used when the action is destructive. Use danger even more sparingly than primary.
   * If you don't include this field, the default button style will be used.
   */
  style?: Style
  /** A confirm object that defines an optional confirmation dialog after the button is clicked. */
  confirm?: object
}

export interface CheckboxElementObject {
  /** The type of element. In this case type is always checkboxes. */
  type: 'checkboxes'
  /** An identifier for the action triggered when the checkbox group is changed. You can use this when you receive an interaction payload to identify the source of the action. Should be unique among all other action_ids used elsewhere by your app. Maximum length for this field is 255 characters. */
  action_id: string
  /** An array of option objects. */
  options: CO.OptionObject[]
  /** An array of option objects that exactly matches one or more of the options within options. These options will be selected when the checkbox group initially loads. */
  initial_options?: CO.OptionObject[]
  /** A confirm object that defines an optional confirmation dialog that appears after clicking one of the checkboxes in this element.   */
  confirm?: CO.ConfirmationObject
}

export interface DatePickerElementObject {
  /** The type of element. In this case type is always datepicker. */
  type: 'datepicker'
  /** An identifier for the action triggered when a menu option is selected. You can use this when you receive an interaction payload to identify the source of the action. Should be unique among all other action_ids used elsewhere by your app. Maximum length for this field is 255 characters. */
  action_id: string
  /** A plain_text only text object that defines the placeholder text shown on the datepicker. Maximum length for the text in this field is 150 characters. */
  placeholder?: CO.PlainTextObject
  /** The initial date that is selected when the element is loaded. This should be in the format YYYY-MM-DD. */
  initial_date?: string
  /** A confirm object that defines an optional confirmation dialog that appears after a date is selected. */
  confirm?: CO.ConfirmationObject
}

export interface ImageElementObject {
  /** The type of element. In this case type is always image. */
  type: 'image'
  /** The URL of the image to be displayed. */
  image_url: string
  /** A plain-text summary of the image. This should not contain any markup. */
  alt_text: string
}

export interface OverflowElementObject {
  /** The type of element. In this case type is always overflow. */
  type: 'overflow'
  /** An identifier for the action triggered when a menu option is selected. You can use this when you receive an interaction payload to identify the source of the action. Should be unique among all other action_ids used elsewhere by your app. Maximum length for this field is 255 characters. */
  action_id: string
  /** An array of option objects to display in the menu. Maximum number of options is 5, minimum is 2. */
  options: CO.OptionObject[]
  /** No	A confirm object that defines an optional confirmation dialog that appears after a menu item is selected.   */
  confirm?: CO.ConfirmationObject
}

export interface PlainTextElementObject {
  /**The type of element. In this case type is always plain_text_input. */
  type: 'plain_text_input'
  /** An identifier for the input value when the parent modal is submitted. You can use this when you receive a view_submission payload to identify the value of the input element. Should be unique among all other action_ids used elsewhere by your app. Maximum length for this field is 255 characters. */
  action_id: string
  /** A plain_text only text object that defines the placeholder text shown in the plain-text input. Maximum length for the text in this field is 150 characters. */
  placeholder?: object
  /** The initial value in the plain-text input when it is loaded. */
  initial_value?: string
  /** Indicates whether the input will be a single line (false) or a larger textarea (true). Defaults to false. */
  multiline?: boolean
  /** The minimum length of input that the user must provide. If the user provides less, they will receive an error. Maximum value is 3000. */
  min_length?: number
  /** The maximum length of input that the user can provide. If the user provides more, they will receive an error.   */
  max_length?: number
}

export interface RadioButtonGroupElementObjectg {
  /** The type of element. In this case type is always radio_buttons. */
  type: string
  /** An identifier for the action triggered when the radio button group is changed. You can use this when you receive an interaction payload to identify the source of the action. Should be unique among all other action_ids used elsewhere by your app. Maximum length for this field is 255 characters. */
  action_id: string
  /** An array of option objects. */
  options: CO.OptionObject[]
  /** An option object that exactly matches one of the options within options. This option will be selected when the radio button group initially loads. */
  initial_option?: CO.OptionObject
  /** A confirm object that defines an optional confirmation dialog that appears after clicking one of the radio buttons in this element.   */
  confirm?: CO.ConfirmationObject
}

/**
 * A select menu allows a user to select multiple items from a list of options. Just like regular select menus, select menus also include type-ahead functionality, where a user can type a part or all of an option string to filter the list.
 *
 * To use interactive components, you will need to make some changes to prepare your app. Read our guide to enabling interactivity.
 */
export interface StaticSelectBase {
  /** The type of element. In this case type is always multi_static_select. */
  type: 'multi_static_select'
  /** An array of option objects. Maximum number of options is 100. If option_groups is specified, this field should not be. */
  options: CO.OptionObject[]
  /** An array of option group objects. Maximum number of option groups is 100. If options is specified, this field should not be. */
  option_groups?: CO.OptionGroupObject[]
}

/**
 * This menu will load its options from an external data source, allowing for a dynamic list of options.
 *
 * Setup
 * To use this menu type, you'll need to configure your app first:
 *
 * Goto your app's settings page and choose the Interactive Components feature menu.
 * Add a URL to the Options Load URL under Select Menus.
 * Save changes.
 * Each time a menu of this type is opened or the user starts typing in the typeahead field, we'll send a request to your specified URL. Your app should return an HTTP 200 OK response, along with an application/json post body with an object containing either an options array, or an option_groups array.
 */
export interface ExternalSelectBase {
  /** The type of element. In this case type is always multi_external_select. */
  type: 'multi_external_select'
  /** No	When the typeahead field is used, a request will be sent on every character change. If you prefer fewer requests or more fully ideated queries, use the min_query_length attribute to tell Slack the fewest number of typed characters required before dispatch. The default value is 3. */
  min_query_length: number
}

/**
 * This select menu will populate its options with a list of Slack users visible to the current user in the active workspace.
 */
export interface UserSelectBase {
  /** The type of element. In this case type is always multi_users_select. */
  type: 'multi_users_select'
  /** No	An array of user IDs of any valid users to be pre-selected when the menu loads. */
  initial_users: string[]
}

/**
 * This select menu will populate its options with a list of public and private channels, DMs, and MPIMs visible to the current user in the active workspace.
 */
export interface ConversationListSelectBase {
  /** The type of element. In this case type is always multi_conversations_select. */
  type: 'multi_conversations_select'
  /** An array of one or more IDs of any valid conversations to be pre-selected when the menu loads. */
  initial_conversations: string[]
  /** Pre-populates the select menu with the conversation that the user was viewing when they opened the modal, if available. If initial_conversations is also supplied, it will be ignored. Default is false. */
  default_to_current_conversation: boolean
  /** A filter object that reduces the list of available conversations using the specified criteria.   */
  filter: CO.FilterObject
}

/**
 * This select menu will populate its options with a list of public channels visible to the current user in the active workspace.
 */
export interface ChannelListSelectBase {
  /** The type of element. In this case type is always multi_channels_select. */
  type: 'multi_channels_select'
  /** An array of one or more IDs of any valid public channel to be pre-selected when the menu loads. */
  initial_channels?: string[]
}

export interface MultiSelectBase {
  /** A plain_text only text object that defines the placeholder text shown on the menu. Maximum length for the text in this field is 150 characters. */
  placeholder: CO.PlainTextObject
  /** An identifier for the action triggered when a menu option is selected. You can use this when you receive an interaction payload to identify the source of the action. Should be unique among all other action_ids used elsewhere by your app. Maximum length for this field is 255 characters. */
  action_id: string
  /** An array of option objects that exactly match one or more of the options within options or option_groups. These options will be selected when the menu initially loads. */
  initial_options?: CO.OptionObject[]
  /** A confirm object that defines an optional confirmation dialog that appears before the select choices are submitted. */
  confirm?: object
  /** Specifies the maximum number of items that can be selected in the menu. Minimum number is 1.   */
  max_selected_items?: number
}

export interface SingleSelectBase {
  /** A plain_text only text object that defines the placeholder text shown on the menu. Maximum length for the text in this field is 150 characters. */
  placeholder: CO.PlainTextObject
  /** An identifier for the action triggered when a menu option is selected. You can use this when you receive an interaction payload to identify the source of the action. Should be unique among all other action_ids used elsewhere by your app. Maximum length for this field is 255 characters. */
  action_id: string
  /** An array of option objects that exactly match one or more of the options within options or option_groups. These options will be selected when the menu initially loads. */
  initial_options?: CO.OptionObject[]
  /** A confirm object that defines an optional confirmation dialog that appears before the select choices are submitted. */
  confirm?: object
}

export type StaticMultiSelectBase = StaticSelectBase & MultiSelectBase
export type ExternalMultiSelectBase = ExternalSelectBase & MultiSelectBase
export type UserMultiSelectBase = UserSelectBase & MultiSelectBase
export type ConversationListMultiSelectBase = ConversationListSelectBase & MultiSelectBase
export type ChannelListMultiSelectBase = ChannelListSelectBase & MultiSelectBase
export type MutliSelectElementObject = StaticMultiSelectBase &
  ExternalMultiSelectBase &
  UserMultiSelectBase &
  ConversationListMultiSelectBase &
  ChannelListMultiSelectBase

export type StaticSingleSelectBase = StaticSelectBase & SingleSelectBase
export type ExternalSingleSelectBase = ExternalSelectBase & SingleSelectBase
export type UserSingleSelectBase = UserSelectBase & SingleSelectBase
export type ConversationListSingleSelectBase = ConversationListSelectBase & SingleSelectBase
export type ChannelListSingleSelectBase = ChannelListSelectBase & SingleSelectBase
export type SingleSelectElementObject = StaticSingleSelectBase &
  ExternalSingleSelectBase &
  UserSingleSelectBase &
  ConversationListSingleSelectBase &
  ChannelListSingleSelectBase
