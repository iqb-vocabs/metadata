# Metadata value types

There are three types of values a metadata value entry can be of. Metadata profile entries produce values depending on their type and parameters. Below, all possible profile entry types are listed with their corresponding value types.

## `number`

All possible values are stored as string.

## `vocabulary`

All possible values are stored as `TextsWithLanguageAndId[]`. Sure, many of profile entries will not allow multiple selection, and most of the profile entries will not allow the input of additional text for a selection. But in order to simplify component interfaces, this maximum form of value type is used for ALL vocabulary profile entries.

## `text`

This value type depends on the number of expected languages. So for simple text (names, ids) the type `string` will do. When a language specific input is expected, the value will be of type `TextWithLanguage[]`.

## `boolean`

Possible values are stored as string `true` or `false`.
