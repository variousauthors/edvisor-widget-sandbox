import * as React from 'react';

interface SelectProps {
  data: any[],
  onChange: (value: string) => void,
  defaultText?: string,
  defaultValue?: string | undefined,
  valueKey?: string,
  nameKey?: string,
}

export default function Select ({ data, onChange, defaultText = "", defaultValue = undefined, valueKey = "value", nameKey = "name"}: SelectProps) {

  let optionElements = data.map((opt: any, index: number) => {

    return (
      <option key={ index } value={ opt[valueKey] } >{ opt[nameKey] }</option>
    )
  })

  if (defaultText !== "") {
    optionElements.unshift((
      <option key={ optionElements.length } value={ defaultValue } >{ defaultText }</option>
    ))
  }

  return (
    <select defaultValue={ defaultValue } onChange={ (e) => { onChange(e.target.value); } }>
      { optionElements }
    </select>
  )
}

