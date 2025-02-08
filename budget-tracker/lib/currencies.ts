export const Currencies = [
    {value: "USD", label: "$ Dollar", locale:"en-US"},
    {value: "EUR", label: "€ Euro", locale:"en-DE"},
    {value: "JPY", label: "¥ Yen", locale:"en-JP"},
    {value: "GBP", label: "£ Pound", locale:"en-GB"},
];

export type Currency = (typeof Currencies)[0];