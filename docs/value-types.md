# Metadata value types

## Empty values

If a value is not given, the values array should not contain of an entry. Therefore, there is no `null` allowed and arrays have a minimum length of `1`.

## Matching value types

There are three types of values a metadata value entry can be of. Metadata profile entries produce values depending on their type and parameters. Below, all possible profile entry types are listed with their corresponding value types.


| profile entry type | used value type                                                                                                                                                                                                                                                                                                                                                                                                     |
|:-------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `number`           | All possible values are stored as string.                                                                                                                                                                                                                                                                                                                                                                           |
| `vocabulary`       | All possible values are stored as `TextsWithLanguageAndId[]`. Sure, many of profile entries will not allow multiple selection, and most of the profile entries will not allow the input of additional text for a selection. But in order to simplify component interfaces and lower the risk of data trouble when changing the profile, this maximum form of value type is used for ALL vocabulary profile entries. |
| `text`             | All possible values are stored as `TextWithLanguage[]`. Sure, many of profile entries will not expect input of text in different languages. But in order to simplify component interfaces and lower the risk of data trouble when changing the profile, this maximum form of value type is used for ALL text profile entries.                                                                                       |
| `boolean`          | Possible values are stored as string `true` or `false`.                                                                                                                                                                                                                                                                                                                                                             |
